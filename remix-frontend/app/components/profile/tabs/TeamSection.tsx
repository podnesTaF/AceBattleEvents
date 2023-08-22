import { TeamCard } from "~/components/teams";
import { ITeam, IUser } from "~/lib/types";

const TeamSection = ({ teams, user }: { teams?: ITeam[]; user: IUser }) => {
  return (
    <div className="p-4">
      <h2 className="text-3xl font-semibold mb-4 text-center">Your teams</h2>
      {teams?.length ? (
        teams.map((team, idx) => (
          <TeamCard key={team.id} team={team} hightlightId={user.id} />
        ))
      ) : (
        <p className="text-center text-xl font-semibold">
          You don't have teams yet
          <br />
        </p>
      )}
    </div>
  );
};

export default TeamSection;
