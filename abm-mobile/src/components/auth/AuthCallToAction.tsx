import Container from "@Components/common/Container";
import AbmButton from "@Components/common/buttons/AbmButton";
import {
  Box,
  ButtonGroup,
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { loginPrivileges } from "@lib/common/data";
import { useRouter } from "expo-router";
import { CheckIcon } from "lucide-react-native";
import { useTranslation } from "react-i18next";

const AuthCallToAction = ({
  screen,
}: {
  screen: "home" | "notification" | "account" | "events";
}) => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <Container vertical borderColor={"$black"}>
      <Box py={"$4"}>
        <Heading size={"lg"} mb={"$2"}>
          {loginPrivileges(screen, t).title}
        </Heading>
        <VStack space="sm" mb={"$4"}>
          {loginPrivileges(screen, t).privileges.map((item, index) => (
            <HStack key={index} space="sm">
              <Icon as={CheckIcon} size={"lg"} />
              <Text key={index} size={"md"}>
                {item}
              </Text>
            </HStack>
          ))}
        </VStack>
        <ButtonGroup space={"lg"}>
          <Box flex={1}>
            <AbmButton
              title={t("authCta.joinNow")}
              variant="redFirst"
              onPress={() => router.push("/(auth)/join")}
            />
          </Box>
          <Box flex={1}>
            <AbmButton
              title={t("authCta.login")}
              onPress={() => router.push("/(auth)/login")}
            />
          </Box>
        </ButtonGroup>
      </Box>
    </Container>
  );
};

export default AuthCallToAction;
