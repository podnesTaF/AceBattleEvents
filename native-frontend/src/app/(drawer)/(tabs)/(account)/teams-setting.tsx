import withWatermarkBg from "@Components/HOCs/withWatermark";
import LogoTitle from "@Components/LogoTitle";
import TeamDescription from "@Components/teams/TeamDescription";
import TeamPreviewCard from "@Components/teams/TeamPreviewCard";
import { teams } from "@Constants/dummy-data";
import {
  FlatList,
  Heading,
  Icon,
  Pressable,
  VStack,
} from "@gluestack-ui/themed";
import { Link, Stack } from "expo-router";
import { BadgePlus } from "lucide-react-native";
import React from "react";

const TeamsSetting = () => {
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
            team={item}
            Item={TeamDescription}
            imageProportion={1}
            showLink={true}
            editable={true}
          />
        )}
        keyExtractor={(item: any) => item.id.toString()}
      />
    </>
  );
};

export default withWatermarkBg(TeamsSetting);
