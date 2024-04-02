import {
  BadRequestException,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  @Inject() stripeService: StripeService;

  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  async handleWebhook(
    @Headers('stripe-signature') signature: string,
    @Req() req: RawBodyRequest<Request>,
  ) {
    if (!signature)
      throw new BadRequestException('Missing stripe-signature header');
    if (!req.rawBody) throw new BadRequestException('No body provided');
    return this.stripeService.handleWebhook(signature, req.rawBody);
  }

  @Get('test')
  async checkout() {
    return this.stripeService.createCheckoutSession('user_123');
  }
}
