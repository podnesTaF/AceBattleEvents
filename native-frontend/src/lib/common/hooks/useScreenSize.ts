import { useEffect, useState } from "react";
import { Dimensions } from "react-native";

export const useScreenSize = () => {
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get("window").width
  );

  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(Dimensions.get("window").width);
    };

    const subscription = Dimensions.addEventListener(
      "change",
      updateScreenWidth
    );
    return () => subscription.remove();
  }, []);

  return {
    isSmallScreen: screenWidth <= 320,
    isMediumScreen: screenWidth > 320 && screenWidth <= 480,
    isLargeScreen: screenWidth > 480,
  };
};
