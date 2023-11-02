export const getBattleName = (race: any) => {
    return race.teamResults
      ?.map((teamResult: any) => teamResult.team.name)
      .join(" vs ");
  };
  