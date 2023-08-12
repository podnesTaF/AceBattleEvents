import React from "react";
import { countries } from "~/lib/shared/data/countries";
import FormField from "../shared/forms/FormField";
import FormRadio from "../shared/forms/FormRadio";
import FormSelect from "../shared/forms/FormSelect";

interface AddPlayerInfoProps {
  errorState: any;
  errorInstance: any;
  name: any;
}

const AddPlayerInfo: React.FC<AddPlayerInfoProps> = ({
  errorState,
  errorInstance,
  name,
}) => {
  return (
    <>
      <div className="w-full md:w-2/5">
        <FormField
          label="First name*"
          name={`${name}.name`}
          placeholder={"Enter name here..."}
        />
        {errorState?.name && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            {errorInstance.name.message}
          </p>
        )}
      </div>
      <div className="w-full md:w-2/5">
        <FormField
          label="Surname*"
          name={`${name}.surname`}
          placeholder={"Enter surname here..."}
        />
        {errorState?.surname && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            {errorInstance.surname.message}
          </p>
        )}
      </div>
      <div className="w-full md:w-2/5">
        <FormField
          label="Date Of Birth*"
          mask="99/99/9999"
          name={`${name}.dateOfBirth`}
          placeholder={"dd/mm/yyyy"}
        />
        {errorState?.dateOfBirth && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            {errorInstance.dateOfBirth.message}
          </p>
        )}
      </div>
      <div className="w-full md:w-2/5">
        <h3>Gender</h3>
        <FormRadio
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
          ]}
          name={`${name}.gender`}
        />
        {errorState?.gender && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            {errorInstance.gender?.message}
          </p>
        )}
      </div>
      <div className="w-full md:w-2/5">
        <FormField
          label="email*"
          name={`${name}.email`}
          placeholder={"Enter name here..."}
        />
        {errorState?.name && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            {errorInstance.name.message}
          </p>
        )}
      </div>
      <div className="w-full md:w-2/5">
        <FormSelect
          name={`${name}.country`}
          label={"Country*"}
          placeholder={"Choose Country..."}
          values={Object.entries(countries)}
          onChangeFilter={() => {}}
        />
        {errorState?.surname && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            {errorInstance.surname.message}
          </p>
        )}
      </div>
      <div className="w-full md:w-5/6 md:mx-auto">
        <FormField
          label="World Athletics URL"
          name={`${name}.worldAthleticsUrl`}
          placeholder={"Enter World Athletics URL here..."}
          type="url"
        />
        {errorState?.dateOfBirth && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            {errorInstance.dateOfBirth.message}
          </p>
        )}
      </div>
    </>
  );
};

export default AddPlayerInfo;
