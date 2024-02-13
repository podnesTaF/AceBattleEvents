import { Controller } from '@nestjs/common';
import { StandardService } from './standard.service';

@Controller('standard')
export class StandardController {
  constructor(private readonly standardService: StandardService) {}
}
