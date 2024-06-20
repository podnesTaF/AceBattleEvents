import { createApiInstance } from "@/src/shared/api";
import { Session } from "next-auth";
import { IEvent } from "../model";
import { EventShortform, IFutureEvent } from "../model/IEvent";

export class EventApi {
  private instance;

  constructor(session?: Session | null) {
    this.instance = createApiInstance(session);
  }

  async getEventPreviews(params?: string) {
    try {
      const { data } = await this.instance.get<{
        totalPages: number;
        events: IEvent[];
      }>(`events/previews?${params}&limit=5`);

      return {
        events: data.events,
        totalPages: data.totalPages,
        error: false,
      };
    } catch (e) {
      return { events: [], totalPages: 0, error: true };
    }
  }

  async getFututeEvents(params?: string) {
    const { data } = await this.instance.get<{ futureEvents: IFutureEvent[] }>(
      `event-previews?${params}`
    );
    return data;
  }

  async getEventsShortform() {
    const { data } = await this.instance.get<EventShortform[]>(
      `events/shortform`
    );
    return data;
  }
}
