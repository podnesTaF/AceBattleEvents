import * as yup from "yup";
import { Api } from "~/api/axiosInstance";

const passwordSchema = yup
  .string()
  .required()
  .min(8, "Password must be at least 8 characters long")
  .matches(/[A-Z]/, "Password must include at least one uppercase letter")
  .matches(/[a-z]/, "Password must include at least one lowercase letter")
  .matches(/[0-9]/, "Password must include at least one number")
  .matches(
    /[^A-Za-z0-9]/,
    "Password must include at least one special character"
  );

export const joinSchema = yup.object().shape({
  roles: yup
    .array()
    .min(1, "Please select at least one role")
    .of(yup.number().required("Please select a role")),
  category: yup.string().when("roles", (roles, schema) => {
    return roles.includes(3)
      ? schema.required("Please, provide your skill category")
      : schema;
  }),
  password: passwordSchema,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords must match")
    .required("Please confirm your password"),
  personalBests: yup.array().of(
    yup.object().shape({
      distanceId: yup.number().required("Please provide distance"),
      result: yup.string().required("Please provide the result"),
      type: yup.string().required("Please provide the type of the result"),
    })
  ),
  seasonBests: yup.array().of(
    yup.object().shape({
      distanceId: yup.number().required("Please provide distance"),
      result: yup.string().required("Please provide the result"),
      type: yup.string().required("Please provide the type of the result"),
    })
  ),
  emailConfirmed: yup
    .boolean()
    .required("Email confirmation is required")
    .oneOf([true], "You must confirm your email"),
  firstName: yup.string().required("Please provide your first name"),
  lastName: yup.string().required("Please provide your last name"),
  countryId: yup
    .number()
    .required("Please provide your country")
    .test("is-not-zero", "Please provide your country", (value) => value !== 0),
  city: yup.string().required("Please provide your city"),
  genderId: yup.number().required("Please provide your gender"),
  dateOfBirth: yup.string().when("roles", (roles, schema) => {
    return roles.includes(3)
      ? schema.required("Please provide your date of birth")
      : schema;
  }),
  email: yup
    .string()
    .email("Invalid email")
    .test("checkDupEmail", "Email already exists", async (email) => {
      if (!email) return true;
      const data = await Api().users.checkIfEmailExists(email);
      return !data; // Assuming the API returns a structure with an 'exists' field
    })
    .required("Please provide your email"),
  acceptTerms: yup
    .boolean()
    .oneOf([true], "Please accept terms and conditions"),
  acceptNews: yup.boolean(),
});

export type JoinFormValues = yup.InferType<typeof joinSchema>;

export const setPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Please provide a password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords must match")
    .required("Please confirm your password"),
});

export const isValidToGoNext = (step: number, values: any): boolean => {
  switch (step) {
    case 1:
      return !!values.role;
    case 2:
      return !!values.category;
    case 3:
      return !!values.distanceRunner;
    case 4:
      return values.personalBests.length
        ? values.personalBests.filter(
            (item: any) => item.distanceInCm && item.result
          ).length
        : true;
    case 5:
      return values.seasonBests.length
        ? values.personalBests.filter(
            (item: any) => item.distance && item.result
          ).length
        : true;
    case 6:
      if (
        !values.name ||
        !values.surname ||
        !values.city ||
        !values.country ||
        !values.gender
      ) {
        return false;
      }

      if (values.role !== "runner" && !values.ageRange) return false;

      return true;
    case 7:
      return true;
    case 8:
      return true;
    case 9:
      return !!values.email;
    default:
      return false;
  }
};
