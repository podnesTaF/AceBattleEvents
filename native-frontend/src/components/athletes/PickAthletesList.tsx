import ControlledCheckboxGroup from "@Components/common/forms/ControlledCheckboxGroup";
import { VStack } from "@gluestack-ui/themed";
import { useAppSelector } from "@lib/hooks";
import { selectItems, selectValues, setFormValue } from "@lib/store";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const PickAthletesList = ({
  save,
  setSave,
}: {
  save: boolean;
  setSave: Function;
}) => {
  const { availablePlayers } = useAppSelector(selectItems);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { newValues } = useSelector(selectValues);
  const dispatch = useDispatch();
  const navigator = useNavigation();

  useEffect(() => {
    if (newValues.players) {
      setSelectedItems(
        newValues.players.map((player: number) => player.toString())
      );
    }
  }, []);

  useEffect(() => {
    if (save) {
      dispatch(
        setFormValue({
          key: "players",
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
        items={availablePlayers}
        customOnChange={onChangeItems}
        name={"players"}
        value={selectedItems}
      />
    </VStack>
  );
};

export default PickAthletesList;
