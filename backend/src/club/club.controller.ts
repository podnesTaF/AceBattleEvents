import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ClubService } from './club.service';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';

@Controller('clubs')
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Request() req, @Body() createClubDto: CreateClubDto) {
    return this.clubService.create(createClubDto, +req.user.id);
  }

  @Get()
  findAll(@Query() queries: any) {
    return this.clubService.findAll(queries);
  }

  @Get('snippet')
  findAllSnippet() {
    return this.clubService.findAllSnippet();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clubService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClubDto: UpdateClubDto) {
    return this.clubService.update(+id, updateClubDto);
  }

  @Post(':id/handle-favorite')
  @UseGuards(JwtAuthGuard)
  like(
    @Request() req,
    @Param('id') id: string,
    @Body() body: { action: string },
  ) {
    return this.clubService.handleFavorite(+req.user.id, +id, body.action);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clubService.remove(+id);
  }
}
