export type PickItem = {
  id: number;
  title: string;
  additionalInfo?: string;
  imageUrl?: string;
  addtionalFields?: {
    [key: string]: any;
  };
};
