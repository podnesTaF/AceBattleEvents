import * as yup from "yup";

export const createRaceSchema = yup.object().shape({
  startTime: yup.string().required("Required"),
  eventId: yup.number().required("Required"),
  team1Id: yup.number().required("Required"),
  team2Id: yup.number().required("Required"),
});

export const registerForRaceSchema = yup.object().shape({
  players: yup
    .array()
    .of(yup.string().required("Please provide player"))
    .min(3, "Please provide at least 3 player")
    .required("Please provide at least 3 player"),
});
