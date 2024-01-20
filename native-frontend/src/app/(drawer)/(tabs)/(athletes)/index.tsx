import withWatermarkBg from "@Components/HOCs/withWatermark";
import AthletePreviewCard from "@Components/athletes/AthletePreviewCard";
import FollowingAthletesList from "@Components/athletes/FollowingAthletesList";
import HorizontalListLayout from "@Components/common/HorizontalListLayout";
import InfoTemplate from "@Components/common/InfoTemplate";
import SkeletonLoader from "@Components/common/states/SkeletonLoader";
import TeamPreview from "@Components/teams/TeamPreview";
import TeamPreviewCard from "@Components/teams/TeamPreviewCard";
import { HStack, Heading, ScrollView, VStack } from "@gluestack-ui/themed";
import { useAppSelector } from "@lib/hooks";
import { IRunner, ITeam } from "@lib/models";
import { useGetTopTeamsQuery } from "@lib/services";
import { selectUser } from "@lib/store";
import { useGetTopAthletesQuery } from "@lib/user/services/RunnerService";
import React from "react";
import { useTranslation } from "react-i18next";

const Athletes = () => {
  const user = useAppSelector(selectUser);
  const { t } = useTranslation();

  const {
    data: athletes,
    error,
    isLoading: isAthletesLoading,
  } = useGetTopAthletesQuery({ top: 2 });

  const {
    data: teams,
    error: teamsError,
    isLoading: isTeamsLoading,
  } = useGetTopTeamsQuery({});

  return (
    <ScrollView bg={"$fff9ff"}>
      <VStack my={"$4"} space="sm">
        <HStack mx={"$4"}>
          <Heading size="lg">{t("common.top")} </Heading>
          <Heading size="lg" color="$red500">
            AB{" "}
          </Heading>
          <Heading size="lg">{t("common.teams")}</Heading>
        </HStack>
        <SkeletonLoader<{ male: ITeam[]; female: ITeam[] }>
          data={teams}
          error={teamsError}
          isLoading={isTeamsLoading}
          height={200}
        >
          {(data) => (
            <HorizontalListLayout
              identifier="team"
              items={[...data.male, ...data.female]}
              ItemComponent={TeamPreviewCard}
              additionalProps={{
                Item: TeamPreview,
                imageProportion: 3,
              }}
            />
          )}
        </SkeletonLoader>
      </VStack>
      <VStack my={"$4"} space="sm">
        <HStack mx={"$4"}>
          <Heading size="lg">{t("common.top")} </Heading>
          <Heading size="lg" color="$red500">
            AB{" "}
          </Heading>
          <Heading size="lg">{t("common.runners")}</Heading>
        </HStack>
        <SkeletonLoader<{
          male: IRunner[] | null;
          female: IRunner[] | null;
        }>
          isLoading={isAthletesLoading}
          error={error}
          data={athletes}
        >
          {(data) => (
            <HorizontalListLayout
              identifier="runner"
              items={[...(data.male || []), ...(data.female || [])]}
              ItemComponent={AthletePreviewCard}
            />
          )}
        </SkeletonLoader>
      </VStack>
      <VStack mt={"$4"} mb={"$8"} space="sm">
        <HStack mx={"$4"}>
          <Heading size="lg">{t("common.your")} </Heading>
          <Heading size="lg" color="$red500">
            {t("common.followings")}
          </Heading>
        </HStack>
        {user ? (
          <FollowingAthletesList />
        ) : (
          <InfoTemplate
            title={t("auth.pleaseAuthorize")}
            text={t("auth.authorizeToSeeFollowings")}
          />
        )}
      </VStack>
    </ScrollView>
  );
};

export default withWatermarkBg(Athletes);
