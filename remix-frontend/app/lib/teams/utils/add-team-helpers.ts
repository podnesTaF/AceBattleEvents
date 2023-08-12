import * as yup from "yup";

export const AddTeamSchema = yup.object().shape({
  name: yup.string().required("Please provide team name"),
  city: yup.string().required("Please provide team city"),
  type: yup.string().required("Please provide team type"),
  coachName: yup.string().required("Please provide coach name"),
  coachSurname: yup.string().required("Please provide coach surname"),
  teamImage: yup.object(),
  logo: yup.object(),
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
        worldAthleticsUrl: yup.string(),
        image: yup.object(),
      })
    )
    .test(
      "atLeastFivePlayers",
      "Please provide at least 5 players",
      (value) => {
        return value && value.length >= 1;
      }
    ),
});
