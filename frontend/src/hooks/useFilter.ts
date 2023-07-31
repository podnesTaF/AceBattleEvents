import { useState } from "react";

export const useFilter = () => {
  const [filters, setFilters] = useState<{ type: string; value: any }[]>([]);
  const [checkValue, setCheckValue] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState("");

  const onChangeFilter = (filterType: string, selectedValue: string) => {
    if (selectedValue === "") {
      removeFilter(filterType);
      return;
    }
    setFilters((prev) => {
      const typeObj = prev.find((f) => f.type === filterType);
      if (!typeObj) {
        return [...prev, { type: filterType, value: selectedValue }];
      } else {
        return [
          ...prev.filter((f) => f.type !== filterType),
          { type: filterType, value: selectedValue },
        ];
      }
    });
  };

  const removeFilter = (filter: string) => {
    if (filter === "check") {
      setCheckValue(false);
    } else if (filter === "name") {
      setSearchValue("");
    }
    setFilters((prev) => prev.filter((f) => f.type !== filter));
  };

  return {
    filters,
    checkValue,
    searchValue,
    onChangeFilter,
    removeFilter,
    setCheckValue,
    setSearchValue,
  };
};
