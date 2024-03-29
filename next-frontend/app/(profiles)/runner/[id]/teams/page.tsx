import { AthleteApi } from "@/src/entities/Athletes";
import { TeamCard } from "@/src/entities/Teams";

const RunnerTeamsPage = async ({ params }: { params: { id: string } }) => {
  const atheleteApi = new AthleteApi();
  const { active, past } = await atheleteApi.getAthleteTeams(params.id);
  return (
    <div className="py-6 px-4 w-full">
      <div className="mb-6">
        <h2 className="mb-3">Current Teams</h2>
        <div className="w-full">
          {active.length > 0 ? (
            active.map((team) => <TeamCard key={team.id} team={team} />)
          ) : (
            <div className="bg-gray-400 h-72 w-full">
              <h3>No active teams for the runner</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RunnerTeamsPage;
