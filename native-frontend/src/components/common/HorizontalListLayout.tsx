import { Box, Center, HStack, ScrollView, Spinner } from "@gluestack-ui/themed";
import React from "react";

interface Props {
  items?: any[];
  ItemComponent: React.FC<any>;
  identifier: string;
  isLoading?: boolean;
  additionalProps?: {
    [key: string]: any;
  };
  wrapperProps?: {
    [key: string]: any;
  };
}

const HorizontalListLayout: React.FC<Props> = ({
  items,
  ItemComponent,
  identifier,
  additionalProps,
  wrapperProps,
  isLoading,
}) => {
  // Loading view
  const renderLoading = () => (
    <Center flex={1}>
      {/* Replace with a loading spinner or component if available */}
      <Spinner size="large" />
    </Center>
  );

  const renderItems = () => {
    if (isLoading || !items) return renderLoading();
    return (
      <HStack px="$6" py={"$2"} w="$full" space={"lg"} {...wrapperProps}>
        {items.map((item, i) => (
          <Box key={item?.id || i} maxWidth={340}>
            <ItemComponent {...{ [identifier]: item }} {...additionalProps} />
          </Box>
        ))}
      </HStack>
    );
  };

  return (
    <ScrollView horizontal={true}>
      {isLoading ? renderLoading() : renderItems()}
    </ScrollView>
  );
};

export default HorizontalListLayout;
