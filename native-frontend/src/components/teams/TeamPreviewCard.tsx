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
import { ITeam } from "@lib/models";
import { scaleSize } from "@lib/utils";
import { Link, useRouter } from "expo-router";
import React from "react";

interface ItemProps {
  team: ITeam;
}

interface TeamProps {
  team: ITeam;
  Item: React.FC<ItemProps>;
  minWidth?: number;
  imageProportion?: number;
  shadow?: boolean;
  showLink?: boolean;
  editable?: boolean;
  titlePosition?: string;
}

const TeamPreviewCard = ({
  team,
  Item,
  imageProportion,
  minWidth,
  shadow,
  showLink,
  editable,
  titlePosition,
}: TeamProps): JSX.Element => {
  const router = useRouter();

  const handlePress = () => {
    if (showLink) {
      router.push(`/(modals)/(team)/${team.id}`);
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
      <Pressable flex={imageProportion || 2} onPress={handlePress}>
        {({ pressed }: { pressed: boolean }) => (
          <Box
            opacity={pressed ? 0.9 : 1}
            flex={imageProportion || 1}
            height={scaleSize(200)}
            width={"$full"}
            position="relative"
            alignItems="stretch"
          >
            <TitleRect
              position={titlePosition}
              title={team.name}
              icon={"md-people"}
            />
            <Image
              role={"img"}
              source={{
                uri:
                  team.teamImage?.mediaUrl ||
                  "https://storage.googleapis.com/abe_cloud_storage/image/large/55c30c67-37aa-4476-bae9-b6f847a707fd.png",
              }}
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
      <Box flex={1}>
        <Item team={team} />
      </Box>
    </VStack>
  );
};

export default TeamPreviewCard;
