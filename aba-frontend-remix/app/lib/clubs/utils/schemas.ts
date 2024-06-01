import * as yup from "yup";

export const createClubSchema = yup.object().shape({
  name: yup.string().required("Please provide club name"),
  city: yup.string().required("Please provide club city"),
  country: yup.string().required("Please provide club country"),
  logo: yup.mixed(),
  photo: yup.mixed(),
  phone: yup.string().required("Please provide club phone"),
});
