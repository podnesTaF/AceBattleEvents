import { AxiosInstance } from "axios";
import {
  CreateParticipant,
  IParticipant,
} from "~/lib/registrations/types/IParticipant";

export const ParticipantApi = (instance: AxiosInstance) => ({
  async isUnique(dto: { email: string; eventRaceTypeIds: number[] }) {
    const { data } = await instance.post<boolean>(`/participants/unique`, dto);

    return data;
  },

  async create(dto: CreateParticipant) {
    const { data } = await instance.post<IParticipant>(`/participants`, dto);

    return data;
  },
});
