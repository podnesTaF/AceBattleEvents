import * as yup from "yup";

export const createRaceSchema = yup.object().shape({
  startTime: yup.string().required("Required"),
  eventId: yup.number().required("Required"),
  team1Id: yup.number().required("Required"),
  team2Id: yup.number().required("Required"),
});
