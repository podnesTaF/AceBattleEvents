import * as yup from "yup";

export const addImageSchema = yup.object().shape({
  image: yup.mixed().required("Required"),
});
