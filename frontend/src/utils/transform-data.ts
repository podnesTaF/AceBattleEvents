import { IEvent, ILocation } from "@/models/IEvent";
import { IPlayer, ITeam } from "@/models/ITeam";
import { ITransaction } from "@/models/IUser";

export const transformIntoEventsTable = (data: IEvent[]) => {
  return data.map((event) => {
    const { title, date, location, id, teamsCount } = event;
    const formated = new Date(date);
    const formattedDate = formated.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return {
      title,
      date: formattedDate,
      country: location.country,
      organisators: "ACE BATTLE ASSOCIATION",
      details: {
        link: "/calendar/" + id,
        value: "details",
      },
    };
  });
};

export const transformIntoTeamsTable = (data: ITeam[]) => {
  return data.map((team) => {
    const { name, country, membersCount, club, coach } = team;

    return {
      name,
      country,
      members: membersCount,
      club,
      coach: coach.name + " " + coach.surname,
    };
  });
};

// write me a function that will take a date of birth and return the age category like U18, U20, U23, Senior
export const getAgeCategory = (dateOfBirth: string): string => {
  const age = new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
  if (age < 18) {
    return "U18";
  } else if (age < 20) {
    return "U20";
  } else if (age < 23) {
    return "U23";
  } else {
    return "Senior";
  }
};

export const transfromIntoPlayersTable = (data: IPlayer[]) => {
  return data.map((player) => {
    const { name, surname, dateOfBirth } = player;

    return {
      name,
      surname,
      dateOfBirth: new Date(dateOfBirth).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      cat: getAgeCategory(dateOfBirth),
    };
  });
};

export const transformTxTable = (data: ITransaction[]) => {
  return data.map((tx) => {
    const { amount, date, type, sender, receiver, txHash } = tx;
    const retData: any = {
      amount: amount.toFixed(2) + " bc",
      date: new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      type,
      txLink: {
        link: "https://goerli.etherscan.io/tx/" + txHash,
        value: txHash.slice(0, 5) + "..." + txHash.slice(-5),
      },
    };

    if (receiver) {
      retData.receiver = receiver.name + " " + receiver.surname;
    } else {
      retData.receiver = "N/A";
    }

    if (sender) {
      retData.sender = sender.name + " " + sender.surname;
    } else {
      retData.sender = "N/A";
    }

    return retData;
  });
};

// export const getTeamPersonalBest = (players: IPlayer[]): number => {
//   return players.reduce((acc, curr) => acc + curr.personalBests., 0);
// }

export const getParamsFromFilters = (filters: any[]): string => {
  const params: string = filters.reduce(
    (acc: string, curr: { type: string; value: string }, i: number) =>
      i === 0
        ? acc + `${curr.type}=${curr.value}`
        : acc + `&${curr.type}=${curr.value}`,
    ""
  );

  return params;
};

export const transformAddress = (location: ILocation): string => {
  return (
    location.address +
    ", " +
    location.city +
    ", " +
    location.country +
    ", " +
    location.zipCode
  );
};
