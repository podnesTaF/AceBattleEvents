import Container from "@Components/common/Container";
import SearchBar from "@Components/common/SearchBar";
import Tabs from "@Components/common/Tabs";
import ControlledCheckboxGroup from "@Components/common/forms/ControlledCheckboxGroup";
import ControlledRadioGroup from "@Components/common/forms/ControlledRadioGroup";
import { Box, Heading, VStack } from "@gluestack-ui/themed";
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
  const [activeTab, setActiveTab] = useState(0);
  const { availableReceivers, availableTeams } = useAppSelector(selectItems);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { newValues, valueName } = useAppSelector(selectValues);

  const [atheleteNameFilter, setAtheleteNameFilter] = useState<string>("");

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
    if (activeTab) {
      setSelectedItems([]);
    }
  }, [activeTab]);

  useEffect(() => {
    if (save) {
      dispatch(
        setFormValue({
          key: "receivers",
          value: selectedItems.map((item) => +item),
          valueName: activeTab === 0 ? "team" : "runners",
        })
      );
      setSave(false);
      navigator.goBack();
    }
  }, [save, setSave]);

  const onChangeItems = (items: string[]) => {
    setSelectedItems(items);
  };

  const onChangeTab = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  return (
    <VStack bg={"$white"}>
      <Box bg={"#1C1E1F"}>
        <Tabs
          activeColor={"#ff0000"}
          activeIndex={activeTab}
          items={["Teams", "Runners"]}
          onChangeTab={onChangeTab}
        />
      </Box>
      <VStack space="md" pt={"$4"}>
        {activeTab === 0 && (
          <>
            <Heading size="md">Your Teams</Heading>
            <Container>
              <ControlledRadioGroup
                items={availableTeams}
                name={"receivers"}
                customOnChange={(value, name) => setSelectedItems([value])}
                value={selectedItems[0]}
              />
            </Container>
          </>
        )}
        {activeTab === 1 && (
          <>
            <SearchBar
              variant="white"
              placeholder="Search for an Athlete..."
              value={atheleteNameFilter}
              onChange={(value) => setAtheleteNameFilter(value)}
            />
            <Container>
              <ControlledCheckboxGroup
                items={availableReceivers}
                customOnChange={onChangeItems}
                name={"receivers"}
                value={selectedItems}
              />
            </Container>
          </>
        )}
      </VStack>
    </VStack>
  );
};

export default PickReceiversList;
