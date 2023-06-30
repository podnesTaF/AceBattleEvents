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
  type: yup.string().required("Please provide team type"),
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
        personalBests: yup.array().of(
          yup.object().shape({
            distance: yup.number().required("Please provide distance"),
            time: yup.number().required("Please provide time"),
          })
        ),
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

const MAX_FILE_SIZE = 1024000; //1000KB

const validFileExtensions = {
  image: ["jpg", "gif", "png", "jpeg", "svg", "webp"],
};

function isValidFileType(fileName: any) {
  return (
    fileName &&
    validFileExtensions["image"].indexOf(fileName.split(".").pop()) > -1
  );
}

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
  introImage: yup.string(),
  minorImage: yup.string(),
});

export const addImageSchema = yup.object().shape({
  image: yup.mixed().required("Required"),
});
