import { OmitType } from '@nestjs/mapped-types';
import { BecomeRunnerDto } from './become-runner.dto';

export class BecomeCoachDto extends OmitType(BecomeRunnerDto, [
  'bestResults',
] as const) {}
