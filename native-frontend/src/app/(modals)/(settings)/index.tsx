import Container from "@Components/common/Container";
import { Box, Heading, Pressable, VStack } from "@gluestack-ui/themed";
import { Link, Stack } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";

const SettingOptions = () => {
  const { t } = useTranslation();
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: (props) => (
            <Box py="$2" alignItems="center">
              <Heading size="lg" color={props.tintColor}>
                {t("accountItems.settings.title")}
              </Heading>
            </Box>
          ),
        }}
      />
      <VStack space="sm" my="$4">
        <Container vertical={true}>
          <Box p={"$2"}>
            <Link href={"/change-data"} asChild>
              <Pressable
                py={"$3"}
                borderBottomColor="$coolGray300"
                borderBottomWidth={2}
              >
                {({ pressed }: { pressed: boolean }) => (
                  <Heading size="md" opacity={pressed ? 0.8 : 1}>
                    {t("settings.changeProfileInfo")}
                  </Heading>
                )}
              </Pressable>
            </Link>
            <Link href={"/change-password"} asChild>
              <Pressable py={"$3"}>
                {({ pressed }: { pressed: boolean }) => (
                  <Heading size="md" opacity={pressed ? 0.8 : 1}>
                    {t("settings.setNewPassword")}
                  </Heading>
                )}
              </Pressable>
            </Link>
          </Box>
        </Container>
      </VStack>
    </>
  );
};

export default SettingOptions;
