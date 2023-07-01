import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.create(createPlayerDto);
  }

  @Get()
  findAll(
    @Query()
    queries: {
      gender?: string;
      name?: string;
      country?: string;
      page?: number;
      limit?: number;
    },
  ) {
    return this.playersService.findAll(queries);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playersService.findOne(+id);
  }
}
