import React from "react";
import { convertDateFormat } from "~/lib/shared/utils/date-formaters";
import { ITeamEvent } from "~/lib/teams/types/Registrations";

interface RegistrationsProps {
  registrations: ITeamEvent[];
}

const Registrations: React.FC<RegistrationsProps> = ({ registrations }) => {
  return (
    <div className="p-5 w-full">
      <h2 className="text-2xl font-semibold pb-4 mb-4 text-center border-b-[1px] border-red-500">
        Your future activity
      </h2>
      <div className="flex flex-col gap-5">
        {registrations.map((reg, i) => (
          <div
            className={`rounded-md relative overflow-hidden w-full sm:w-[640px] ${
              i % 2 ? "ml-auto" : "ml-0"
            }`}
          >
            <h4 className="text-xl font-semibold mb-1">
              {convertDateFormat(reg.event.startDateTime)}
            </h4>
            <div className="rounded-sm h-2 w-full bg-red-500 mb-3"></div>
            <div className="flex w-full gap-4 relative">
              <div className="w-full sm:w-1/2">
                <p className="text-gray-400 border-b-[1px] border-red-500 pb-1 mb-2">
                  Event
                </p>
                <h3 className="text-2xl font-semibold mb-2">
                  {reg.event.title}
                </h3>
                <p className="text-gray-400 mb-2">Registered Team:</p>
                <h4 className="text-xl font-semibold mb-2">{reg.team.name}</h4>
                <p className="text-gray-400 mb-2">Coach:</p>
                <h4 className="text-xl font-semibold mb-2">
                  {reg.team.coach.name} {reg.team.coach.surname}
                </h4>
                <p className="text-xl text-gray-400 underline mb-2">
                  {reg.event.location.address}, {reg.event.location.zipCode}
                </p>
              </div>
              <img
                src={i % 2 === 0 ? `/stadium.png` : "/running.svg"}
                alt="stadium"
                className="absolute bottom-0 right-0 w-1/2 object-contain h-full"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Registrations;
