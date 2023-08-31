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
    <div className="p-5 w-full">
      <h2 className="text-2xl font-semibold pb-4 mb-4 text-center border-b-[1px] border-red-500">
        Your future activity
      </h2>
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
      </div>
    </div>
  );
};

export default Registrations;
