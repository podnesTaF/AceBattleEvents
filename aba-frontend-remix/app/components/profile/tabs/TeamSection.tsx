import { TeamCard } from "~/components/teams";
import { ITeamPlayer, IUser } from "~/lib/types";

const TeamSection = ({
  runnerTeams,
  user,
}: {
  runnerTeams?: ITeamPlayer[];
  user: IUser;
}) => {
  return (
    <div>
      {runnerTeams?.length ? (
        runnerTeams.map((rt, idx) => (
          <TeamCard key={rt.id} team={rt.team} hightlightId={user.id} />
        ))
      ) : (
        <p className="text-center text-xl font-semibold mt-[5%] text-gray-500">
          The runner don't have teams yet
          <br />
        </p>
      )}
    </div>
  );
};

export default TeamSection;
