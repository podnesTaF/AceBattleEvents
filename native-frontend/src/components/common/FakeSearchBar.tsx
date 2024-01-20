import { Ionicons } from "@expo/vector-icons";
import { Box, HStack, Text } from "@gluestack-ui/themed";
import React from "react";
import { useTranslation } from "react-i18next";

const FakeSearchBar = ({
  placeholder,
  bg,
  showIcon = true,
}: {
  placeholder: string;
  bg?: any;
  showIcon?: boolean;
}) => {
  const { t } = useTranslation();
  return (
    <HStack
      alignItems="center"
      width={"$full"}
      bg={bg || "$white"}
      rounded={"$lg"}
      px={"$3"}
      py={"$1.5"}
    >
      {showIcon && (
        <Box mr={"$2"}>
          <Ionicons name={"search"} size={24} color={"gray"} />
        </Box>
      )}
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
