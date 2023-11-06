import { IMedia } from "@lib/models";
import { CreateRunnerDto, CreateSpectatorDto } from "@lib/dto";

export type CreateUserDto = {
    name: string;
    surname: string;
    email: string;
    city: string;
    country: string;
    role: string;
    interest: string;
    runner?: CreateRunnerDto;
    spectator?: CreateSpectatorDto;
    image: IMedia | null;
  };