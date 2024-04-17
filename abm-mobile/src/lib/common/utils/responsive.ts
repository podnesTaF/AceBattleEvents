import { Dimensions, Platform, StatusBar } from "react-native";

const { width } = Dimensions.get("window");

export const scaleSize = (size: number) => {
  const ratio = size / 375;
  return Math.round(ratio * width);
};

export const getPaddingForPlatform = () => {
  const isAndroid = Platform.OS === "android";
  const statusBarHeight = StatusBar.currentHeight;

  return isAndroid ? statusBarHeight : 0;
};
