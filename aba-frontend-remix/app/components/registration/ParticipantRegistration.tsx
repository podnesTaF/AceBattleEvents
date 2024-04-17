import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { Api } from "~/api/axiosInstance";
import { CreateParticipant } from "~/lib/registrations/types/IParticipant";
import { IEvent } from "~/lib/types";
import { ParticipateSchema, participateSchema } from "~/lib/utils";
import RegistrationLayout from "./RegistrationLayout";
import ParticipantInfo from "./steps/ParticipantInfo";
import RacePicker from "./steps/RacePicker";

const getRegistrationSteps = () => {
  return [
    {
      title: "Choose Races",
      fieldsToValidate: ["raceIds"],
    },
    {
      title: "Participant Information",
      fieldsToValidate: [
        "firstName",
        "lastName",
        "day",
        "month",
        "year",
        "genderId",
        "email",
        "emainConfirmed",
        "unique-participant",
        "countryId",
        "city",
        "phone",
        "phoneCode",
      ],
      submit: true,
    },
    {
      title: "Status",
      fieldsToValidate: [],
    },
  ];
};

const ParticipantRegistration = ({ event }: { event: IEvent }) => {
  const [activeStep, setActiveStep] = useState(0);
  const { mutate: createParticipant, isLoading } = useMutation(
    (data: CreateParticipant) => Api().participant.create(data),
    {
      onSuccess: (data) => {
        handleNext();
      },
      onError: (error) => {
        handleNext();
      },
    }
  );

  const { data: countries } = useQuery("countries", () =>
    Api().dictionary.getFullCountries()
  );
  const { data: genders } = useQuery("genders", () =>
    Api().dictionary.getGenders()
  );

  const form = useForm<ParticipateSchema>({
    mode: "onSubmit",
    resolver: yupResolver(participateSchema),
    defaultValues: {
      eventRaceTypes: [],
    },
  });

  const { handleSubmit } = form;

  const handleNext = async () => {
    if (activeStep === 1) {
      await handleSubmit(onSubmit)();
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onSubmit = (data: ParticipateSchema) => {
    const dto: CreateParticipant = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      eventId: event.id,
      phoneNumber: data.phoneNumber,
      phoneCode: data.phoneCode,
      dateOfBirth: `${data.year}-${data.month}-${data.day}`,
      eventCategoryIds: data.eventRaceTypes.map((e) => +e),
      countryId: +data.countryId,
      city: data.city,
      genderId: data.genderId,
    };

    createParticipant(dto);
  };

  console.log(form.formState.isSubmitting);

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-1 flex flex-col w-full h-full"
      >
        <RegistrationLayout
          steps={getRegistrationSteps()}
          activeStep={activeStep}
          handleNext={handleNext}
          handleBack={handleBack}
        >
          {activeStep === 0 && <RacePicker event={event} />}
          {activeStep === 1 && (
            <ParticipantInfo
              event={event}
              countries={countries}
              genders={genders}
            />
          )}
          {isLoading && (
            <div className="flex-1 flex justify-center items-center gap-3 animate-fadeInOut">
              <img
                src={"/ticket.svg"}
                className="w-40 h-40 lg:h-52 lg:w-52"
                alt="ticket"
              />
              <h3 className="text-lg md:text-xl font-semibold text-gray-400">
                Generating a ticket for you...
                <br />
                Please wait and do not leave the page
              </h3>
            </div>
          )}
          {activeStep === 2 && (
            <div className="flex-1 flex justify-center items-center gap-3">
              <img
                src={"/ticket.svg"}
                className="w-40 h-40 lg:h-52 lg:w-52"
                alt="ticket"
              />
              <h3 className="text-lg md:text-xl font-semibold text-gray-400">
                Generated!
              </h3>
            </div>
          )}
        </RegistrationLayout>
      </form>
    </FormProvider>
  );
};

export default ParticipantRegistration;
