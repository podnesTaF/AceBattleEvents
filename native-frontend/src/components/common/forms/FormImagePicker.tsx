import {
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  HStack,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { cutString } from "@lib/utils";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { ImagePlus, Trash2Icon } from "lucide-react-native";
import React, { useState } from "react";

interface FormImagePickerProps {
  placeholder: string;
  label: string;
  name: string;
  imageUrl?: string;
  defaultImageName?: string;
  onImagePicked: (image: string, name: string) => void;
  vertical?: boolean;
  withoutUnderline?: boolean;
  type?: "image" | "avatar";
  withPreview?: boolean;
}

const FormImagePicker: React.FC<FormImagePickerProps> = ({
  placeholder,
  label,
  name,
  defaultImageName,
  imageUrl,
  onImagePicked,
  vertical,
  withoutUnderline,
  type,
  withPreview,
}) => {
  const [selectedImageName, setSelectedImageName] = useState<
    string | undefined
  >(imageUrl?.split("/").pop() || defaultImageName);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | undefined>(
    imageUrl
  );

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImageName(result.assets[0].uri.split("/").pop());
      setSelectedImageUrl(result.assets[0].uri);
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
      borderBottomWidth={withoutUnderline ? 0 : 1}
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
      <VStack
        space={"md"}
        alignItems="center"
        w={vertical ? "$full" : "auto"}
        flex={vertical ? undefined : 2}
      >
        {withPreview && selectedImageUrl && (
          <Box w={"$24"} h={"$20"}>
            {type === "image" ? (
              <Image
                alt={"Selected Image"}
                source={{ uri: selectedImageUrl }}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 8,
                }}
                contentFit="contain"
              />
            ) : (
              <Image
                source={{ uri: selectedImageUrl }}
                role="img"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 16,
                }}
                alt={"Selected Image"}
                contentFit="contain"
              />
            )}
          </Box>
        )}
        <HStack space="sm" alignItems="center">
          <Button
            flex={1}
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
          {selectedImageName && (
            <Button
              borderRadius="$full"
              size="sm"
              p="$3.5"
              onPress={() => {
                setSelectedImageName(undefined);
                setSelectedImageUrl(undefined);
                onImagePicked("", name);
              }}
              action={"primary"}
              variant={"solid"}
            >
              <ButtonIcon as={Trash2Icon} />
            </Button>
          )}
        </HStack>
      </VStack>
    </Box>
  );
};

export default FormImagePicker;
