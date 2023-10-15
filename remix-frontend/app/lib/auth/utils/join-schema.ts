import * as yup from "yup";

export const joinSchema = yup.object().shape({
  role: yup.string().required("Please select a role"),
  category: yup.string().when("role", (role: any, schema: any) => {
    if (role === "runner")
      return schema.required("Please, provide your skill category");
    return schema;
  }),
  distanceRunner: yup.string().when("role", (role: any, schema: any) => {
    if (role === "runner")
      return schema.required("Please, Choose one of the options");
  }),
  personalBests: yup
    .array()
    .of(
      yup.object().shape({
        distanceInCm: yup.string().required("Please provide distance"),
        result: yup.string().required("Please provide the result"),
      })
    )
    .when("role", (role: any, schema: any) => {
      if (role === "runner")
        return schema.required("Please, provide your personal bests");
    })
    .when("distanceRunner", (distanceRunner: any, schema: any) => {
      if (distanceRunner === true)
        return schema.required(
          "Please, provide your personal bests or choose no"
        );
    }),
  seasonBests: yup.array().of(
    yup.object().shape({
      distanceInCm: yup.number().required("Please provide distance"),
      result: yup.string().required("Please provide the result"),
    })
  ),
  name: yup.string().required("Please provide your first name"),
  surname: yup.string().required("Please provide your last name"),
  country: yup.string().required("Please provide your country"),
  city: yup.string().required("Please provide your city"),
  gender: yup.string().required("Please provide your gender"),
  dateOfBirth: yup.string().when("role", (role: any, schema: any) => {
    if (role === "runner")
      return schema.required("Please provide your date of birth");
  }),
  ageRange: yup.string(),
  interest: yup.string(),
  email: yup
    .string()
    .email("Please provide a valid email")
    .required("Please provide your email"),
  acceptTerms: yup
    .boolean()
    .oneOf([true], "Please accept terms and conditions"),
  acceptNews: yup.boolean(),
});

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
      return !!values.email;
    default:
      return false;
  }
};
