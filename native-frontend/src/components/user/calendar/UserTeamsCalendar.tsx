import NoItemsAvailable from "@Components/common/NoItemsAvailable";
import SkeletonLoader from "@Components/common/states/SkeletonLoader";
import ListStyledWrapper from "@Components/common/wrappers/ListStyledWrapper";
import TeamRegistrationCard from "@Components/teams/TeamRegistrationCard";
import { ITeamRegistration, IUser } from "@lib/models";
import { useFindUserRegistrationsQuery } from "@lib/teams/services/teamRegistrationService";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  user: IUser;
}

const UserTeamsCalendar = ({ user }: Props): JSX.Element => {
  const { t } = useTranslation();

  const { data: teamRegistrations, isLoading } = useFindUserRegistrationsQuery({
    role: user.role,
  });
  return (
    <ListStyledWrapper
      title={t("calendar.yourTeamRegistrations")}
      primaryBgColor={"#1e1c1f"}
    >
      <SkeletonLoader<ITeamRegistration[]> data={teamRegistrations}>
        {(data) =>
          data.length ? (
            data.map((reg) => (
              <TeamRegistrationCard
                key={reg.id}
                event={reg.event}
                team={reg.team}
              />
            ))
          ) : (
            <NoItemsAvailable
              title={t("calendar.noRegistrationsFound")}
              text={t("calendar.exploreFutureEvents")}
              link={`/(drawer)/events`}
              linkButtonText={t("calendar.exploreEvents")}
            />
          )
        }
      </SkeletonLoader>
    </ListStyledWrapper>
  );
};

export default UserTeamsCalendar;
