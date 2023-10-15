import * as yup from "yup";

export const FeedbackSchema = yup.object().shape({
  message: yup
    .string()
    .min(80, "Feedback should be at least 80 characters long"),
  aboutCommentator: yup.string().max(120, "Max 120 characters"),
});
