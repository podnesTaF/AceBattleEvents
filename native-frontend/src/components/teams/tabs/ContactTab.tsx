import Container from "@Components/common/Container";
import UserDetailedInfo from "@Components/common/UserDetailedInfo";
import SkeletonLoader from "@Components/common/states/SkeletonLoader";
import { Box, Heading } from "@gluestack-ui/themed";
import { useGetTeamManagerAndCoachQuery } from "@lib/services";
import React from "react";

const ContactTab = ({ teamId }: { teamId: number }) => {
  const {
    data: contact,
    isLoading,
    error,
  } = useGetTeamManagerAndCoachQuery({ teamId });
  return (
    <Box my={"$5"}>
      <Heading size={"lg"} m={"$2"}>
        Contact team
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
