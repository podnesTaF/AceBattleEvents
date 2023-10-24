import * as yup from "yup";

export const creatNewsSchema = yup.object().shape({
  title: yup.string().required(),
  mainImage: yup.object(),
  hashtags: yup.array().of(yup.object()),
  contents: yup.array().of(yup.object()),
});
