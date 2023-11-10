import * as yup from "yup";

export const AddTeamSchema = yup.object().shape({
  name: yup.string().required("Please provide team name"),
  city: yup.string().required("Please provide team city"),
  gender: yup.string().required("Please provide team gender"),
  coach: yup.number(),
  teamImage: yup.string(),
  logo: yup.string(),
  players: yup
    .array()
    .of(yup.number().required("Please provide player"))
    .min(3, "Please provide at least 3 player"),
});
