import { Box, Checkbox, FormControlLabel, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";

interface PickListProps {
  title: string;
  items: {
    title: string;
    id: number;
    additionalInfo?: string;
  }[];
  tabs: string[];
  onSelectedListChange: (items: any[]) => void;
  defaultSelectedItems?: any[];
  setActiveTab?: Function;
}

const PickList: React.FC<PickListProps> = ({
  title,
  onSelectedListChange,
  items,
  tabs,
  defaultSelectedItems,
  setActiveTab,
}) => {
  const [tabValue, setTabValue] = useState(0);
  const [checkedItems, setCheckedItems] = useState<any[]>(
    defaultSelectedItems || []
  );

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setActiveTab && setActiveTab(tabs[newValue].toLowerCase());
  };

  const handleItemCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    const itemId = parseInt(event.target.value);
    if (event.target.checked) {
      const addedItem = items.find((item) => item.id === itemId);
      setCheckedItems((prevState) => [...prevState, addedItem]);
    } else {
      setCheckedItems((prevState) =>
        prevState.filter((item) => item.id !== itemId)
      );
    }
  };

  useEffect(() => {
    onSelectedListChange(checkedItems);
  }, [checkedItems]);

  return (
    <div className="shadow-md flex flex-col md:flex-row">
      <div className="w-full md:w-1/2">
        <h3 className="font-semibold text-center text-xl py-1">{title}</h3>
        <Tabs className="w-full" value={tabValue} onChange={handleTabChange}>
          {tabs.map((tab, i) => (
            <Tab
              className={`w-1/2`}
              label={tab}
              key={i}
              sx={{
                bgcolor: tabValue === i ? "red" : "bg-gray-200",
                "&.Mui-selected": {
                  color: "white",
                },
              }}
              {...a11yProps(i)}
            />
          ))}
        </Tabs>
        {tabs.map((tab, i) => (
          <CustomTabPanel key={tab} index={i} value={tabValue}>
            {items.map((item) => (
              <PickItem
                key={item.id}
                name={item.title}
                additionalInfo={item.additionalInfo}
                onCheck={handleItemCheck}
                isChecked={checkedItems?.some((itm) => itm.id === item.id)}
                id={item.id}
              />
            ))}
          </CustomTabPanel>
        ))}
      </div>
      <div className="md:w-1/2 w-full">
        <h3 className="font-semibold text-center text-xl py-1 border-b-[1px] border-gray-300">
          Selected Runners
        </h3>
        <div className="w-full h-[350px] overflow-auto border-r-[1px] border-gray-300">
          {checkedItems.map((item) => (
            <div
              key={item.id}
              className="border-b-[1px] border-gray-300 p-2 flex justify-between"
            >
              <h3 className="text-xl text-semibold">{item.title}</h3>
              <h3 className="text-2xl font-semibold">{item.additionalInfo}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface PickItemProps {
  name: string;
  additionalInfo?: string;
  id: number;
  onCheck?: (e: any) => void;
  disabled?: boolean;
  isChecked?: boolean;
}

const PickItem: React.FC<PickItemProps> = ({
  name,
  additionalInfo,
  id,
  onCheck,
  isChecked,
}) => {
  return (
    <div className="border-b-[1px] border-gray-300 p-2 flex justify-between">
      <FormControlLabel
        onChange={onCheck}
        control={<Checkbox checked={isChecked} color="success" value={id} />}
        label={<h3 className="text-xl text-semibold">{name}</h3>}
      />
      <h2 className="text-2xl font-semibold">{additionalInfo}</h2>
    </div>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      className="w-full h-[350px] overflow-auto border-r-[1px] border-gray-300"
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default PickList;
