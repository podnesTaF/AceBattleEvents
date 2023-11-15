import { PickItem } from "@lib/types";
import { cutString } from "./string-helpers";

export const defineItemLabel = ({
  name,
  id,
  items,
}: {
  name: string;
  id?: number;
  items?: PickItem[];
}) => {
  if (!id) return `No ${name} selected`;
  const item = items?.find((item) => item.id === id);
  if (!item) return `No ${name} selected`;
  return cutString(item.title, 20);
};
