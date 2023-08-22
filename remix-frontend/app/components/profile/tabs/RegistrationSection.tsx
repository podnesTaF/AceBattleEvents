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
  if (user.role === "viewer" && viewerRegistrations) {
    return (
      <ul>
        {viewerRegistrations.length ? (
          viewerRegistrations.map((registration) => (
            <li key={registration.id}>
              <p>{registration.event.title}</p>
              <p>{registration.lastName}</p>
            </li>
          ))
        ) : (
          <h3 className="text-2xl">No registrations yet</h3>
        )}
      </ul>
    );
  } else if (user.role === "manager" && teamRegistrations) {
    return <Registrations registrations={teamRegistrations} />;
  } else {
    return null;
  }
};

export default RegistrationsSection;
