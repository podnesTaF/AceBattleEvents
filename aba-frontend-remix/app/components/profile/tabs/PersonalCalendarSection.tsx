import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { IRegistration } from "~/lib/teams/types/Registrations";
import { IUser } from "~/lib/types";
import { isRunner } from "~/lib/utils";
import Registrations from "../Registrations";

const PersonalCalendarSection = ({
  user,
  registrations,
}: {
  user: IUser;
  registrations?: IRegistration[];
}) => {
  if (isRunner(user) && registrations) {
    return (
      <div className="py-4">
        {registrations.length ? (
          <Registrations registrations={registrations} />
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
