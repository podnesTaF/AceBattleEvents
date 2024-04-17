import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useFormContext } from "react-hook-form";
import { CustomCheck } from "~/components/shared";
import { JoinFormValues } from "~/lib/auth/utils/join-schema";
import { IRole } from "~/lib/types";
import { convertPersonalResultToStr } from "~/lib/utils";

const InfoOverview = ({
  roles,
  countries,
  genders,
  distances,
}: {
  roles: IRole[];
  genders: { id: number; name: string }[];
  countries: { id: number; name: string }[];
  distances: { id: number; name: string }[];
}) => {
  const { getValues } = useFormContext<JoinFormValues>();

  return (
    <div className="gap-3 md:gap-4">
      <div className="mb-2">
        <p className="text-md lg:text-lg text-gray-300 font-semibold">
          Full Name
        </p>
        <p className="text-md lg:text-lg  font-semibold">
          {getValues("firstName")} {getValues("lastName")}
        </p>
      </div>
      <div className="mb-2">
        <p className="text-md lg:text-lg text-gray-300 font-semibold">
          Email Address
        </p>
        <div className="flex gap-2 items-center">
          <p className="text-md lg:text-lg  font-semibold">
            {getValues("email")}
          </p>
          {getValues("emailConfirmed") ? (
            <CheckCircleOutlineIcon className="text-green-500" />
          ) : (
            <ErrorOutlineIcon color={"error"} />
          )}
        </div>
      </div>
      <div className="mb-2">
        <p className="text-md lg:text-lg text-gray-300 font-semibold">
          Location
        </p>
        <p className="text-md lg:text-lg  font-semibold">
          {
            countries.find(
              (c) => getValues("countryId") && c.id === +getValues("countryId")
            )?.name
          }{" "}
          {getValues("city")}
        </p>
      </div>
      {roles.find((r) => getValues("roles")?.includes(r.id))?.name ===
        "runner" && (
        <div className="my-2">
          <p className="text-md lg:text-lg text-gray-300 font-semibold">
            Sportsman Info
          </p>
          <div className="flex flex-col gap-2">
            <p className="text-md lg:text-lg  font-semibold">
              {getValues("category")}
            </p>
            <p className="text-md lg:text-lg  font-semibold">
              {getValues("dateOfBirth")}
            </p>
            <p className="text-md lg:text-lg  font-semibold">
              PB:{" "}
              {getValues("personalBests")?.map((pb) =>
                convertPersonalResultToStr(pb, distances)
              ) || "N/A"}
            </p>
            <p className="text-md lg:text-lg  font-semibold">
              SB:{" "}
              {getValues("seasonBests")?.map((sb) =>
                convertPersonalResultToStr(sb, distances)
              ) || "N/A"}
            </p>
          </div>
        </div>
      )}
      <div className="my-6 lg:my-8 pt-4 border-t-2 border-t-gray-300">
        <div className="flex justify-between mb-4">
          <p className="font-semibold text-lg lg:text-xl">
            {roles.find((r) => getValues("roles")?.includes(r.id))?.name}{" "}
            Membership
          </p>
          <p className="font-semibold text-lg lg:text-xl">€9.99</p>
        </div>
        <div className="flex justify-between mb-4">
          <p className="font-semibold text-lg lg:text-xl text-gray-400">
            Total
          </p>
          <p className="font-semibold text-lg lg:text-xl text-gray-400">
            €9.99
          </p>
        </div>
        <div className="w-full md:w-2/3">
          <CustomCheck
            name={"acceptTerms"}
            label={"I agree with terms and conditions of 'Ace Battle Mile'"}
          />
        </div>
        <div className="w-full md:w-2/3">
          <CustomCheck
            name={"acceptNews"}
            label={"I want to stay updated with upcoming events and news"}
          />
        </div>
      </div>
    </div>
  );
};

export default InfoOverview;
