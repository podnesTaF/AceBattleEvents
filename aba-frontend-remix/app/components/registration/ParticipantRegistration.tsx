import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { Api } from "~/api/axiosInstance";
import {
  CreateParticipant,
  IParticipant,
} from "~/lib/registrations/types/IParticipant";
import { IEvent } from "~/lib/types";
import { ParticipateSchema, participateSchema } from "~/lib/utils";
import RegistrationLayout from "./RegistrationLayout";
import ConfirmEmail from "./steps/ConfirmEmail";
import ParticipantInfo from "./steps/ParticipantInfo";
import RacePicker from "./steps/RacePicker";

const getRegistrationSteps = () => {
  return [
    {
      title: "Choose Races",
      fieldsToValidate: ["raceIds"],
      navigation: true,
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
        "unique-participant",
        "countryId",
        "city",
        "phone",
        "phoneCode",
      ],
      submit: true,
      navigation: true,
    },
    {
      title: "Confirm Registration",
      fieldsToValidate: [],
      navigation: false,
    },
  ];
};

const ParticipantRegistration = ({ event }: { event: IEvent }) => {
  const form = useForm<ParticipateSchema>({
    mode: "onSubmit",
    resolver: yupResolver(participateSchema),
    defaultValues: {
      eventRaceTypes: [],
    },
  });

  const [activeStep, setActiveStep] = useState(0);
  const [participant, setParticipant] = useState<
    (IParticipant & { ott: string }) | null
  >(null);

  const { mutate: createParticipant, isLoading } = useMutation(
    (data: CreateParticipant) => Api().participant.create(data),
    {
      onSuccess: (data) => {
        setParticipant(data);
        handleNext(true);
      },
      onError: (error) => {
        form.setError("root", {
          type: "manual",
          message: "Something went wrong. Please try again later.",
        });
      },
      retry: false,
    }
  );

  const { data: countries } = useQuery(
    "countries",
    () => Api().dictionary.getFullCountries(),
    {
      retry: false,
    }
  );
  const { data: genders } = useQuery(
    "genders",
    () => Api().dictionary.getGenders(),
    {
      retry: false,
    }
  );

  const { handleSubmit } = form;

  const handleNext = async (postSubmit?: boolean) => {
    if (activeStep === 1 && !postSubmit) {
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
          {activeStep === 2 && participant && (
            <ConfirmEmail
              participant={participant!}
              eventCode={event.eventCode}
            />
          )}
          {form.formState.errors.root ? (
            <p className="text-red-500 text-sm md:text-md mb-1 ml-3">
              {form.formState.errors.root.message}
            </p>
          ) : null}
        </RegistrationLayout>
      </form>
    </FormProvider>
  );
};

export default ParticipantRegistration;
