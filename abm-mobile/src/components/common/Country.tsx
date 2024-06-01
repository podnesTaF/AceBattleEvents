import { HStack, Heading, Image } from "@gluestack-ui/themed";
import { convertFlagIntoPng } from "@lib/common/utils";
import { ICountry } from "@lib/models";
import React from "react";

const Country = ({
  country,
  textColor,
}: {
  country: ICountry;
  textColor?: any;
}): JSX.Element => {
  return (
    <HStack space="sm">
      {country.flagIconUrl && (
        <Image
          role="img"
          alt={"country flag"}
          source={{ uri: convertFlagIntoPng(country.flagIconUrl) }}
          size="2xs"
        />
      )}
      <Heading size="sm" color={textColor}>
        {country.name}
      </Heading>
    </HStack>
  );
};

export default Country;
