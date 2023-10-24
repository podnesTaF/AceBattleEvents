import { useNavigate } from "@remix-run/react";
import React from "react";

interface IEventUsersActionProps {
  eventId?: number;
  isParticipant: boolean;
  userRole?: string;
}

const EventUsersAction: React.FC<IEventUsersActionProps> = ({
  eventId,
  userRole,
}) => {
  const navigate = useNavigate();

  if (userRole === "runner") {
    return null;
  }

  return (
    <div className="mt-8 bg-[url('/add-team.jpg')] bg-no-repeat bg-cover w-full relative h-64">
      <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-transparent to-black h-full"></div>
      <div className="w-full md:max-w-6xl flex flex-col md:flex-row items-center mx-auto justify-between h-full py-4 relative z-10">
        <h2 className="text-3xl uppercase font-semibold mb-8 text-white w-full md:w-1/2">
          {userRole === "manager"
            ? "ADD YOUR TEAM AND BE ABLE TO WIN SUPER PRIZE!"
            : "Attend the Event for a unique experience!"}
        </h2>
        <button
          onClick={() => {
            if (userRole === "manager") {
              navigate(`/events/${eventId}/register-team`);
            } else {
              navigate(`/events/${eventId}/register`);
            }
          }}
          className="bg-green-300 text-white uppercase font-semibold rounded-lg px-4 py-3 self-end"
        >
          {userRole === "manager" ? "Register Now" : "Attend the Event"}
        </button>
      </div>
    </div>
  );
};

export default EventUsersAction;
