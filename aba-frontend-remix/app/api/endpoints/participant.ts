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
    const { data } = await instance.post<IParticipant & { ott: string }>(
      `/participants`,
      dto
    );

    return data;
  },

  async resendConfirmationEmail(token: string) {
    const { data } = await instance.post<string>(
      `/participants/${token}/resend-confirmation-email`
    );
    return data;
  },

  async confirmEmail(token: string) {
    const { data } = await instance.patch<IParticipant>(
      `/participants/${token}/confirm-email`
    );
    return data;
  },

  async generateTickets(token: string) {
    const { data } = await instance.post<string>(
      `/participants/${token}/generate-tickets`
    );
    return data;
  },
});
