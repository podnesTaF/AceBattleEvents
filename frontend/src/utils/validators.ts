import * as yup from "yup";

export const LoginFormSchema = yup.object().shape({
  email: yup
    .string()
    .email("Wrong email")
    .required("Please, provide the email"),
  password: yup
    .string()
    .min(6, "Password at least 6 characters")
    .required("password is required"),
});

export const RegisterSchema = yup.object().shape({
  email: yup
    .string()
    .email("Wrong email")
    .required("Please, provide the email"),
  password: yup
    .string()
    .min(6, "Password at least 6 characters")
    .required("password is required"),
  name: yup.string().required("Please provide your first name"),
  surname: yup.string().required("Please provide your surname"),
  city: yup.string().required("Please provide your city"),
  country: yup.string().required("Please provide your country"),
});
