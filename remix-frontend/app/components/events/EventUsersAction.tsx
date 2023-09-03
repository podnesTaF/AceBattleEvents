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
    <div className="my-20 mx-4 xl:mx-0 flex flex-col sm:flex-row justify-around gap-3">
      <div className="relative">
        <img src={"/details3.jpg"} width={400} height={300} alt="pict" />
        <div className="absolute flex justify-center items-center w-full top-0 left-0 h-full sm:hidden bg-black/50">
          <h2 className="text-3xl uppercase font-semibold p-3 text-white">
            ADD YOUR TEAM AND BE ABLE TO WIN SUPER PRIZE!
          </h2>
        </div>
      </div>
      <div className="w-full sm:max-w-[400px] flex flex-col items-center">
        <h2 className="text-3xl uppercase font-semibold mb-8 hidden sm:block">
          ADD YOUR TEAM AND BE ABLE TO WIN SUPER PRIZE!
        </h2>
        <button
          onClick={() => {
            if (userRole === "manager") {
              navigate(`/events/${eventId}/register-team`);
            } else if (userRole === "viewer") {
              navigate(`/events/${eventId}/register`);
            }
          }}
          className="bg-green-300 text-white uppercase font-semibold rounded-lg w-3/4 py-3"
        >
          {userRole === "manager" ? "Register Now" : "Attend the Event"}
        </button>
      </div>
    </div>
  );
};

export default EventUsersAction;
