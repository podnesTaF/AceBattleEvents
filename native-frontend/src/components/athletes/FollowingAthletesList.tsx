import WithLoading from "@Components/HOCs/withLoading";
import Container from "@Components/common/Container";
import UserCard from "@Components/user/UserCard";
import { useGetMyFollowingsQuery } from "@lib/services";
import React from "react";

const FollowingAthletesList = () => {
  const { data: runners, isLoading } = useGetMyFollowingsQuery();

  return (
    <Container vertical>
      <WithLoading isLoading={isLoading}>
        {runners?.map((runner, i) => (
          <UserCard
            isAuthorized={true}
            user={runner.user}
            key={runner.id}
            isLastElement={i === runners.length - 1}
            runnerPreview={runner}
          />
        ))}
      </WithLoading>
    </Container>
  );
};

export default FollowingAthletesList;
