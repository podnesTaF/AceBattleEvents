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

const AuthCallToAction = ({
  screen,
}: {
  screen: "home" | "notification" | "account" | "events";
}) => {
  const router = useRouter();

  return (
    <Container vertical borderColor={"$black"}>
      <Box py={"$4"}>
        <Heading size={"lg"} mb={"$2"}>
          {loginPrivileges(screen).title}
        </Heading>
        <VStack space="sm" mb={"$4"}>
          {loginPrivileges(screen).privileges.map((item, index) => (
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
              title="Join Now"
              variant="redFirst"
              onPress={() => router.push("/(auth)/join")}
            />
          </Box>
          <Box flex={1}>
            <AbmButton
              title="Login"
              onPress={() => router.push("/(auth)/login")}
            />
          </Box>
        </ButtonGroup>
      </Box>
    </Container>
  );
};

export default AuthCallToAction;
