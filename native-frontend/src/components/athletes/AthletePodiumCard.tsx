import { Box, Center, Image, Text, VStack } from "@gluestack-ui/themed";
import { IRunner } from "@lib/models";
import React from "react";

interface AthletePodiumCardProps {
  runner?: IRunner;
}

const AthletePodiumCard: React.FC<AthletePodiumCardProps> = ({ runner }) => {
  if (!runner) return null;
  return (
    <Center
      alignSelf={
        runner.rank === 2
          ? "center"
          : runner.rank === 1
          ? "flex-start"
          : "flex-end"
      }
    >
      <Box mb={"$1"} width={"$full"}>
        <Image
          role={"img"}
          source={{
            uri:
              runner.user.image?.mediaUrl ||
              "https://storage.googleapis.com/abe_cloud_storage/image/large/55c30c67-37aa-4476-bae9-b6f847a707fd.png",
          }}
          alt={"avatar"}
          size={"lg"}
          height={80}
          objectFit="cover"
          borderTopLeftRadius={20}
          borderBottomRightRadius={20}
        />
      </Box>
      <VStack alignItems="center" maxWidth={"$32"}>
        <Text fontWeight="600" size="lg" color={"$white"}>
          Rank {runner.rank}
        </Text>
        <Text size="md" color="$coolGray300" textAlign="center">
          {runner.user.name} {runner.user.surname}
        </Text>
      </VStack>
    </Center>
  );
};

export default AthletePodiumCard;
