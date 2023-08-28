import * as yup from "yup";

export const updateProfileSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  city: yup.string().required("City is required"),
  surname: yup.string().required("Surname is required"),
  country: yup.string().required("Country is required"),
  image: yup.object(),
});

export const changePasswordSchema = yup.object().shape({
  oldPassword: yup.string().required("Old password is required"),
  newPassword: yup.string().required("New password is required"),
  confirmPassword: yup.string().required("Confirm password is required"),
});
