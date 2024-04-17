import { Box, Center, HStack, Heading, Spinner } from "@gluestack-ui/themed";
import { IRunner } from "@lib/models";
import { useGetTopAthletesQuery } from "@lib/services";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable } from "react-native";
import AthletePodiumCard from "./AthletePodiumCard";

const TopAthletesPodium = () => {
  const { t } = useTranslation();
  const { data: topAthletes, isLoading: topAthletesLoading } =
    useGetTopAthletesQuery({ top: 3 });

  const [activeGender, setActiveGender] = useState<"male" | "female">("male");

  const renderLoading = () => (
    <Center height={200}>
      <Spinner size="large" />
    </Center>
  );

  return (
    <Box my={"$4"} p={"$3"} bg={"$coolGray900"}>
      <Heading size="lg" color="$white" mb={"$4"}>
        {t("mainPage.topAbmRunners")}
      </Heading>
      <Center width={"$full"} mb={"$4"}>
        <HStack>
          {(["male", "female"] as const).map((gender) => (
            <Pressable key={gender} onPress={() => setActiveGender(gender)}>
              {({ pressed }: { pressed: boolean }) => (
                <Box
                  bg={
                    activeGender === gender
                      ? pressed
                        ? "$red700"
                        : "$red500"
                      : pressed
                      ? "$coolGray900"
                      : "$coolGray700"
                  }
                  minWidth={"$24"}
                  borderBottomLeftRadius={gender === "male" ? 20 : 0}
                  borderTopRightRadius={gender === "female" ? 20 : 0}
                  px={"$3"}
                  py={"$1"}
                >
                  <Heading size="xl" color="$white" textAlign="center">
                    {gender === "male"
                      ? t("mainPage.genderHeading.male")
                      : t("mainPage.genderHeading.female")}
                  </Heading>
                </Box>
              )}
            </Pressable>
          ))}
        </HStack>
      </Center>

      <Center mb={"$5"} px={"$4"}>
        {!topAthletes || topAthletesLoading ? (
          renderLoading()
        ) : (
          <HStack space="lg" width={"$full"}>
            {[2, 1, 3].map((rank, i) => (
              <HStack key={rank} height={"$48"} flex={1}>
                <AthletePodiumCard
                  runner={topAthletes[activeGender]?.find(
                    (runner: IRunner) => runner.rank === rank
                  )}
                />
              </HStack>
            ))}
          </HStack>
        )}
      </Center>
    </Box>
  );
};

export default TopAthletesPodium;
