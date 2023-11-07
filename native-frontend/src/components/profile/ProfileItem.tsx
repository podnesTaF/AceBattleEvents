import React from "react";
import { Box, Heading, VStack, Text } from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { Link, useRouter } from "expo-router";

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
    const router = useRouter()
  return (
        <Box rounded={"$lg"} height={145} bgColor={color || "$white"} py={"$3"} px={"$4"}>
          <Box minHeight={40} alignItems="flex-end" mb={"$2"}>
            {icon && (  
              <Ionicons
                name={icon}
                size={40}
                color={isDark ? "white" : "black"}
              />
            )}
          </Box>
          <VStack>
            <Heading size={"lg"} color={isDark ? "$white" : "$black"}>
              {title}
            </Heading>
            <Text size={"md"} color={isDark ? "$coolGray200" : "$coolGray400"}>
              {subtitle}
            </Text>
          </VStack>
        </Box>
  );
};

export default ProfileItem;
