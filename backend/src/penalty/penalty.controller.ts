import { Controller } from '@nestjs/common';
import { PenaltyService } from './penalty.service';

@Controller('penalty')
export class PenaltyController {
  constructor(private readonly penaltyService: PenaltyService) {}
}
