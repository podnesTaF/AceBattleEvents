import { Box, HStack, Heading, Icon } from "@gluestack-ui/themed";
import { SearchIcon } from "lucide-react-native";

type Props = {
  title: string;
  text: string;
};

const NoResourceFound = ({ title, text }: Props): JSX.Element => {
  return (
    <HStack
      py={"$5"}
      flex={1}
      w={"$full"}
      justifyContent="center"
      alignItems="center"
      space={"xs"}
    >
      <Icon
        as={SearchIcon}
        fontSize={40}
        size={40 as any}
        color={"$coolGray400"}
      />
      <Box>
        <Heading size={"lg"} color={"#1c1e1f"}>
          {title}
        </Heading>
        <Box maxWidth={350} px={"$2"}>
          <Heading size={"sm"} color={"$coolGray400"} textAlign="center">
            {text}
          </Heading>
        </Box>
      </Box>
    </HStack>
  );
};

export default NoResourceFound;
