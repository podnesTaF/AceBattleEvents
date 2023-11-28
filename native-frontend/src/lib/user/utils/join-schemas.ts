import { IMedia } from "@lib/models";
import * as yup from "yup";

export const createUserSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  surname: yup.string().required("Surname is required"),
  city: yup.string().required("City is required"),
  ageRange: yup.string().required("Age range is required"),
  avatar: yup.string(),
  image: yup.string(),
  email: yup.string().email().required("Email is required"),
  phone: yup
    .string()
    .matches(/^(\+)?([ 0-9]){10,14}$/, "Phone number must be 10-14 digits long")
    .required("Phone is required"),
  countryCode: yup.string().required("Country code is required"),
  acceptTerms: yup
    .boolean()
    .oneOf([true], "Please accept terms and conditions"),
  acceptNews: yup.boolean(),
});

export type CreateUserSchema = yup.InferType<typeof createUserSchema>;

export type SubmitUserType = {
  name: string;
  surname: string;
  country: string;
  city: string;
  ageRange: string;
  avatar: IMedia | null;
  image: IMedia | null;
  email: string;
  phone: string;
  countryCode: string;
  acceptTerms?: boolean;
  acceptNews?: boolean;
};
