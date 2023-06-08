import * as yup from "yup";

export const LoginFormSchema = yup.object().shape({
  email: yup
    .string()
    .email("Wrong email")
    .required("Please, provide the email"),
  password: yup
    .string()
    .min(6, "Password at least 6 characters")
    .required("password is required"),
});

export const RegisterSchema = yup.object().shape({
  email: yup
    .string()
    .email("Wrong email")
    .required("Please, provide the email"),
  password: yup
    .string()
    .min(6, "Password at least 6 characters")
    .required("password is required"),
  name: yup.string().required("Please provide your first name"),
  surname: yup.string().required("Please provide your surname"),
  city: yup.string().required("Please provide your city"),
  country: yup.string().required("Please provide your country"),
});

export const AddTeamSchema = yup.object().shape({
  name: yup.string().required("Please provide team name"),
  city: yup.string().required("Please provide team city"),
  country: yup.string().required("Please provide team country"),
  club: yup.string(),
  coachName: yup.string().required("Please provide coach name"),
  coachSurname: yup.string().required("Please provide coach surname"),
  coachGender: yup.string().required("Please provide coach gender"),
  players: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required("Please provide player name"),
        surname: yup.string().required("Please provide player surname"),
        dateOfBirth: yup
          .string()
          .required("Please provide player date of birth"),
        gender: yup.string().required("Please provide player gender"),
      })
    )
    .test(
      "atLeastFivePlayers",
      "Please provide at least 5 players",
      (value) => {
        return value && value.length >= 5;
      }
    ),
});
