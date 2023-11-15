import {
  Alert,
  AlertIcon,
  AlertText,
  InfoIcon,
  VStack,
} from "@gluestack-ui/themed";
import { AlertCircle, Ban, CheckCircle2 } from "lucide-react-native";
import React from "react";

type InfoTemplateProps = {
  title?: string;
  text?: string;
  type?: "info" | "error" | "success" | "warning";
};

const icons = {
  info: InfoIcon,
  error: Ban,
  success: CheckCircle2,
  warning: AlertCircle,
} as const;

const InfoTemplate = ({
  title,
  type,
  text,
}: InfoTemplateProps): JSX.Element => (
  <Alert mx="$2.5" action="info" variant="accent">
    <AlertIcon as={type ? icons[type] : icons["info"]} mr="$3" />
    <VStack space="xs">
      <AlertText fontWeight="$bold">{title}</AlertText>
      <AlertText>{text}</AlertText>
    </VStack>
  </Alert>
);

export default InfoTemplate;
