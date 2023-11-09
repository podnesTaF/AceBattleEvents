import ItemCheckbox from "@Components/common/forms/ItemCheckbox";
import { CheckboxGroup, VStack } from "@gluestack-ui/themed";
import { selectManageTeam, setPlayers } from "@lib/teams/slices";
import { PickItem } from "@lib/types";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";

interface Props {}

const PickAthletesList = () => {
  const { availablePlayers } = useSelector(selectManageTeam);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const dispatch = useDispatch();

  const onChangeItems = (items: string[]) => {
    setSelectedItems(items);
    dispatch(setPlayers(items.map((item) => +item)));
  };

  return (
    <ScrollView>
      <CheckboxGroup value={selectedItems} onChange={onChangeItems}>
        <VStack space={"md"}>
          {availablePlayers.map((item: PickItem, i) => (
            <ItemCheckbox
              key={item.id}
              item={item}
              isLastElement={availablePlayers.length - 1 === i}
            />
          ))}
        </VStack>
      </CheckboxGroup>
    </ScrollView>
  );
};

export default PickAthletesList;
