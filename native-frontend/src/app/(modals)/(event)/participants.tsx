import Container from "@Components/common/Container";
import HeaderSubtitledTitle from "@Components/common/HeaderSubtitledTitle";
import Tabs from "@Components/common/Tabs";
import CustomSelect from "@Components/custom/CustomSelect";
import TeamDescription from "@Components/teams/TeamDescription";
import TeamPreviewCard from "@Components/teams/TeamPreviewCard";
import UserCard from "@Components/user/UserCard";
import { teams, users } from "@Constants/dummy-data";
import {
  Box,
  FlatList,
  HStack,
  Heading,
  ScrollView,
  VStack,
} from "@gluestack-ui/themed";
import { IUser } from "@lib/models";
import { Stack } from "expo-router";
import React, { useState } from "react";

const tabs = ["Teams", "Athletes"];

const filters = {
  category: [
    {
      label: "Men's",
      value: "male",
    },
    {
      label: "Women's",
      value: "female",
    },
  ],
  teams: teams.map((team) => ({
    label: team.name,
    value: team.id,
  })),
};

const groupedData = {
  O: users.filter(
    (user) =>
      user.surname[0].toUpperCase() === "O" ||
      user.name[0].toUpperCase() === "O"
  ),
  G: users.slice(1),
};

const participants = () => {
  const [activeTab, setActiveTab] = useState(0);

  const onChangeTab = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#1C1E1F",
          },
          headerShown: true,
          headerTintColor: "#fff",
          headerTitle: ({ tintColor }) => (
            <VStack space={"md"} alignItems="center" w={"$full"} left={"-$16"}>
              <HeaderSubtitledTitle
                title={"Participants"}
                subtitle="Brussels mile"
                tintColor={tintColor}
              />
              <Tabs
                activeColor={"#ff0000"}
                activeIndex={activeTab}
                items={tabs}
                onChangeTab={onChangeTab}
              />
            </VStack>
          ),
        }}
      />
      <VStack>
        {activeTab === 0 && (
          <>
            <HStack
              p={"$4"}
              alignItems="center"
              justifyContent="center"
              space="md"
            >
              <Box
                w={"$1/2"}
                rounded={"$lg"}
                borderColor="$coolGray400"
                borderWidth={1}
              >
                <HStack px={"$3"} py={"$1"} space="lg" alignItems="center">
                  <Heading color="$coolGray400" size={"sm"}>
                    Category
                  </Heading>
                  <Box flex={1}>
                    <CustomSelect
                      onChange={(value) => console.log(value)}
                      items={filters.category}
                      defaultPlaceholder="All"
                    />
                  </Box>
                </HStack>
              </Box>
            </HStack>
            <FlatList
              height={"$full"}
              mx={"$2"}
              data={teams}
              keyExtractor={(item: any) => item.id.toString()}
              ItemSeparatorComponent={() => <Box h={"$4"} />}
              ListFooterComponent={() => <Box h={"$24"} />}
              renderItem={({ item }) => (
                <TeamPreviewCard
                  Item={TeamDescription}
                  team={item}
                  imageProportion={1}
                />
              )}
            />
          </>
        )}
        {activeTab === 1 && (
          <ScrollView>
            <HStack
              p={"$4"}
              alignItems="center"
              justifyContent="center"
              space="md"
            >
              <Box
                w={"$1/2"}
                rounded={"$lg"}
                borderColor="$coolGray400"
                borderWidth={1}
              >
                <HStack px={"$3"} py={"$1"} space="lg" alignItems="center">
                  <Heading color="$coolGray400" size={"sm"}>
                    Category
                  </Heading>
                  <Box flex={1}>
                    <CustomSelect
                      onChange={(value) => console.log(value)}
                      items={filters.category}
                      defaultPlaceholder="All"
                    />
                  </Box>
                </HStack>
              </Box>
              <Box
                w={"$1/2"}
                rounded={"$lg"}
                borderColor="$coolGray400"
                borderWidth={1}
              >
                <HStack px={"$3"} py={"$1"} space="lg" alignItems="center">
                  <Heading color="$coolGray400" size={"sm"}>
                    Team
                  </Heading>
                  <Box flex={1}>
                    <CustomSelect
                      onChange={(value) => console.log(value)}
                      items={filters.teams}
                      defaultPlaceholder="All"
                    />
                  </Box>
                </HStack>
              </Box>
            </HStack>
            <Box pb={"$4"}>
              {Object.keys(groupedData).map((key, i) => (
                <VStack key={i}>
                  <Heading px={"$6"} py={"$2"} color={"$coolGray400"}>
                    {key}
                  </Heading>
                  <Container>
                    {(groupedData as any)[key].map((user: IUser, i: number) => (
                      <UserCard key={user.id} user={user} />
                    ))}
                  </Container>
                </VStack>
              ))}
            </Box>
          </ScrollView>
        )}
      </VStack>
    </>
  );
};

export default participants;
