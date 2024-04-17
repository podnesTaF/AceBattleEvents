import {
  BadRequestException,
  Body,
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { SubscribeDto } from './dto/subscribe.dto';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  @Inject() paymentsService: PaymentsService;

  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  async handleWebhook(
    @Headers('stripe-signature') signature: string,
    @Req() req: RawBodyRequest<Request>,
  ) {
    if (!signature)
      throw new BadRequestException('Missing stripe-signature header');
    if (!req.rawBody) throw new BadRequestException('No body provided');
    return this.paymentsService.handleWebhook(signature, req.rawBody);
  }

  @Post('/subscribe')
  async subscribeToRole(@Body() subscribeDto: SubscribeDto) {
    const { userId, roleId } = subscribeDto;

    return this.paymentsService.createSubscription(userId, roleId);
  }

  @Post('/subscription/session')
  async retrySubscription(@Body() body: { userId: number; roleIds: number[] }) {
    return this.paymentsService.createCheckoutSession(
      body.userId,
      body.roleIds,
    );
  }

  @Post('/subscription/session-result')
  handleSessionResult(@Body() body: { sessionId: string }) {
    return this.paymentsService.handleSessionResult(body.sessionId);
  }
}
