import ControlledRadioGroup from "@Components/common/forms/ControlledRadioGroup";
import { coaches } from "@Constants/dummy-data";
import { VStack } from "@gluestack-ui/themed";
import { selectManageTeam, setCoach } from "@lib/teams/slices";
import { mapCoachesToPickItems } from "@lib/utils";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const PickCoachScreenContent = () => {
  const { newValues } = useSelector(selectManageTeam);
  const dispatch = useDispatch();

  const customOnChange = (value: string, name: string) => {
    dispatch(setCoach(+value));
  };

  return (
    <VStack p={"$4"}>
      <ControlledRadioGroup
        items={mapCoachesToPickItems(coaches)}
        name={"coach"}
        value={newValues.coach?.toString()}
        customOnChange={customOnChange}
      />
    </VStack>
  );
};

export default PickCoachScreenContent;
