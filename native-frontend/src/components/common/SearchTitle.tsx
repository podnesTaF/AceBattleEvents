import { Center, Pressable } from "@gluestack-ui/themed";
import { scaleSize } from "@lib/utils";
import { useRouter } from "expo-router";
import React from "react";
import FakeSearchBar from "./FakeSearchBar";

interface SearchTitleProps {
  link: any;
  placeholder: string;
}

const SearchTitle: React.FC<SearchTitleProps> = ({ link, placeholder }) => {
  const router = useRouter();
  return (
    <Pressable width={scaleSize(350)} onPress={() => router.push(link)}>
      {({ pressed }: { pressed: boolean }) => (
        <Center opacity={pressed ? "$90" : "$100"}>
          <FakeSearchBar bg={"transparent"} placeholder={placeholder} />
        </Center>
      )}
    </Pressable>
  );
};

export default SearchTitle;
