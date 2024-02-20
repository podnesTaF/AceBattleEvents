import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { Roles } from 'src/modules/auth/roles/roles-auth.decorator';
import { CreateSplitDto } from './dto/create-split.dto';
import { SplitService } from './split.service';

@Controller('split')
export class SplitController {
  constructor(private readonly splitService: SplitService) {}

  @Post('/many')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  createManySplits(@Body() splits: CreateSplitDto[]) {
    return this.splitService.createManySplits(splits);
  }
}
