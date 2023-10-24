import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
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
      <div className="py-4">
        {teamRegistrations.length ? (
          <Registrations registrations={teamRegistrations} />
        ) : (
          <div className="px-4 py-6 flex gap-4 items-center border-l-2 border-red-500 bg-white">
            <InfoOutlinedIcon />
            <p className="text-xl font-semibold">
              The runner has no registrations yet
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
