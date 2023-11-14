import { Box, Button, ButtonText, Heading } from "@gluestack-ui/themed";
import { Link, useRouter } from "expo-router";
import React from "react";

interface Props {
  item:
    | string
    | {
        type: string;
        color: string;
        text: string;
        link: any;
      };
  isLast?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  width?: any;
}

const TableRowItem: React.FC<Props> = ({ item, isLast, size, width }) => {
  const router = useRouter();

  if (typeof item !== "string") {
    if (item.type === "button") {
      return (
        <Box flex={isLast ? 3 : 2}>
          <Button
            size={size || "sm"}
            alignSelf={isLast ? "flex-end" : "auto"}
            onPress={() => router.push(item.link)}
            variant={"solid"}
            action={"positive"}
          >
            <ButtonText>{item.text}</ButtonText>
          </Button>
        </Box>
      );
    } else {
      return (
        <Link href={item.link}>
          <Heading
            width={width}
            flex={!width ? (isLast ? 3 : 2) : undefined}
            textAlign={isLast ? "right" : "left"}
            color={item.color || "$black"}
            size={size || "md"}
          >
            {item.text}
          </Heading>
        </Link>
      );
    }
  } else {
    return (
      <Heading
        width={width}
        flex={!width ? (isLast ? 3 : 2) : undefined}
        color={"$black"}
        size={size || "md"}
      >
        {item}
      </Heading>
    );
  }
};

export default TableRowItem;
