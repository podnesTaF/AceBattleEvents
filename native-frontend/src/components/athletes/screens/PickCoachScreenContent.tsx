import ControlledRadioGroup from "@Components/common/forms/ControlledRadioGroup";
import { VStack } from "@gluestack-ui/themed";
import { selectManageTeam, setCoach } from "@lib/teams/slices";
import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const PickCoachScreenContent = ({
  save,
  setSave,
}: {
  save: boolean;
  setSave: Function;
}) => {
  const { newValues, avaliableCoaches } = useSelector(selectManageTeam);
  const dispatch = useDispatch();
  const [item, setItem] = React.useState<string | undefined>(undefined);
  const navigation = useNavigation();

  useEffect(() => {
    setItem(newValues.coach?.toString());
  }, []);

  useEffect(() => {
    if (save) {
      dispatch(setCoach(+item!));
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
        items={avaliableCoaches as any[]}
        name={"coach"}
        value={item}
        customOnChange={onChangeItem}
      />
    </VStack>
  );
};

export default PickCoachScreenContent;
