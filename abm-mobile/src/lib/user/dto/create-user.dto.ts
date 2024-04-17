import { CreateRunnerDto, CreateSpectatorDto } from "@lib/dto";
import { IMedia } from "@lib/models";

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

export type UpdateUserDto = {
  name?: string;
  surname?: string;
  country?: string;
  city?: string;
  image?: IMedia;
};
