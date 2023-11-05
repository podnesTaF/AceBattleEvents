import React from "react";
import {
  Box,
  VStack,
  Image,
  HStack,
  Heading,
  Text,
  Pressable,
} from "@gluestack-ui/themed";
import { Link, useRouter } from "expo-router";
import TeamPreview from "./TeamPreview";
import { Ionicons } from "@expo/vector-icons";
import TitleRect from "@Components/common/TitleRect";

interface ItemProps {
  team: any;
}

interface TeamProps {
  team: any;
  Item: React.FC<ItemProps>;
  minWidth?: number;
  imageProportion?: number;
  shadow?: boolean;
  showLink?: boolean;
}

const TeamPreviewCard: React.FC<TeamProps> = ({ team, Item, imageProportion, minWidth, shadow, showLink}) => {
  const router = useRouter();

  const handlePress = () => {
    if (showLink) {
      router.push(`/teams/${team.id}`);
    }
  }
  return (
    <VStack
      minWidth={minWidth || "$full"}
      rounded={"$md"}
      bg={"$white"}
      softShadow={shadow ? "1" : undefined}
      overflow="hidden"
    >
      <Pressable onPress={handlePress}>
        {({pressed}: {pressed: boolean}) => (
          <Box
          opacity={pressed ? 0.9 : 1}
          flex={imageProportion || 1}
          height={"$40"}
          width={"$full"}
          position="relative"
          alignItems="stretch"
        >
          <TitleRect title={team.name} icon={"md-people"} />
          <Image
            role={"img"}
            source={{ uri: "https://acebattlemile.org/profile-bg-lg.jpg" }}
            alt={"team preview"}
            size="full"
          />
        </Box>
        )}
      </Pressable>
      <Item team={team} />
    </VStack>
  );
};

export default TeamPreviewCard;
