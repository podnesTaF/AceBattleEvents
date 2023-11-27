import {
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  Text,
} from "@gluestack-ui/themed";
import { cutString } from "@lib/utils";
import * as ImagePicker from "expo-image-picker";
import { ImagePlus } from "lucide-react-native";
import React, { useState } from "react";

interface FormImagePickerProps {
  placeholder: string;
  label: string;
  name: string;
  defaultImageName?: string;
  onImagePicked: (image: string, name: string) => void;
  vertical?: boolean;
}

const FormImagePicker: React.FC<FormImagePickerProps> = ({
  placeholder,
  label,
  name,
  defaultImageName,
  onImagePicked,
  vertical,
}) => {
  const [selectedImageName, setSelectedImageName] = useState<string | null>();

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImageName(result.assets[0].uri.split("/").pop());
      // const response = await fetch(result.assets[0].uri);
      // const blob = await response.blob();
      onImagePicked(result.assets[0].uri, name);
    } else {
      alert("You did not select any image.");
    }
  };

  return (
    <Box
      flexDirection={vertical ? "column" : "row"}
      justifyContent="space-between"
      alignItems={vertical ? "flex-start" : "center"}
      py={"$1"}
      borderBottomWidth={1}
      borderBottomColor="$coolGray300"
    >
      <Text
        mr={vertical ? "$0" : "$2"}
        mb={vertical ? "$4" : "$0"}
        size={"md"}
        flex={1}
      >
        {label}
      </Text>
      <Box alignSelf="center" flex={2}>
        <Button
          onPress={pickImageAsync}
          action={"primary"}
          variant={"solid"}
          size={"sm"}
        >
          <ButtonText>
            {selectedImageName
              ? cutString(`${selectedImageName} selected`, 15)
              : defaultImageName
              ? cutString(`${defaultImageName} selected`, 15)
              : placeholder}
          </ButtonText>
          <ButtonIcon as={ImagePlus} />
        </Button>
      </Box>
    </Box>
  );
};

export default FormImagePicker;
