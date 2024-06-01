import {
  Box,
  HStack,
  Heading,
  Icon,
  Link,
  LinkText,
  VStack,
} from "@gluestack-ui/themed";
import { Link as ExpoLink } from "expo-router";
import {
  ArrowLeft,
  ArrowUpRightIcon,
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
} from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";

const GetInTouch = () => {
  const { t } = useTranslation();
  return (
    <VStack pl={"$10"} justifyContent="space-between" height={"$full"}>
      <Box bg={"#ff0000"} borderBottomRightRadius={100} py={"$6"} px={"$3"}>
        <Heading color={"$white"} size={"xl"} mb={"$2"}>
          {t("concept.getInTouch")}
        </Heading>
        <VStack space="md" maxWidth={"$80"}>
          <Heading color={"$white"}>
            {t("concept.aceBattleMilePlatform")}
          </Heading>
          <Link href="https://acebattlemile.org" isExternal>
            <HStack alignItems="center">
              <LinkText size="lg" color="$blue100">
                acebattlemile.org
              </LinkText>
              <Icon
                as={ArrowUpRightIcon}
                size="lg"
                color="$info600"
                mt="$0.5"
                sx={{
                  _dark: {
                    color: "$info300",
                  },
                }}
              />
            </HStack>
          </Link>
          <HStack mt={"$10"} alignItems="center" space={"md"}>
            <Icon as={YoutubeIcon} color="$white" size={"lg"} />
            <Link href="https://www.youtube.com/@battlemile6327" isExternal>
              <HStack alignItems="center">
                <LinkText color="$white" size="lg">
                  @battlemile6327
                </LinkText>
                <Icon
                  as={ArrowUpRightIcon}
                  size="lg"
                  color="$info100"
                  mt="$0.5"
                  sx={{
                    _dark: {
                      color: "$info300",
                    },
                  }}
                />
              </HStack>
            </Link>
          </HStack>
          <HStack alignItems="center" space={"md"}>
            <Icon as={FacebookIcon} color="$white" size={"lg"} />
            <Link
              href="https://www.facebook.com/people/Ace-Battle-Mile/100043279343057/"
              isExternal
            >
              <HStack alignItems="center">
                <LinkText color="$white" size="lg">
                  BATTLE MILE
                </LinkText>
                <Icon
                  as={ArrowUpRightIcon}
                  size="lg"
                  color="$info100"
                  mt="$0.5"
                  sx={{
                    _dark: {
                      color: "$info300",
                    },
                  }}
                />
              </HStack>
            </Link>
          </HStack>
          <HStack alignItems="center" space={"md"}>
            <Icon as={InstagramIcon} color="$white" size={"lg"} />
            <Link href="https://www.instagram.com/ace_battle_mile/" isExternal>
              <HStack alignItems="center">
                <LinkText color="$white" size="lg">
                  @ACE_BATTLE_MILE
                </LinkText>
                <Icon
                  as={ArrowUpRightIcon}
                  size="lg"
                  color="$info100"
                  mt="$0.5"
                  sx={{
                    _dark: {
                      color: "$info300",
                    },
                  }}
                />
              </HStack>
            </Link>
          </HStack>
        </VStack>
      </Box>
      <Box
        alignItems="flex-end"
        p={"$4"}
        justifyContent="flex-end"
        position="relative"
        flex={1}
      >
        <ExpoLink href={"/(drawer)/(tabs)/home"}>
          <HStack space={"md"} alignItems="center">
            <Icon as={ArrowLeft} size={"xl"} />
            <Heading size={"lg"}>{t("navigation.backToHome")}</Heading>
          </HStack>
        </ExpoLink>
      </Box>
    </VStack>
  );
};

export default GetInTouch;
