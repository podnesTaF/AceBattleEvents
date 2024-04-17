import { HTMLProps } from "react";
import { useFormContext } from "react-hook-form";

const DateField = ({ ...props }: HTMLProps<HTMLDivElement>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<{
    day: number;
    month: number;
    year: number;
  }>();

  return (
    <div className={`flex w-full ${props.className || ""}`}>
      <div className="flex-1 mr-2">
        <input
          type="number"
          id="day"
          {...register("day")}
          placeholder="Day"
          className="mt-1 bg-gray-50 border text-gray-900 text-sm lg:text-md 2xl:text-lg rounded-lg focus:ring-gray-600/70 focus:ring-2 outline-none block w-full p-2.5 lg:p-4 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
        />
        {errors.day && (
          <p className="mt-1 text-sm text-red-600">{errors.day.message}</p>
        )}
      </div>
      <div className="flex-1 mx-2">
        <input
          type="number"
          id="month"
          placeholder="Month"
          {...register("month")}
          className="mt-1 bg-gray-50 border text-gray-900 text-sm lg:text-md 2xl:text-lg rounded-lg focus:ring-gray-600/70 focus:ring-2 outline-none block w-full p-2.5 lg:p-4 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
        />
        {errors.month && (
          <p className="mt-1 text-sm text-red-600">{errors.month.message}</p>
        )}
      </div>
      <div className="flex-1 ml-2">
        <input
          type="number"
          id="year"
          {...register("year")}
          placeholder="Year"
          className="mt-1 bg-gray-50 border text-gray-900 text-sm lg:text-md 2xl:text-lg rounded-lg focus:ring-gray-600/70 focus:ring-2 outline-none block w-full p-2.5 lg:p-4 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
        />
        {errors.year && (
          <p className="mt-1 text-sm text-red-600">{errors.year.message}</p>
        )}
      </div>
    </div>
  );
};

export default DateField;
