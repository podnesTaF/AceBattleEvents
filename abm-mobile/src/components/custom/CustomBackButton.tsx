import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";

const CustomBackButton = ({ navigation }: { navigation: any }) => {
  return (
    <TouchableOpacity
      style={{
        paddingHorizontal: 10,
        paddingVertical: 5,
      }}
      hitSlop={40}
      onPress={() => navigation.goBack()}
    >
      <Ionicons name="arrow-back" size={24} color="white" />
    </TouchableOpacity>
  );
};

export default CustomBackButton;
