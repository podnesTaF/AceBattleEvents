import { useFormContext } from "react-hook-form";
import { ICountry } from "~/lib/types";

const PhoneField = ({ countries }: { countries?: ICountry[] }) => {
  const { register } = useFormContext();

  return (
    <div className="w-full">
      <label
        htmlFor="phoneCode"
        className="block mb-2 text-sm lg:text-md xl:text-lg font-semibold text-[#333] ml-3"
      >
        Country Code
      </label>
      <div className="flex items-center space-x-2 w-full">
        <div>
          <select
            id="phoneCode"
            {...register("phoneCode")}
            className="mt-1 bg-gray-50 border text-gray-900 text-sm lg:text-md 2xl:text-lg rounded-lg focus:ring-gray-600/70 focus:ring-2 outline-none block w-full p-2.5 lg:p-4 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
          >
            {countries?.map((country) => (
              <option
                className="uppercase"
                key={country.id}
                value={country.phoneCode}
              >
                ({country.phoneCode}) - {country.shortName}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <input
            type="text"
            id="phoneNumber"
            {...register("phoneNumber")}
            className="mt-1 bg-gray-50 border text-gray-900 text-sm lg:text-md 2xl:text-lg rounded-lg focus:ring-gray-600/70 focus:ring-2 outline-none block w-full p-2.5 lg:p-4 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
            placeholder="Enter phone number"
          />
        </div>
      </div>
    </div>
  );
};

export default PhoneField;
