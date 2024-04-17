import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import React from "react";
import { IRegistration } from "~/lib/teams/types/Registrations";
import { TeamRegistrationItem } from "..";

interface RegistrationsProps {
  registrations?: IRegistration[];
}

const Registrations: React.FC<RegistrationsProps> = ({ registrations }) => {
  return (
    <div className="p-2 w-full">
      <div className="flex flex-col gap-7">
        {registrations?.map((reg, i) => (
          <TeamRegistrationItem
            key={reg.id}
            event={reg.eventRaceType.event}
            team={reg.team}
            index={i}
          />
        ))}
        {!registrations?.length && (
          <div className="px-4 py-6 flex gap-4 items-center border-l-2 border-red-500 bg-white">
            <InfoOutlinedIcon />
            <p className="text-xl font-semibold">
              No registrations has been found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Registrations;
