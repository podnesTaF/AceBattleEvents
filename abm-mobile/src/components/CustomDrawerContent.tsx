import { Box, HStack, VStack } from "@gluestack-ui/themed";
import { useAppDispatch, useAppSelector, useLogout } from "@lib/hooks";
import { selectIsAuth, selectLanguage, setLanguage } from "@lib/store";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import i18n from "i18next";
import React from "react";
import { useTranslation } from "react-i18next";
import LogoTitle from "./LogoTitle";
import SwitchLanguageItem from "./common/SwitchLanguageItem";
import FormButton from "./common/forms/FormButton";

const CustomDrawerContent = (props: any) => {
  const isAuth = useAppSelector(selectIsAuth);
  const currentLanguage = useAppSelector(selectLanguage);
  const dispatch = useAppDispatch();
  const [logout, isLoading] = useLogout();
  const { t } = useTranslation();

  const switchLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    dispatch(setLanguage(languageCode));
  };

  return (
    <DrawerContentScrollView
      style={{ backgroundColor: "#1F1C1E", flex: 1 }}
      {...props}
    >
      <Box flex={1}>
        <VStack>
          <Box px={"$2"} py={"$4"} pb={"$8"}>
            <LogoTitle />
          </Box>
          <HStack px={"$2"} w={"$full"}>
            {["en", "fr", "ua"].map((languageCode) => (
              <SwitchLanguageItem
                key={languageCode}
                isActive={currentLanguage === languageCode}
                name={languageCode}
                onPress={switchLanguage}
              />
            ))}
          </HStack>
          <DrawerItemList {...props} />
        </VStack>
        {isAuth && (
          <Box p={"$2"} mt={"auto"}>
            <FormButton
              title={t("auth.logout")}
              onPress={logout}
              isLoading={isLoading}
              action={"negative"}
              variant="solid"
              w={"$full"}
            />
          </Box>
        )}
      </Box>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
