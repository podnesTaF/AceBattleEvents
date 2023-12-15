import { Ionicons } from "@expo/vector-icons";
import { Box, Heading, Text, VStack } from "@gluestack-ui/themed";
import { useScreenSize } from "@lib/hooks";
import { scaleSize } from "@lib/utils";
import { useRouter } from "expo-router";
import React from "react";

interface ProfileItemProps {
  title: string;
  subtitle?: string;
  icon?: any;
  color: any;
  isDark?: boolean;
  link: any;
}

const ProfileItem: React.FC<ProfileItemProps> = ({
  title,
  subtitle,
  icon,
  color,
  isDark,
  link,
}) => {
  const router = useRouter();
  const { isSmallScreen } = useScreenSize();
  return (
    <Box
      rounded={"$lg"}
      height={scaleSize(150)}
      bgColor={color || "$white"}
      py={isSmallScreen ? "$2" : "$3"}
      px={isSmallScreen ? "$2" : "$4"}
    >
      <Box minHeight={40} alignItems="flex-end" mb={"$2"}>
        {icon && (
          <Ionicons name={icon} size={40} color={isDark ? "white" : "black"} />
        )}
      </Box>
      <VStack>
        <Heading
          size={isSmallScreen ? "md" : "lg"}
          color={isDark ? "$white" : "$black"}
        >
          {title}
        </Heading>
        <Text
          size={isSmallScreen ? "sm" : "md"}
          color={isDark ? "$coolGray200" : "$coolGray400"}
        >
          {subtitle}
        </Text>
      </VStack>
    </Box>
  );
};

export default ProfileItem;
