import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { Subscription } from './enitites/subscription.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
  ) {}

  async createSubscription({
    userRoleId,
    startDate,
  }: CreateSubscriptionDto): Promise<Subscription> {
    const endDate = new Date(startDate);
    endDate.setFullYear(startDate.getFullYear() + 1); // Add one year to startDate

    const subscription = this.subscriptionRepository.create({
      userRoleId,
      startDate,
      endDate,
      status: 'active', // Assuming you want the subscription to start as 'active'
    });

    return this.subscriptionRepository.save(subscription);
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async deactivateExpiredSubscriptions() {
    await this.subscriptionRepository
      .createQueryBuilder()
      .update(Subscription)
      .set({ status: 'inactive' })
      .where('endDate < :now', { now: new Date() })
      .andWhere('status = :status', { status: 'active' })
      .execute();
  }
}
