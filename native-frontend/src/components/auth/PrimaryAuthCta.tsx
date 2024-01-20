import withWatermarkBg from "@Components/HOCs/withWatermark";
import AbmButton from "@Components/common/buttons/AbmButton";
import { Box, HStack, Heading, Icon, VStack } from "@gluestack-ui/themed";
import { loginPrivileges } from "@lib/common/data";
import { useAppSelector, useScreenSize } from "@lib/hooks";
import { selectLanguage } from "@lib/store";
import { scaleSize } from "@lib/utils";
import { useRouter } from "expo-router";
import { CheckCircle2 } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";

interface PrimaryAuthCtaProps {
  screen: any;
}

const PrimaryAuthCta = ({ screen }: PrimaryAuthCtaProps): JSX.Element => {
  const { t } = useTranslation();
  return (
    <Box
      borderTopLeftRadius={100}
      borderBottomLeftRadius={200}
      w={"$full"}
      bg={"#ff0000"}
      pl={scaleSize(40)}
      pb={scaleSize(24)}
    >
      <Heading
        py={scaleSize(6)}
        color={"$white"}
        textAlign="center"
        size={"lg"}
      >
        {loginPrivileges(screen, t).title}
      </Heading>
      <Box
        overflow="hidden"
        borderTopLeftRadius={100}
        borderBottomLeftRadius={200}
        py={scaleSize(30)}
        bg={"$white"}
        justifyContent="center"
        flex={1}
      >
        <BoxWithBg screen={screen} />
      </Box>
    </Box>
  );
};

export default PrimaryAuthCta;

const AuthCtaBox = ({ screen }: any): JSX.Element => {
  const router = useRouter();
  const { isSmallScreen } = useScreenSize();
  const language = useAppSelector(selectLanguage);
  const { t } = useTranslation();
  return (
    <Box
      flexDirection={isSmallScreen || language !== "en" ? "column" : "row"}
      pl={scaleSize(24)}
      pr={scaleSize(8)}
      gap={"$4"}
    >
      <VStack flex={1}>
        {loginPrivileges(screen, t).privileges.map((p: string, i: number) => (
          <HStack key={i} space="xs" alignItems="center">
            <Icon as={CheckCircle2} size="md" color="#ff0000" />
            <HStack space="xs">
              <Heading size={"sm"} color={"$black"}>
                {p.split(" ").slice(0, -1).join(" ")}
              </Heading>
              <Heading size={"sm"} color={"#ff0000"}>
                {p.split(" ").pop()}
              </Heading>
            </HStack>
          </HStack>
        ))}
      </VStack>
      <VStack flex={1} space="lg">
        <AbmButton
          title={t("authCta.joinNow")}
          variant="redFirst"
          onPress={() => router.push("/(auth)/join")}
        />
        <AbmButton
          title={t("authCta.login")}
          onPress={() => router.push("/(auth)/login")}
        />
      </VStack>
    </Box>
  );
};

const BoxWithBg = withWatermarkBg(AuthCtaBox);
