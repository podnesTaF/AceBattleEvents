export type ResultTableRow = {
  id: number;
  team: {
    id: number;
    name: string;
    link: string;
  };
  date: string;
  resultInMs: number;
  race: string;
  event: {
    id?: number;
    name?: string;
    link: string;
  };
  runnerResults: {
    runner: string;
    gender?: string;
    category: string;
    distance: number;
    finalResultInMs: number;
    records: string;
  }[];
};
