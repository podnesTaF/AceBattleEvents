import { HStack, Heading, VStack } from "@gluestack-ui/themed";
import React from "react";
import ExpandableRow from "./ExpandableRow";

interface Props {
  rows: {
    [key: string]:
      | string
      | {
          type: string;
          color: string;
          text: string;
          link: any;
        }
      | JSX.Element;
  }[];
}

const ExpandableTable = ({ rows }: Props): JSX.Element => {
  return (
    <VStack>
      <HStack space="md" bg={"#ff0000"} px={"$4"} py={"$2"}>
        {Object.keys(rows[0]).map((key, i, arr) => (
          <Heading
            key={i}
            width={key !== "expand" ? `${100 / arr.length}%` : "$6"}
            textAlign={"left"}
            size={"sm"}
            color={"$white"}
            textTransform="uppercase"
          >
            {key === "expand" ? "" : key}
          </Heading>
        ))}
      </HStack>
      {rows.map((row, i) => (
        <ExpandableRow key={i} row={row} i={i} />
      ))}
    </VStack>
  );
};

export default ExpandableTable;
