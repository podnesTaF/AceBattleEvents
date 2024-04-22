import * as yup from "yup";

const currentYear = new Date().getFullYear();

export const participateSchema = yup.object().shape({
  eventRaceTypes: yup
    .array()
    .of(yup.string().required("Each race type must be a string"))
    .required("Please select at least 1 race type")
    .min(1, "Please select at least 1 race type"),
  firstName: yup.string().required("Please provide your first name"),
  lastName: yup.string().required("Please provide your last name"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Please provide your email"),
  countryId: yup
    .number()
    .required("Please provide your country")
    .test("is-not-zero", "Please provide your country", (value) => value !== 0),
  city: yup.string().required("Please provide your city"),
  genderId: yup.number().required("Please provide your gender"),
  day: yup
    .number()
    .typeError("Invalid day")
    .required("Please provide your day of birth")
    .min(1, "Invalid day")
    .max(31, "Invalid day"),
  month: yup
    .number()
    .typeError("Invalid day")
    .required("Please provide your month of birth")
    .min(1, "Invalid month")
    .max(12, "Invalid month"),
  year: yup
    .number()
    .typeError("Invalid day")
    .required("Please provide your year of birth")
    .min(1900, "Invalid year")
    .max(currentYear, "Invalid year"),
  phoneCode: yup.string().required("Please provide your phone code"),
  phoneNumber: yup.string().required("Please provide your phone number"),
});

export type ParticipateSchema = yup.InferType<typeof participateSchema>;
