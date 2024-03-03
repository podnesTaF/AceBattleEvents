export type GetEventsQuery = {
  page?: number;
  limit?: number;

  month?: number;

  year?: number;

  name?: string;

  countryId: number;

  finished?: boolean;
};
