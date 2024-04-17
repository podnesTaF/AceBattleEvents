import {
  Button,
  ButtonText,
  CloseIcon,
  Heading,
  Icon,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
} from "@gluestack-ui/themed";
import React, { useRef } from "react";

type CustomModalProps = {
  isOpen: boolean;
  onClose: (action?: string) => void;
  title?: string;
  text: string;
  buttons?: {
    props: {
      [key: string]: any;
    };
    title: string;
  }[];
};

const CustomModal = ({
  isOpen,
  onClose,
  title,
  text,
  buttons,
}: CustomModalProps): JSX.Element => {
  const modalRef = useRef();

  return (
    <Modal isOpen={isOpen} onClose={onClose} finalFocusRef={modalRef}>
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg">{title || "Info"}</Heading>
          <ModalCloseButton>
            <Icon as={CloseIcon} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <Text>{text}</Text>
        </ModalBody>
        <ModalFooter>
          {buttons?.length ? (
            buttons.map((button, i) => (
              <Button
                key={i}
                size="sm"
                action="positive"
                {...button.props}
                onPress={() => onClose(button.title)}
              >
                <ButtonText>{button.title}</ButtonText>
              </Button>
            ))
          ) : (
            <Button
              size="sm"
              action="positive"
              borderWidth="$0"
              onPress={() => onClose()}
            >
              <ButtonText>Thanks</ButtonText>
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
