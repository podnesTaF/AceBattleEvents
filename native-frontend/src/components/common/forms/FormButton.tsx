import {
  Button,
  ButtonIcon,
  ButtonSpinner,
  ButtonText,
} from "@gluestack-ui/themed";
import React from "react";

const FormButton = ({ title, isLoading, icon, ...props }: any) => {
  return (
    <Button variant="solid" action="positive" {...props}>
      {isLoading && <ButtonSpinner mr="$1" />}
      {icon && <ButtonIcon mr="$1" as={icon} />}
      <ButtonText>{title}</ButtonText>
    </Button>
  );
};

export default FormButton;
