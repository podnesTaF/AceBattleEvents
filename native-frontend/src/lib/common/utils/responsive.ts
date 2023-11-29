import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const scaleSize = (size: number) => {
  const ratio = size / 375;
  return Math.round(ratio * width);
};
