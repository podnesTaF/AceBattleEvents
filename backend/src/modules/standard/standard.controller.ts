import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { Roles } from 'src/modules/auth/roles/roles-auth.decorator';
import { CreateStandardDto } from './dto/create-standard.dto';
import { StandardService } from './standard.service';

@ApiTags('standards')
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
