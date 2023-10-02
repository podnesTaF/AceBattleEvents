import { Controller, Get, Param } from '@nestjs/common';
import { SpectatorService } from '../services/spectator.service';

@Controller('spectators')
export class SpectatorController {
  constructor(private readonly spectatorService: SpectatorService) {}

  @Get(':id/favorite-clubs')
  getFavoriteClubs(@Param('id') id: number) {
    return this.spectatorService.findFavoriteClubs(id);
  }
}
