import * as yup from "yup";

export const RegisterSchema = yup.object().shape({
  email: yup
    .string()
    .email("Wrong email")
    .required("Please, provide the email"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  name: yup.string().required("Please provide your first name"),
  surname: yup.string().required("Please provide your surname"),
  city: yup.string().required("Please provide your city"),
  country: yup.string().required("Please provide your country"),
  role: yup.string().required("Please provide your role"),
  gender: yup.string().when("role", (role: any, schema: any) => {
    if (role === "runner") return schema.required("provide gernder");
    return schema;
  }),
  dateOfBirth: yup.string().when("role", (role: any, schema: any) => {
    if (role === "runner") return schema.required("provide date of birth");
    return schema;
  }),
  worldAthleticsUrl: yup.string(),
});
