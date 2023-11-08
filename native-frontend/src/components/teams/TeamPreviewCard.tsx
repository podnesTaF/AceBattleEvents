import TitleRect from "@Components/common/TitleRect";
import { Ionicons } from "@expo/vector-icons";
import {
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  Image,
  Pressable,
  VStack,
} from "@gluestack-ui/themed";
import { Link, useRouter } from "expo-router";
import React from "react";

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
  editable?: boolean;
}

const TeamPreviewCard: React.FC<TeamProps> = ({
  team,
  Item,
  imageProportion,
  minWidth,
  shadow,
  showLink,
  editable,
}) => {
  const router = useRouter();

  const handlePress = () => {
    if (showLink) {
      router.push(`/teams/${team.id}`);
    }
  };
  return (
    <VStack
      minWidth={minWidth || "$full"}
      rounded={"$md"}
      bg={"$white"}
      softShadow={shadow ? "1" : undefined}
      overflow="hidden"
    >
      <Pressable onPress={handlePress}>
        {({ pressed }: { pressed: boolean }) => (
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
            {editable && (
              <Box position="absolute" right={"$2"} top={"$2"}>
                <Link
                  href={{
                    pathname: "/manage-team",
                    params: { teamId: team.id },
                  }}
                  asChild
                >
                  <Button size="sm" action="primary" variant="solid">
                    <ButtonIcon>
                      <Ionicons name="md-create" size={16} color="white" />
                    </ButtonIcon>
                    <ButtonText>Edit</ButtonText>
                  </Button>
                </Link>
              </Box>
            )}
          </Box>
        )}
      </Pressable>
      <Item team={team} />
    </VStack>
  );
};

export default TeamPreviewCard;
