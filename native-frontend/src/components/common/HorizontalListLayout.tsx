import { Box } from "@gluestack-ui/themed";
import React from "react";
import { Dimensions, FlatList } from "react-native";
import ErrorBox from "./states/ErrorBox";
import Skeleton from "./states/Skeleton";

interface Props {
  items?: any[];
  ItemComponent: React.FC<any>;
  identifier: string;
  isLoading?: boolean;
  error?: any;
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
  error,
  itemWidth,
}) => {
  const screenWidth = Dimensions.get("window").width;
  const cardWidth = screenWidth * (itemWidth || 0.85);

  const renderError = () => {
    if (!error) return null;
    return (
      <Box
        width={"$full"}
        height={200}
        alignItems="center"
        justifyContent="center"
      >
        <ErrorBox error={error} width={cardWidth} />
      </Box>
    );
  };

  const renderLoading = () => <Skeleton height={200} />;

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
      {isLoading ? renderLoading() : error ? renderError() : renderItems()}
    </Box>
  );
};

export default HorizontalListLayout;
