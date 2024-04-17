import {
  Button,
  ButtonGroup,
  ButtonText,
  Heading,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import React from "react";
import Container from "./Container";

const NotAuthTemplate = ({
  text,
  title,
  vertical,
}: {
  text?: string;
  title?: string;
  vertical?: boolean;
}) => {
  const router = useRouter();
  return (
    <Container vertical={vertical}>
      <VStack space="lg" py={"$4"}>
        <Heading size={"lg"}>
          {title ? title : "Welcome to Ace Battle Mile!"}
        </Heading>
        <Text size={"md"}>
          {text ? text : "Please authorize to oversee your profile and events!"}
        </Text>
        <ButtonGroup mb={"$4"} justifyContent="space-between" space="lg">
          <Button flex={1} variant="solid" action="positive">
            <ButtonText>Join Us</ButtonText>
          </Button>
          <Button
            onPress={() => router.push(`/(auth)/login`)}
            flex={1}
            variant="outline"
            action="positive"
          >
            <ButtonText>Sign In</ButtonText>
          </Button>
        </ButtonGroup>
      </VStack>
    </Container>
  );
};

export default NotAuthTemplate;
