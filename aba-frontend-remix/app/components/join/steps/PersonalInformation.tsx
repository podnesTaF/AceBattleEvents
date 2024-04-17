import { FormField, FormSelect } from "~/components/shared";

const PersonalInformation = ({
  genders,
  countries,
}: {
  genders: { id: number; name: string }[];
  countries: { id: number; name: string }[];
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-2 lg:gap-5 2xl:gap-[5%]">
        <FormField
          className="w-full"
          name={"firstName"}
          label="First Name"
          placeholder="e.g Smith"
        />
        <FormField
          className="w-full"
          name={"lastName"}
          label="Last Name"
          placeholder="e.g John"
        />
      </div>
      <div className="flex flex-col md:flex-row gap-2  lg:gap-5 2xl:gap-[5%]">
        <FormSelect
          className="w-full"
          name="countryId"
          label="Where are you from?"
          placeholder="Choose country"
          values={countries.map((c) => [c.id, c.name])}
          onChangeFilter={() => {}}
        />
        <FormField
          className="w-full"
          name={"city"}
          label="City"
          placeholder="Please provide your city"
        />
      </div>
      <div className="flex flex-col md:flex-row lg:gap-5 2xl:gap-[5%]">
        <FormSelect
          className="w-full"
          name={`genderId`}
          label="What is your gender?"
          placeholder="Choose gender"
          values={genders.map((g) => [g.id, g.name])}
          onChangeFilter={() => {}}
        />
        <FormField
          className="w-full"
          label="Date Of Birth"
          mask="99/99/9999"
          name={`dateOfBirth`}
          placeholder={"dd/mm/yyyy"}
        />
      </div>
    </div>
  );
};

export default PersonalInformation;
