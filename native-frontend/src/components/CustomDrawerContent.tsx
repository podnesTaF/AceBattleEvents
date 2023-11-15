import { Box, Button, ButtonText, VStack } from "@gluestack-ui/themed";
import { useAppSelector, useLogout } from "@lib/hooks";
import { selectIsAuth } from "@lib/store";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import React from "react";
import LogoTitle from "./LogoTitle";

const CustomDrawerContent = (props: any) => {
  const isAuth = useAppSelector(selectIsAuth);
  const logout = useLogout();

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
        </VStack>
        {isAuth && (
          <Box p={"$2"} mt={"auto"}>
            <Button
              onPress={logout}
              action={"negative"}
              variant="solid"
              w={"$full"}
            >
              <ButtonText>Logout</ButtonText>
            </Button>
          </Box>
        )}
      </Box>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
