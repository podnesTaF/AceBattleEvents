import { Button } from "@mui/material";
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useMutation } from "react-query";
import { Api } from "~/api/axiosInstance";
import { CustomCheck, FormField, FormSelect } from "~/components/shared";
import DateField from "~/components/shared/forms/DateField";
import OtpField from "~/components/shared/forms/OtpField";
import PhoneField from "~/components/shared/forms/PhoneField";
import { ICountry, IEvent } from "~/lib/types";

const responibilities = [
  "Get fit at the start",
  "Choose ventilated clothing in a light color and protect yourself extra when the sun shines",
  "Pay attention to your running pace",
];

const ParticipantInfo = ({
  genders,
  countries,
  event,
}: {
  genders?: { id: number; name: string }[];
  countries?: ICountry[];
  event: IEvent;
}) => {
  const {
    setValue,
    watch,
    trigger,
    formState: { errors },
    setError,
  } = useFormContext();

  const isAlreadySending = useRef(false);

  const [timeBeforeResend, setTimeBeforeResend] = useState(0);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [errorSendingEmail, setErrorSendingEmail] = useState(false);

  const email = watch("email");
  const { mutate: sendEmailConfirmation, isLoading: isSendingEmail } =
    useMutation(
      async (email: string) => {
        if (isAlreadySending.current) return;
        isAlreadySending.current = true;

        try {
          await Api().users.createParticipantConfirmation(email, {
            id: event.id,
            title: event.title,
          });
        } finally {
          isAlreadySending.current = false;
        }
      },
      {
        onError: (error: any) => {
          setErrorSendingEmail(true);
          setTimeout(() => {
            setErrorSendingEmail(false);
          }, 3000);
        },
      }
    );

  const {
    mutate: verifyEmailOtp,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(
    async (otp: string) => Api().users.verifyEmailOtp({ email, otp }),
    {
      onSuccess: (data) => {
        setValue("emailConfirmed", true);
      },
      onError: (error: any) => {
        setErrorSendingEmail(true);
        setTimeout(() => {
          setErrorSendingEmail(false);
        }, 3000);
      },
    }
  );

  const sendCode = async () => {
    const isValid = await trigger("email");
    const eventRaceTypes = watch("eventRaceTypes");

    const isUnique = await Api().participant.isUnique({
      email,
      eventRaceTypeIds: eventRaceTypes.map((r: string) => +r),
    });

    if (!isUnique) {
      setError("unique-participant", {
        type: "manual",
        message: "Participant with this email already exists",
      });

      return;
    } else {
      setError("unique-participant", {
        type: "manual",
        message: "",
      });
    }

    if (!isValid || timeBeforeResend > 0) return;
    // Send code

    sendEmailConfirmation(email);
    setIsCodeSent(true);

    // Start timer
    setTimeBeforeResend(60);
    sendEmailConfirmation(email);

    const interval = setInterval(() => {
      setTimeBeforeResend((prev) => prev - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
    }, 60000);
  };

  const handleComplete = (value: string) => {
    verifyEmailOtp(value);
  };

  return (
    <div className="flex flex-col flex-1">
      <h5 className="text-lg md:text-xl font-semibold my-4 xl:mb-6 pb-1 border-b border-b-gray-300">
        Your Personal Details
      </h5>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col xs:flex-row gap-2 lg:gap-5 2xl:gap-[5%]">
          <FormField
            className="w-full"
            name={"firstName"}
            label="First Name"
            placeholder="e.g John"
          />
          <FormField
            className="w-full"
            name={"lastName"}
            label="Last Name"
            placeholder="e.g Smith"
          />
        </div>
        <div className="flex flex-row gap-2 lg:gap-5 2xl:gap-[5%]">
          <FormField
            className="w-full flex-1"
            name={"email"}
            label="Email"
            placeholder="e.g example@example.com"
          />
          <div className="flex items-end">
            <Button
              type="button"
              onClick={sendCode}
              variant="contained"
              className="!rounded-full !p-2.5 lg:!p-4"
              disabled={timeBeforeResend > 0 || isSendingEmail}
            >
              {timeBeforeResend > 0
                ? `Resend in ${timeBeforeResend}s`
                : "Send Code"}
            </Button>
          </div>
        </div>
        <p className="text-sm md:text-md text-gray-500 dark:text-gray-400 mb-1 ml-3">
          We will send you a verification code to this email
        </p>
        {errors["unique-participant"]?.message && (
          <p className="text-red-500 text-sm md:text-md mb-1 ml-3">
            {errors["unique-participant"]?.message as any}
          </p>
        )}
        {errors["emailConfirmed"]?.message && (
          <p className="text-red-500 text-sm md:text-md mb-1 ml-3">
            {errors["emailConfirmed"]?.message as any}
          </p>
        )}
        {isCodeSent ? (
          <div className="flex flex-col gap-4">
            <p className="text-md lg:text-lg dark:text-gray-400 font-medium ml-3">
              Please enter the code we sent to your email
            </p>
            <div className="flex ml-3 sm:ml-0 sm:justify-center flex-row gap-2 lg:gap-5 2xl:gap-[5%] ">
              <OtpField
                callback={handleComplete}
                reset={false}
                error={errorSendingEmail ? "Invalid code" : undefined}
                isSuccess={isSuccess}
                isLoading={isLoading}
              />
            </div>
          </div>
        ) : null}
        <div className="flex flex-col gap-2 mt-2">
          <p className="block text-sm lg:text-md xl:text-lg font-semibold text-[#333]">
            Date of Birth
          </p>
          <DateField />
        </div>

        <div className="flex flex-col md:flex-row lg:gap-5 2xl:gap-[5%]">
          <FormSelect
            className="w-full"
            name={`genderId`}
            label="What is your gender?"
            placeholder="Choose gender"
            values={genders?.map((g) => [g.id, g.name]) || []}
            onChangeFilter={() => {}}
          />
        </div>
        <FormField
          className="w-full"
          name={"city"}
          label="City"
          placeholder="Enter your city"
        />
        <div className="flex flex-col md:flex-row lg:gap-5 2xl:gap-[5%]">
          <FormSelect
            className="w-full"
            name={`countryId`}
            label="Where are you from?"
            placeholder="Choose Country"
            values={countries?.map((c) => [c.id, c.name]) || []}
            onChangeFilter={() => {}}
          />
        </div>
        <div className="flex flex-col md:flex-row lg:gap-5 2xl:gap-[5%]">
          <PhoneField countries={countries} />
        </div>
        <div className="my-3">
          <h4 className="text-md sm:text-lg font-semibold">
            Participant responsibilities
          </h4>
          <ol className="list-decimal list-inside">
            {responibilities.map((r, i) => (
              <li key={i} className="text-sm md:text-md lg:text-lg text-[#333]">
                {r}
              </li>
            ))}
          </ol>
        </div>
        <div className="w-full">
          <CustomCheck
            name={"acceptTerms"}
            label={"Understand and accept the terms and conditions"}
          />
        </div>
      </div>
    </div>
  );
};

export default ParticipantInfo;
