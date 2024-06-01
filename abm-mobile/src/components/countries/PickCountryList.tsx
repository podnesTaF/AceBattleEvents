import CustomRadioGroup from "@Components/custom/CustomRadioGroup";
import { availableCountries } from "@Constants/country-codes";
import { VStack } from "@gluestack-ui/themed";
import { useAppSelector } from "@lib/hooks";
import { selectValues, setFormValue } from "@lib/store";
import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const PickCountryList = ({
  save,
  setSave,
}: {
  save: boolean;
  setSave: Function;
}) => {
  const { newValues } = useAppSelector(selectValues);
  const dispatch = useDispatch();
  const [item, setItem] = React.useState<string | undefined>(undefined);
  const navigation = useNavigation();

  useEffect(() => {
    setItem(newValues.country?.toString());
  }, []);

  useEffect(() => {
    if (save) {
      dispatch(setFormValue({ key: "country", value: +item! }));
      setSave(false);
      navigation.goBack();
    }
  }, [save, setSave]);

  const onChangeItem = (country: string) => {
    setItem(country);
  };

  return (
    <VStack p={"$4"}>
      <CustomRadioGroup
        items={availableCountries}
        name={"country"}
        value={item}
        customOnChange={onChangeItem}
      />
    </VStack>
  );
};

export default PickCountryList;
