import { Ionicons } from "@expo/vector-icons";
import { Box, HStack, Text } from "@gluestack-ui/themed";
import React from "react";

const FakeSearchBar = ({
  placeholder,
  bg,
}: {
  placeholder: string;
  bg?: any;
}) => {
  return (
    <HStack
      alignItems="center"
      width={"$full"}
      bg={bg || "$white"}
      rounded={"$lg"}
      px={"$3"}
      py={"$1.5"}
    >
      <Box mr={"$2"}>
        <Ionicons name={"search"} size={24} color={"gray"} />
      </Box>
      <Text size={"lg"} color="$coolGray400">
        {placeholder}
      </Text>
      <Box ml={"auto"}>
        <Ionicons name={"arrow-forward"} size={24} color={"gray"} />
      </Box>
    </HStack>
  );
};

export default FakeSearchBar;
