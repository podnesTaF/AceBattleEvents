import { Badge, BadgeText, Pressable } from "@gluestack-ui/themed";
import React from "react";

interface NewsTagProps {
  title: string;
  onClick: (name: string) => void;
  action?: "error" | "warning" | "success" | "info" | "muted";
  variant?: "outline" | "solid";
  size?: "sm" | "md" | "lg";
}

const NewsTag = ({ size, title, onClick, action, variant }: NewsTagProps) => {
  return (
    <Pressable onPress={() => onClick(title)}>
      <Badge
        size={size}
        variant={variant}
        action={action}
        borderRadius={"$full"}
        py={"$2"}
        px={"$3"}
      >
        <BadgeText size={size}>{title}</BadgeText>
      </Badge>
    </Pressable>
  );
};

export default NewsTag;
