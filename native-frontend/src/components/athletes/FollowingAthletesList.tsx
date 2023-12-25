import Container from "@Components/common/Container";
import InfoTemplate from "@Components/common/InfoTemplate";
import SkeletonLoader from "@Components/common/states/SkeletonLoader";
import UserCard from "@Components/user/UserCard";
import UserCardSkeleton from "@Components/user/UserCardSkeleton";
import { Box, VStack } from "@gluestack-ui/themed";
import { IRunner } from "@lib/models";
import { useGetMyFollowingsQuery } from "@lib/services";
import React from "react";

const FollowingAthletesList = () => {
  const { data: runners, isLoading, error } = useGetMyFollowingsQuery();

  const loadingComponent = () => (
    <VStack space={"md"}>
      {[...Array(3)].map((_, i) => (
        <UserCardSkeleton key={i} />
      ))}
    </VStack>
  );

  return (
    <SkeletonLoader<IRunner[]>
      data={runners}
      height={200}
      isLoading={isLoading}
      error={error}
      loadingComponent={loadingComponent()}
    >
      {(data) =>
        data.length > 0 ? (
          <Container vertical>
            {data.map((runner, i) => (
              <UserCard
                isAuthorized={true}
                user={runner.user}
                key={runner.id}
                isLastElement={i === data.length - 1}
                runnerPreview={runner}
              />
            ))}
          </Container>
        ) : (
          <Box px={"$4"}>
            <InfoTemplate
              variant="outline"
              title="You have no Followings"
              text="Follow athletes to see them here"
            />
          </Box>
        )
      }
    </SkeletonLoader>
  );
};

export default FollowingAthletesList;
