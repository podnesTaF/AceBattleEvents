import ControlledCheckboxGroup from "@Components/common/forms/ControlledCheckboxGroup";
import { VStack } from "@gluestack-ui/themed";
import { selectManageTeam, setPlayers } from "@lib/teams/slices";
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
  const { availablePlayers } = useSelector(selectManageTeam);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { newValues } = useSelector(selectManageTeam);
  const dispatch = useDispatch();
  const navigator = useNavigation();

  useEffect(() => {
    setSelectedItems(newValues.players.map((player) => player.toString()));
  }, []);

  useEffect(() => {
    if (save) {
      dispatch(setPlayers(selectedItems.map((item) => +item)));
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
