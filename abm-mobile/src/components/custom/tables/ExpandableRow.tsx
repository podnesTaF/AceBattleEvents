import { Box, HStack, Icon, Pressable } from "@gluestack-ui/themed";
import { ChevronDown, ChevronRight } from "lucide-react-native";
import React, { isValidElement } from "react";
import TableRowItem from "./TableRowItem";

type ExpandableRowProps = {
  row: {
    [key: string]:
      | string
      | {
          type: string;
          color: string;
          text: string;
          link: any;
        }
      | JSX.Element;
  };
  i: number;
};

const ExpandableRow = ({ row, i }: ExpandableRowProps): JSX.Element => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  return (
    <Pressable onPress={() => setIsExpanded(!isExpanded)}>
      {({ pressed }: { pressed: boolean }) => (
        <>
          <HStack
            opacity={pressed ? 0.8 : 1}
            space="md"
            alignItems="center"
            bg={i % 2 ? "$white" : "$coolGray200"}
            px={"$4"}
            py={"$2"}
          >
            {Object.values(row).map((value, j, arr) =>
              isValidElement(value) ? (
                <Box key={j}>
                  {isExpanded ? (
                    <Icon as={ChevronDown} size="lg" />
                  ) : (
                    <Icon as={ChevronRight} size="lg" />
                  )}
                </Box>
              ) : (
                <TableRowItem
                  size={"sm"}
                  key={j}
                  item={value as any}
                  isLast={arr.length - 1 === j}
                  width={`${100 / arr.length}%`}
                />
              )
            )}
          </HStack>
          {isExpanded && row.expand}
        </>
      )}
    </Pressable>
  );
};

export default ExpandableRow;
