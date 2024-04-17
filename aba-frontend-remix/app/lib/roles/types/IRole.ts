import { IMedia } from "~/lib/types";

export type IRole = {
  id: number;
  name: string;
  image?: IMedia;
  description?: string;
  stripe_product_id?: string;
};
