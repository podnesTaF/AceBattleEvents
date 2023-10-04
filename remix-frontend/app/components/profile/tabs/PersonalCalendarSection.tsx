import { ITeamEvent, IUser } from "~/lib/types";
import Registrations from "../Registrations";

const PersonalCalendarSection = ({
  user,
  teamRegistrations,
}: {
  user: IUser;
  teamRegistrations?: ITeamEvent[];
}) => {
  if (user.role === "runner" && teamRegistrations) {
    return (
      <div className="p-4">
        {teamRegistrations.length ? (
          <Registrations registrations={teamRegistrations} />
        ) : (
          <div className="w-full py-6 border-gray-300 border-2">
            <p className="text-center text-3xl font-semibold text-gary-400">
              You have no Registrations for any events
            </p>
          </div>
        )}
      </div>
    );
  } else {
    return null;
  }
};

export default PersonalCalendarSection;
