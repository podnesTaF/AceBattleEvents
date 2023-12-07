import { Box, Heading, Text, VStack } from "@gluestack-ui/themed";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Pressable } from "react-native";
import FakeSearchBar from "../FakeSearchBar";

interface FormDatePickerProps {
  name: string;
  label: string;
  placeholder: string;
  mode: "date" | "time" | "datetime" | "countdown";
}

const FormDatePicker = ({
  name,
  label,
  placeholder,
  mode,
}: FormDatePickerProps): JSX.Element => {
  const {
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setValue(name, currentDate.toISOString().split("T")[0]);
    setDate(currentDate);
  };

  return (
    <Box>
      <VStack space="sm" w={"$full"}>
        <Heading size={"sm"}>{label}</Heading>
        <Pressable onPress={() => setShow(true)}>
          <FakeSearchBar
            showIcon={false}
            placeholder={getValues(name) || placeholder}
          />
        </Pressable>
        <Box>
          {errors[name] && (
            <Text color={"$red500"}>{errors[name]!.message}</Text>
          )}
        </Box>
      </VStack>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          onChange={onChange}
        />
      )}
    </Box>
  );
};

export default FormDatePicker;
