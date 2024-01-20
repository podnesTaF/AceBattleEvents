import { Box, HStack, VStack } from "@gluestack-ui/themed";
import { useAppDispatch, useAppSelector, useLogout } from "@lib/hooks";
import { selectIsAuth, selectLanguage, setLanguage } from "@lib/store";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import i18n from "i18next";
import React from "react";
import LogoTitle from "./LogoTitle";
import SwitchLanguageItem from "./common/SwitchLanguageItem";
import FormButton from "./common/forms/FormButton";

const CustomDrawerContent = (props: any) => {
  const isAuth = useAppSelector(selectIsAuth);
  const currentLanguage = useAppSelector(selectLanguage);
  const dispatch = useAppDispatch();
  const [logout, isLoading] = useLogout();

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
          <DrawerItemList {...props} />
          <HStack px={"$2"}>
            {["en", "fr", "ua"].map((languageCode) => (
              <SwitchLanguageItem
                key={languageCode}
                isActive={currentLanguage === languageCode}
                name={languageCode}
                onPress={switchLanguage}
              />
            ))}
          </HStack>
        </VStack>
        {isAuth && (
          <Box p={"$2"} mt={"auto"}>
            <FormButton
              title={"Logout"}
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
