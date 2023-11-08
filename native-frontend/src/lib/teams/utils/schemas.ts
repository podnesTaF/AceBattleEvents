import * as yup from "yup";

export const AddTeamSchema = yup.object().shape({
  name: yup.string().required("Please provide team name"),
  city: yup.string().required("Please provide team city"),
  gender: yup.string().required("Please provide team gender"),
  coach: yup.object().required("Please provide coach"),
  teamImage: yup.object(),
  logo: yup.object(),
  players: yup
    .array()
    .of(yup.object().required("Please provide player"))
    .min(7, "Please provide at least 7 player"),
});
