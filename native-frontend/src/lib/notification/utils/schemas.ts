import * as yup from "yup";

export const createNotificationSchema = yup.object().shape({
  title: yup.string().required(),
  text: yup.string().required(),
});
