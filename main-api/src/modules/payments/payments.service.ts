import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/modules/role/entities/role.entity';
import { UserRole } from 'src/modules/user-role/entities/user-role.entity';
import { User } from 'src/modules/users/entities/user.entity';
import Stripe from 'stripe';
import { In, Repository } from 'typeorm';

@Injectable()
export class PaymentsService {
  stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY'), {
    apiVersion: '2023-10-16',
  });

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,
  ) {}

  async getCustomerByUserId(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: +userId } });

    if (user.customerId) {
      return user.customerId;
    }

    const { email, firstName, lastName } = user;

    let customerId: null | string = null;

    const items = (await this.stripe.customers.list({ email })).data;

    if (items.length > 0) {
      customerId = items[0].id;
    } else {
      const { id } = await this.stripe.customers.create({
        email,
        name: `${firstName} ${lastName}`,
      });
      customerId = id;
    }

    user.customerId = customerId;
    await this.userRepository.save(user);
    return customerId;
  }

  async createSubscription(userId: number, roleId: number) {
    const customerId = await this.getCustomerByUserId(userId);
    const role = await this.roleRepository.findOne({ where: { id: roleId } });

    if (!role || !role.stripe_product_id) {
      throw new BadRequestException(
        'Role not found or missing stripe product id',
      );
    }

    const subscription = await this.stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: role.stripe_product_id }],
      expand: ['latest_invoice.payment_intent'],
    });

    return subscription;
  }

  async handleWebhook(signature: string, rawBody: Buffer) {
    let event;

    try {
      event = this.stripe.webhooks.constructEvent(
        rawBody,
        signature,
        this.configService.get('STRIPE_WEBHOOK_SECRET'),
      );
    } catch (err) {
      throw new BadRequestException(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case 'customer.subscription.created':
        // Handle new subscription
        break;
      case 'customer.subscription.updated':
        // Handle subscription updates (e.g., cancellations, changes)
        break;
      case 'invoice.payment_succeeded':
        // Handle successful payment
        break;
      // Add more cases as needed
    }

    console.log(event);
    return { received: true };
  }

  async createCheckoutSession(
    userId: number,
    roleIds: number[],
  ): Promise<string> {
    const customer = await this.getCustomerByUserId(userId);

    const roles = await Promise.all(
      roleIds.map((roleId) =>
        this.roleRepository.findOne({ where: { id: roleId } }),
      ),
    );

    const validRoles = roles.filter((role) => role && role.stripe_price_id);

    if (validRoles.length === 0) {
      throw new BadRequestException(
        'No valid roles found for checkout session creation.',
      );
    }

    const line_items = validRoles.map((role) => ({
      price: role.stripe_price_id,
      quantity: 1,
    }));

    const urlBase =
      (process.env.FRONTEND_URL || 'http://localhost:3000') + '/register';
    const cancelUrl = `${urlBase}?sessionId={CHECKOUT_SESSION_ID}`;
    const successUrl = `${urlBase}?sessionId={CHECKOUT_SESSION_ID}`;

    const session = await this.stripe.checkout.sessions.create({
      customer,
      payment_method_types: ['card'],
      line_items,
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    const { url } = session;
    if (!url) {
      throw new InternalServerErrorException(
        'Checkout session initialization error',
      );
    }

    return url;
  }

  async getUserFromSession(sessionId: string) {
    const session = await this.stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['customer'],
    });

    if (!session || !session.customer) {
      throw new BadRequestException('No session or customer found');
    }

    const customer = session.customer as Stripe.Customer;

    const user = await this.userRepository.findOne({
      where: { customerId: customer.id },
      relations: ['roles.role'],
    });

    if (!user) {
      throw new BadRequestException('No user found');
    }

    return user;
  }

  async handleSuccessSubscription(sessionId: string) {
    const session = await this.stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['subscription'],
    });

    if (!session || typeof session.subscription === 'string') {
      throw new BadRequestException(
        'No session found or subscription not expanded',
      );
    }

    const user = await this.userRepository.findOne({
      where: { customerId: session.customer as string },
      relations: ['roles.role'],
    });

    if (!user) {
      throw new BadRequestException('No user found');
    }

    const subscription = session.subscription;
    const productIds = subscription.items.data.map(
      (item) => item.price.product,
    );

    const roles = await this.roleRepository.find({
      where: { stripe_product_id: In(productIds) },
    });

    if (roles.length === 0) {
      throw new BadRequestException('No roles found');
    }

    for (const role of roles) {
      // update role if exist
      if (user.roles.some((userRole) => userRole.role.id === role.id)) {
        const userRole = user.roles.find(
          (userRole) => userRole.role.id === role.id,
        );
        if (userRole) {
          userRole.stripeSubscriptionId = subscription.id;
          userRole.startDate = new Date(
            subscription.current_period_start * 1000,
          );
          userRole.endDate = new Date(subscription.current_period_end * 1000);
          await this.userRoleRepository.save(userRole);
        }

        continue;
      }

      // create new role
      const userRole = new UserRole();
      userRole.role = role;
      userRole.user = user;
      userRole.stripeSubscriptionId = subscription.id;
      userRole.startDate = new Date(subscription.current_period_start * 1000);
      userRole.endDate = new Date(subscription.current_period_end * 1000);
      const newRole = await this.userRoleRepository.save(userRole);
      user.roles.push(newRole);
    }
    return { user, status: 'success' };
  }

  async handleCancelPayments(sessionId: string) {
    const session = await this.stripe.checkout.sessions.retrieve(sessionId);

    if (!session || !session.customer) {
      throw new BadRequestException('No session or customer found');
    }

    const user = await this.userRepository.findOne({
      where: { customerId: session.customer as string },
      relations: ['roles.role'],
    });

    if (!user) {
      throw new BadRequestException('No user found');
    }

    return { user, status: 'error' };
  }

  async handleSessionResult(sessionId: string) {
    const session = await this.stripe.checkout.sessions.retrieve(sessionId);

    // check if session is paid
    if (session.payment_status === 'paid') {
      return this.handleSuccessSubscription(sessionId);
    } else {
      return this.handleCancelPayments(sessionId);
    }
  }
}
