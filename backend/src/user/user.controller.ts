import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.findAll();
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  getMe(@Request() req) {
    return this.userService.findById(req.user.id);
  }

  @Get('/get-transactions')
  @UseGuards(JwtAuthGuard)
  getTx(@Request() req) {
    return this.userService.getTx(req.user.id);
  }

  @Post('create-transaction')
  @UseGuards(JwtAuthGuard)
  createTransaction(
    @Request() req,
    @Body() body: { amount: number; receiverId: number; type: string },
  ) {
    return this.userService.createTransaction(
      req.user.id,
      body.amount,
      body.type,
    );
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  updateBalance(@Request() req, @Body() body: { balance: number }) {
    console.log(body.balance);
    return this.userService.addToBalance(+req.user.id, body.balance);
  }
}
