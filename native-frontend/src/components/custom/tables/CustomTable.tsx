import { HStack, Heading, VStack } from "@gluestack-ui/themed";
import { useScreenSize } from "@lib/hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import TableRowItem from "./TableRowItem";

interface Props {
  rows: {
    [key: string]:
      | string
      | {
          type: string;
          color: string;
          text: string;
          link: any;
        };
  }[];
}

const CustomTable: React.FC<Props> = ({ rows }) => {
  const { t } = useTranslation();
  const { isSmallScreen } = useScreenSize();
  return (
    <VStack>
      {rows.length ? (
        <>
          <HStack space="md" bg={"$black"} px={"$4"} py={"$2"}>
            {rows[0] &&
              Object.keys(rows[0]).map((key, i, arr) => (
                <Heading
                  color={"$white"}
                  key={i}
                  textTransform="capitalize"
                  textAlign={i === arr.length - 1 ? "right" : "left"}
                  flex={i === arr.length - 1 ? 2 : 1}
                  size={isSmallScreen ? "sm" : "md"}
                >
                  {key}
                </Heading>
              ))}
          </HStack>
          {rows.map((row, i) => (
            <HStack
              key={i}
              alignItems="center"
              space="md"
              bg={"$white"}
              px={"$4"}
              py={"$2"}
            >
              {row &&
                Object.values(row).map((value, j, arr) => (
                  <TableRowItem
                    key={j}
                    size={isSmallScreen ? "sm" : "md"}
                    item={value}
                    isLast={arr.length - 1 === j}
                  />
                ))}
            </HStack>
          ))}
        </>
      ) : (
        <Heading size={"md"} textAlign={"center"} color={"$black"}>
          {t("team.noResultsFound")}
        </Heading>
      )}
    </VStack>
  );
};

export default CustomTable;
