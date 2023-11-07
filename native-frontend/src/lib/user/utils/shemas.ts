import * as yup from "yup";

export const updateUserDataSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  surname: yup.string().required("Surname is required"),
  city: yup.string().required("City is required"),
  country: yup.string().required("Country is required"),
});

export const updateImageSchema = yup.object().shape({
  image: yup.object().required("Image is required")
})

export const updateRunnerSchema = yup.object().shape({
  dateOfBirth: yup.string().required("Date of birth is required"),
  gender: yup.string().required("Pick your gender"),
  category: yup.string().required("Pick your category"),
})

export const changePasswordSchema = yup.object().shape({
  oldPassword: yup.string().required("Old password is required"),
  newPassword: yup.string().required("New password is required"),
  confirmPassword: yup.string().required("Confirm password is required"),
});

export const createNewPasswordSchema = yup.object().shape({
  newPassword: yup.string().required("New password is required"),
  repeatPassword: yup.string().required("Confirm password is required"),
});
