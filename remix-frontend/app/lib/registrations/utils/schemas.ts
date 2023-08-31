import * as yup from "yup";

export const registerAsViewerSchema = yup.object().shape({
  firstName: yup.string().required("Please provide your first name"),
  lastName: yup.string().required("Please provide your last name"),
  email: yup.string().email().required("Please provide your email"),
  gender: yup.string().required("Provide your gender, please"),
  userId: yup.number(),
  discoveryMethod: yup
    .string()
    .required("Please provide your discovery method"),
  agreeToTerms: yup
    .boolean()
    .required("You have to agree to terms and conditions"),
});
