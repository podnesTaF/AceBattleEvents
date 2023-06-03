import { Injectable } from '@nestjs/common';
import { CreateTeamForEventDto } from './dto/create-team-for-event.dto';

@Injectable()
export class TeamForEventService {
  create(createTeamForEventDto: CreateTeamForEventDto) {
    return 'This action adds a new teamForEvent';
  }

  findAll() {
    return `This action returns all teamForEvent`;
  }
}
