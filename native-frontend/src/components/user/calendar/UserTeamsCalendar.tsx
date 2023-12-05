import SkeletonLoader from "@Components/common/states/SkeletonLoader";
import ListStyledWrapper from "@Components/common/wrappers/ListStyledWrapper";
import TeamRegistrationCard from "@Components/teams/TeamRegistrationCard";
import { ITeamRegistration, IUser } from "@lib/models";
import { useFindUserRegistrationsQuery } from "@lib/teams/services/teamRegistrationService";
import React from "react";

interface Props {
  user: IUser;
}

const UserTeamsCalendar = ({ user }: Props): JSX.Element => {
  const { data: teamRegistrations, isLoading } = useFindUserRegistrationsQuery({
    role: user.role,
  });
  return (
    <ListStyledWrapper
      title={"Your Team Registrations"}
      primaryBgColor={"#1e1c1f"}
    >
      <SkeletonLoader<ITeamRegistration[]> data={teamRegistrations}>
        {(data) =>
          data.map((reg) => (
            <TeamRegistrationCard
              key={reg.id}
              event={reg.event}
              team={reg.team}
            />
          ))
        }
      </SkeletonLoader>
    </ListStyledWrapper>
  );
};

export default UserTeamsCalendar;