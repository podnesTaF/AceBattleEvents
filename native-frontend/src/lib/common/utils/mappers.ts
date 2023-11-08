import { IRunner } from "@lib/models";
import { getCategoryByDoB } from "./date-utils";

export const mapRunnersToPickItems = (
  runners?: IRunner[]
): {
  id: number;
  title: string;
  additionalInfo: string;
  imageUrl?: string;
}[] => {
  return (
    runners?.map((item: IRunner) => ({
      id: item.id,
      title: item.user.name + " " + item.user.surname,
      additionalInfo: getCategoryByDoB(item.dateOfBirth),
      imageUrl: item.user.image?.mediaUrl,
    })) || []
  );
};
