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
      <div>
        {teamRegistrations.length ? (
          <Registrations registrations={teamRegistrations} />
        ) : (
          <h3 className="text-2xl">You don't have any registrations yet</h3>
        )}
      </div>
    );
  } else {
    return null;
  }
};

export default PersonalCalendarSection;
