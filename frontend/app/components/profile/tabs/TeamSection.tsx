import { TeamCard } from "~/components/teams";
import { ITeam, IUser } from "~/lib/types";

const TeamSection = ({ teams, user }: { teams?: ITeam[]; user: IUser }) => {
  return (
    <div>
      {teams?.length ? (
        teams.map((team, idx) => (
          <TeamCard key={team.id} team={team} hightlightId={user.id} />
        ))
      ) : (
        <p className="text-center text-xl font-semibold">
          The runner don't have teams yet
          <br />
        </p>
      )}
    </div>
  );
};

export default TeamSection;
