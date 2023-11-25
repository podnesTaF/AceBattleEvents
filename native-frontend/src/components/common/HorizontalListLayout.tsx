import { Box, Center, Spinner } from "@gluestack-ui/themed";
import React from "react";
import { Dimensions, FlatList } from "react-native";

interface Props {
  items?: any[];
  ItemComponent: React.FC<any>;
  identifier: string;
  isLoading?: boolean;
  itemWidth?: number;
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
  itemWidth,
}) => {
  const screenWidth = Dimensions.get("window").width;
  const cardWidth = screenWidth * (itemWidth || 0.85);

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
      <FlatList
        data={items}
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 16,
        }}
        ItemSeparatorComponent={() => <Box w={"$4"} />}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        renderItem={({ item }) => (
          <Box maxWidth={cardWidth}>
            <ItemComponent {...{ [identifier]: item }} {...additionalProps} />
          </Box>
        )}
        keyExtractor={(item, i) => item?.id + "" || i.toString()}
      />
    );
  };

  return (
    <Box pt={"$4"} w="$full" {...wrapperProps}>
      {isLoading ? renderLoading() : renderItems()}
    </Box>
  );
};

export default HorizontalListLayout;
