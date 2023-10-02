import React from "react";
import { countries } from "~/lib/shared";
import { FormField, FormSelect } from "../forms";

interface UserDataFieldsProps {
  role: string;
}

const UserDataFields: React.FC<UserDataFieldsProps> = ({ role }) => {
  return (
    <div className="w-full flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between gap-0 md:gap-6 flex-nowrap">
        <div className="w-full md:w-1/2">
          <FormField
            name="firstName"
            label="First name"
            placeholder="e.g John"
          />
        </div>
        <div className="w-full md:w-1/2">
          <FormField
            name="lastName"
            label="Last name"
            placeholder="e.g Smith"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-0 md:gap-6 flex-nowrap">
        <div className="w-full md:w-1/2">
          <FormSelect
            name="country"
            label="Where are you from?"
            placeholder="Choose country"
            values={Object.entries(countries)}
            onChangeFilter={() => {}}
          />
        </div>
        <div className="w-full md:w-1/2 self-end">
          <FormField name="city" label="" placeholder="Enter your city" />
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-0 md:gap-6 flex-nowrap">
        <div className="w-full md:w-1/2">
          <FormSelect
            name={`gender`}
            label="What is your gender?"
            placeholder="Choose gender"
            values={Object.entries(
              role === "runner"
                ? {
                    male: "Male",
                    female: "Female",
                  }
                : {
                    male: "Male",
                    female: "Female",
                    other: "Prefer not to say",
                  }
            )}
            onChangeFilter={() => {}}
          />
        </div>
        <div className="w-full md:w-1/2">
          {role === "runner" ? (
            <FormField
              label="Date Of Birth"
              mask="99/99/9999"
              name={`dateOfBirth`}
              placeholder={"dd/mm/yyyy"}
            />
          ) : (
            <FormSelect
              name={`ageRange`}
              label="Your age range?"
              placeholder="Choose range"
              values={Object.entries({
                "<18": "<18",
                "18-24": "18-24",
                "25-34": "25-34",
                "35-44": "35-44",
                ">45": ">45",
              })}
              onChangeFilter={() => {}}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDataFields;
