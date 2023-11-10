import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please provide a valid email")
    .required("Please provide your email"),
  password: yup.string().required("Please provide your password"),
});
