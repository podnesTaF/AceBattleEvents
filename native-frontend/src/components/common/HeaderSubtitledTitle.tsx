import { Heading, VStack } from "@gluestack-ui/themed";
import React from "react";

const HeaderSubtitledTitle = ({
  title,
  subtitle,
  tintColor,
}: {
  title: string;
  subtitle: string;
  tintColor?: string;
}) => {
  return (
    <VStack alignItems="center">
      <Heading size="lg" color={tintColor}>
        {title}
      </Heading>
      <Heading size="xs" color={tintColor}>
        {subtitle}
      </Heading>
    </VStack>
  );
};

export default HeaderSubtitledTitle;
