import ControlledRadioGroup from "@Components/common/forms/ControlledRadioGroup";
import { VStack } from "@gluestack-ui/themed";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { selectItems, selectValues, setFormValue } from "@lib/store";
import { useNavigation } from "expo-router";
import React, { useEffect } from "react";

const PickManagersList = ({
  save,
  setSave,
}: {
  save: boolean;
  setSave: Function;
}) => {
  const { newValues } = useAppSelector(selectValues);
  const { availableManagers } = useAppSelector(selectItems);
  const dispatch = useAppDispatch();
  const [item, setItem] = React.useState<string | undefined>(undefined);
  const navigation = useNavigation();

  useEffect(() => {
    setItem(newValues.manager?.toString());
  }, []);

  useEffect(() => {
    if (save) {
      dispatch(setFormValue({ key: "manager", value: +item! }));
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
        items={availableManagers}
        name={"manager"}
        value={item}
        customOnChange={onChangeItem}
      />
    </VStack>
  );
};

export default PickManagersList;
