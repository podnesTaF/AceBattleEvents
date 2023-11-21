import { Box, Heading, Text } from "@gluestack-ui/themed";
import React from "react";

interface StatCardProps {
  bg: string;
  borderColor?: string;
  radius: number;
  title: string;
  subtitle?: string;
  dark?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  bg,
  borderColor,
  radius,
  title,
  subtitle,
  dark,
}) => {
  return (
    <Box
      width={"$full"}
      px={"$4"}
      py={"$4"}
      minHeight={"$16"}
      bg={bg}
      rounded={radius}
      borderColor={borderColor}
      borderWidth={borderColor ? 1 : 0}
    >
      <Heading size={"sm"} color={dark ? "$white" : "$red500"}>
        {title}
      </Heading>
      {subtitle && (
        <Text maxWidth={"$2/3"} size={"sm"} color={dark ? "$white" : "$black"}>
          {subtitle}
        </Text>
      )}
    </Box>
  );
};

export default StatCard;
