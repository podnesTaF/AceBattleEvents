import WithLoading from "@Components/HOCs/withLoading";
import withWatermarkBg from "@Components/HOCs/withWatermark";
import LogoTitle from "@Components/LogoTitle";
import InfoTemplate from "@Components/common/InfoTemplate";
import TeamDescription from "@Components/teams/TeamDescription";
import TeamPreviewCard from "@Components/teams/TeamPreviewCard";
import {
  FlatList,
  Heading,
  Icon,
  Pressable,
  VStack,
} from "@gluestack-ui/themed";
import { useAppSelector } from "@lib/hooks";
import { ITeam } from "@lib/models";
import { useGetTeamsByManagerQuery } from "@lib/services";
import { selectUser } from "@lib/store";
import { Link, Stack } from "expo-router";
import { BadgePlus } from "lucide-react-native";
import React from "react";

const TeamsSetting = () => {
  const user = useAppSelector(selectUser);
  const { data: teams, isLoading } = useGetTeamsByManagerQuery({
    managerId: user?.id,
  });
  return (
    <>
      <Stack.Screen
        options={{
          title: "Calendar",
          headerStyle: {
            backgroundColor: "#1C1E1F",
          },
          headerTintColor: "#fff",
          headerTitle: (props) => <LogoTitle {...props} />,
          headerRight: ({ tintColor }) => (
            <Link href={"/manage-team"} asChild>
              <Pressable>
                {({ pressed }: { pressed: boolean }) => (
                  <Icon
                    as={BadgePlus}
                    color={tintColor}
                    size="xl"
                    opacity={pressed ? 0.9 : 1}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <WithLoading isLoading={isLoading || !teams}>
        {teams?.length ? (
          <FlatList
            pt={"$4"}
            px={"$6"}
            ListFooterComponent={() => <VStack h={"$8"} />}
            ListHeaderComponent={() => (
              <Heading size={"xl"} mb={"$4"}>
                Your Teams
              </Heading>
            )}
            ItemSeparatorComponent={() => <VStack h={"$4"} />}
            nestedScrollEnabled
            data={teams}
            renderItem={({ item }) => (
              <TeamPreviewCard
                team={item as ITeam}
                Item={TeamDescription}
                imageProportion={1}
                showLink={true}
                editable={true}
              />
            )}
            keyExtractor={(item: any) => item.id.toString()}
          />
        ) : (
          <InfoTemplate
            title={"No teams found"}
            text={"you have no teams yet"}
          />
        )}
      </WithLoading>
    </>
  );
};

export default withWatermarkBg(TeamsSetting);
