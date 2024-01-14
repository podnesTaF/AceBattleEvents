import {
  Alert,
  AlertIcon,
  AlertText,
  InfoIcon,
  VStack,
} from "@gluestack-ui/themed";
import { scaleSize } from "@lib/utils";
import { AlertCircle, Ban, CheckCircle2 } from "lucide-react-native";
import React from "react";

type InfoTemplateProps = {
  title?: string;
  text?: string;
  height?: any;
  type?: "info" | "error" | "success" | "warning";
  variant?: "outline" | "solid" | "accent";
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
  variant,
  height,
}: InfoTemplateProps): JSX.Element => (
  <Alert
    py={"$6"}
    height={height || "$24"}
    action={type || "info"}
    variant={variant || "accent"}
  >
    <AlertIcon as={type ? icons[type] : icons["info"]} mr="$3" />
    <VStack space="xs" maxWidth={scaleSize(250)}>
      <AlertText fontWeight="$bold">{title}</AlertText>
      <AlertText numberOfLines={2}>{text}</AlertText>
    </VStack>
  </Alert>
);

export default InfoTemplate;
