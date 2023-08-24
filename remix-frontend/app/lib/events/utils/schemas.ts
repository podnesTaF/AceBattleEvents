import * as yup from "yup";

export const addEventSchema = yup.object().shape({
  title: yup.string().required("Please provide event title"),
  startDateTime: yup
    .string()
    .required("Please provide event start date and time"),
  endDate: yup.string().required("Please provide event end date"),
  discipline: yup.string().required("Please provide event discipline"),
  category: yup.string().required("Please provide event category"),
  country: yup.string().required("Please provide event country"),
  city: yup.string().required("Please provide event city"),
  address: yup.string().required("Please provide event address"),
  zipCode: yup.string().required("Please provide event zip code"),
  prizes: yup.array().of(
    yup.object().shape({
      place: yup.number().required("Please provide place"),
      amount: yup.number().required("Please provide amount"),
    })
  ),
});
