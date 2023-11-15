import ControlledRadioGroup from "@Components/common/forms/ControlledRadioGroup";
import { VStack } from "@gluestack-ui/themed";
import { useAppSelector } from "@lib/hooks";
import { selectItems, selectValues, setFormValue } from "@lib/store";
import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const PickCoachScreenContent = ({
  save,
  setSave,
}: {
  save: boolean;
  setSave: Function;
}) => {
  const { newValues } = useAppSelector(selectValues);
  const { avaliableCoaches } = useAppSelector(selectItems);
  const dispatch = useDispatch();
  const [item, setItem] = React.useState<string | undefined>(undefined);
  const navigation = useNavigation();

  useEffect(() => {
    setItem(newValues.coach?.toString());
  }, []);

  useEffect(() => {
    if (save) {
      dispatch(setFormValue({ key: "coach", value: +item! }));
      setSave(false);
      navigation.goBack();
    }
  }, [save, setSave]);

  const onChangeItem = (newCoach: string) => {
    setItem(newCoach);
  };

  return (
    <VStack p={"$4"}>
      <ControlledRadioGroup
        items={avaliableCoaches}
        name={"coach"}
        value={item}
        customOnChange={onChangeItem}
      />
    </VStack>
  );
};

export default PickCoachScreenContent;
