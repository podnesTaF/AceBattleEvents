import React from "react";
import { Box, Heading, VStack, Text } from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useRouter } from "expo-router";

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
    <Pressable onPress={() => router.push(link)}>
      {({ pressed }) => (
        <Box rounded={"$lg"} bgColor={color || "$white"}>
          <Box minHeight={40} alignItems="flex-end" mb={"$2"}>
            {icon && (
              <Ionicons
                name={icon}
                size={24}
                color={isDark ? "$white" : "$black"}
              />
            )}
          </Box>
          <VStack space="md">
            <Heading size={"lg"} color={isDark ? "$white" : "$black"}>
              {title}
            </Heading>
            <Text size={"md"} color="$coolGray400">
              {subtitle}
            </Text>
          </VStack>
        </Box>
      )}
    </Pressable>
  );
};

export default ProfileItem;
