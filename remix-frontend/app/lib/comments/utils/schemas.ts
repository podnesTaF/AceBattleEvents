import * as yup from "yup";

export const FeedbackSchema = yup.object().shape({
  message: yup
    .string()
    .min(80, { message: "Feedback should be at least 80 characters long" }),
  aboutCommentator: yup.string().max(120, { message: "Max 120 characters" }),
});
