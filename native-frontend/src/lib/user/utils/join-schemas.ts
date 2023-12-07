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

export const createRunnerSchema = yup.object().shape({
  category: yup.string().required("Category is required"),
  gender: yup.string().required("Gender is required"),
  dateOfBirth: yup.string().required("Date of birth is required"),
  personalBests: yup.array().of(
    yup.object().shape({
      distanceInCm: yup.string().required("Distance is required"),
      result: yup.string().required("Write your result"),
    })
  ),
  seasonBests: yup.array().of(
    yup.object().shape({
      distanceInCm: yup.string().required("Distance is required"),
      result: yup.string().required("Write your result"),
    })
  ),
  managerOption: yup.string().required("Manager option is required"),
  manager: yup
    .number()
    .when("managerOption", (managerOption: any, schema: any) => {
      if (managerOption === "choose-manager")
        return schema.required("Please, choose manager");
      return schema;
    }),
  runnerAgreement: yup
    .boolean()
    .oneOf([true], "Please accept terms and conditions"),
  informationIsCorrect: yup.boolean().oneOf([true], "Please accept the field"),
});

export type CreateRunnerSchema = yup.InferType<typeof createRunnerSchema>;
