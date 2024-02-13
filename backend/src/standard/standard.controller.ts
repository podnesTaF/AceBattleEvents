import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles/roles-auth.decorator';
import { CreateStandardDto } from './dto/create-standard.dto';
import { StandardService } from './standard.service';

@Controller('standards')
export class StandardController {
  constructor(private readonly standardService: StandardService) {}

  @Post('create-many')
  @UseGuards(RolesGuard)
  @Roles('admin')
  createMany(@Body() body: CreateStandardDto[]) {
    return this.standardService.createManyStandards(body);
  }
}
