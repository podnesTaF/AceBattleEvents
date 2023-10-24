import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import React from "react";
import { ITeamEvent, IViewer } from "~/lib/types";
import { TeamRegistrationItem } from "..";

interface RegistrationsProps {
  registrations?: ITeamEvent[];
  viewers?: IViewer[];
}

const Registrations: React.FC<RegistrationsProps> = ({
  registrations,
  viewers,
}) => {
  return (
    <div className="p-2 w-full">
      <div className="flex flex-col gap-7">
        {registrations?.map((reg, i) => (
          <TeamRegistrationItem
            key={reg.event.id + "," + reg.team.id}
            event={reg.event}
            team={reg.team}
            index={i}
          />
        ))}
        {viewers?.map((reg, i) => (
          <TeamRegistrationItem
            key={reg.event.id + "," + reg.id}
            event={reg.event}
            viewer={reg}
            index={i}
          />
        ))}
        {!viewers?.length && !registrations?.length && (
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
