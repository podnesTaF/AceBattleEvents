import React from "react";
import FormField from "./FormField";
import FormRadio from "./FormRadio";

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
          onChange={() => {}}
          name={`${name}.gender`}
        />
        {errorState?.gender && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            {errorInstance.gender?.message}
          </p>
        )}
      </div>
      <div className="w-full">
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
