import ControlledCheckboxGroup from "@Components/common/forms/ControlledCheckboxGroup";
import { VStack } from "@gluestack-ui/themed";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { selectItems, selectValues, setFormValue } from "@lib/store";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";

const PickReceiversList = ({
  save,
  setSave,
}: {
  save: boolean;
  setSave: Function;
}): JSX.Element => {
  const { availableReceivers } = useAppSelector(selectItems);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { newValues } = useAppSelector(selectValues);
  const dispatch = useAppDispatch();
  const navigator = useNavigation();

  useEffect(() => {
    if (newValues.receivers) {
      setSelectedItems(
        newValues.receivers.map((receiver: number) => receiver.toString())
      );
    }
  }, []);

  useEffect(() => {
    if (save) {
      dispatch(
        setFormValue({
          key: "receivers",
          value: selectedItems.map((item) => +item),
        })
      );
      setSave(false);
      navigator.goBack();
    }
  }, [save, setSave]);

  const onChangeItems = (items: string[]) => {
    setSelectedItems(items);
  };

  return (
    <VStack p={"$4"}>
      <ControlledCheckboxGroup
        items={availableReceivers}
        customOnChange={onChangeItems}
        name={"receivers"}
        value={selectedItems}
      />
    </VStack>
  );
};

export default PickReceiversList;
