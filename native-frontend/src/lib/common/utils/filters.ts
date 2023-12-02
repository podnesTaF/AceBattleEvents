import { ITeam } from "@lib/models";

export const participantsFilters = (teams?: ITeam[]) => ({
  category: [
    { label: "All", value: undefined },
    {
      label: "Men's",
      value: "male",
    },
    {
      label: "Women's",
      value: "female",
    },
  ],
  teams:
    teams?.map((team) => ({
      label: team.name,
      value: team.id,
    })) || [],
});
