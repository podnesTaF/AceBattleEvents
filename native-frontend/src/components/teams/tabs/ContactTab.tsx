import Container from "@Components/common/Container";
import UserDetailedInfo from "@Components/common/UserDetailedInfo";
import SkeletonLoader from "@Components/common/states/SkeletonLoader";
import { Box, Heading } from "@gluestack-ui/themed";
import { useGetTeamManagerAndCoachQuery } from "@lib/services";
import React from "react";
import { useTranslation } from "react-i18next";

const ContactTab = ({ teamId }: { teamId: number }) => {
  const {
    data: contact,
    isLoading,
    error,
  } = useGetTeamManagerAndCoachQuery({ teamId });
  const { t } = useTranslation();
  return (
    <Box my={"$5"}>
      <Heading size={"lg"} m={"$2"}>
        {t("team.contactTeam")}
      </Heading>
      <Container>
        <SkeletonLoader<any> data={contact} isLoading={isLoading} error={error}>
          {(data) => (
            <>
              <UserDetailedInfo user={data.coach.user} />
              <UserDetailedInfo user={data.manager.user} />
            </>
          )}
        </SkeletonLoader>
      </Container>
    </Box>
  );
};

export default ContactTab;
