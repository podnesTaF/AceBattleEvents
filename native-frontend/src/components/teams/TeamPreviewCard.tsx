import React from "react";
import {
  Box,
  VStack,
  Image,
  HStack,
  Heading,
  Text,
} from "@gluestack-ui/themed";
import { Link } from "expo-router";
import TeamPreview from "./TeamPreview";

interface ItemProps {
  team: any;
}

interface TeamProps {
  team: any;
  Item: React.FC<ItemProps>;
  minWidth?: number;
  imageProportion?: number;
  shadow?: boolean;
}

const TeamPreviewCard: React.FC<TeamProps> = ({ team, Item, imageProportion, minWidth, shadow }) => {
  return (
    <VStack
      minWidth={minWidth || "$full"}
      rounded={"$md"}
      bg={"$white"}
      softShadow={shadow ? "1" : undefined}
      overflow="hidden"
    >
      <Box
        flex={imageProportion || 1}
        height={"$40"}
        width={"$full"}
        position="relative"
        alignItems="stretch"
      >
        <Image
          role={"img"}
          source={{ uri: "https://acebattlemile.org/profile-bg-lg.jpg" }}
          alt={"team preview"}
          size="full"
        />
      </Box>
      <Item team={team} />
    </VStack>
  );
};

export default TeamPreviewCard;
