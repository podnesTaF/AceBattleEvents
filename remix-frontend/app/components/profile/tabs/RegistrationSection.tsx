import { Registrations } from "~/components";
import { ITeamEvent, IUser, IViewer } from "~/lib/types";

interface RegistrationsSectionProps {
  user: IUser;
  viewerRegistrations?: IViewer[];
  teamRegistrations?: ITeamEvent[];
}

const RegistrationsSection: React.FC<RegistrationsSectionProps> = ({
  user,
  viewerRegistrations,
  teamRegistrations,
}) => {
  if (
    (user.role === "manager" && teamRegistrations) ||
    (user.role === "viewer" && viewerRegistrations)
  ) {
    return (
      <Registrations
        registrations={teamRegistrations}
        viewers={viewerRegistrations}
      />
    );
  } else {
    return null;
  }
};

export default RegistrationsSection;
