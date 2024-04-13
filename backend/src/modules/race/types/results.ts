import { RunnerRole } from 'src/modules/race-runner/entities/runner-role.entity';
import { Split } from 'src/modules/split/entities/split.entity';
import { User } from 'src/modules/users/entities/user.entity';

export type RunnerResult = {
  id: number;
  distanceInCm: number;
  finalResultInMs: number;
  runner: User;
  splits: Split[];
  runnerRole: RunnerRole;
};
