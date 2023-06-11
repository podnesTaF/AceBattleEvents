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

  @Get()
  @UseGuards(JwtAuthGuard)
  getMe(@Request() req) {
    console.log(req.user);
    return this.userService.findById(req.user.id);
  }

  @Post('create-transaction')
  @UseGuards(JwtAuthGuard)
  createTransaction(
    @Request() req,
    @Body() body: { amount: number; receiverId: number },
  ) {
    return this.userService.createTransaction(req.user.id, body.amount);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  updateBalance(@Request() req, @Body() body: { balance: number }) {
    console.log(req.session);
    return this.userService.addToBalance(+req.user.id, body.balance);
  }
}
