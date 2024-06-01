import * as yup from "yup";

export const createNotificationSchema = yup.object().shape({
  receivers: yup.array().of(yup.number()).required(),
  title: yup.string().required(),
  text: yup.string().required(),
});

export type CreateNotification = yup.InferType<typeof createNotificationSchema>;
