import CheckIcon from "@mui/icons-material/Check";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Api } from "~/api/axiosInstance";
import { CustomCheck, FormField, FormSelect } from "~/components/shared";
import DateField from "~/components/shared/forms/DateField";
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
  const [isUnique, setIsUnique] = useState<boolean | null>(null);
  const {
    watch,
    setError,
    clearErrors,
    formState: { errors },
    trigger,
  } = useFormContext();

  const email = watch("email");

  const checkEmailUniqueness = useCallback(
    debounce(async (email) => {
      const isValid = await trigger("email");
      if (!isValid) {
        setIsUnique(null);
        return;
      }

      const res = await Api().participant.isUnique({
        email,
        eventRaceTypeIds: event.eventRaceTypes.map((e) => e.id),
      });

      if (!res) {
        setError("email", {
          type: "unique-participant",
          message: "The participant with the entered email already exists.",
        });
        setIsUnique(false);
      } else {
        setIsUnique(true);
        clearErrors("email");
      }
    }, 1000),
    [setError, clearErrors, event.eventRaceTypes]
  );

  useEffect(() => {
    if (email) {
      checkEmailUniqueness(email);
    } else {
      setIsUnique(null);
      clearErrors("email");
    }
  }, [email, checkEmailUniqueness, clearErrors]);

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
          {isUnique === false && (
            <ErrorOutlineIcon color="error" className="self-center" />
          )}
          {isUnique === true && (
            <CheckIcon color="success" className="self-center" />
          )}
        </div>
        <p className="text-sm md:text-md text-gray-500 dark:text-gray-400 mb-1 ml-3">
          We will send you a verification link to this email later
        </p>
        {errors["unique-participant"]?.message && (
          <p className="text-red-500 text-sm md:text-md mb-1 ml-3">
            {errors["unique-participant"]?.message as any}
          </p>
        )}
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
