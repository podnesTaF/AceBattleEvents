import { DictionaryApi } from "@/src/entities/Dictionary";
import { RunnerApi } from "@/src/entities/Runner";
import { TeamApi } from "@/src/entities/Team";
import { RunnerCardItem, RunnerFilters } from "@/src/features/runners/ui";

interface AthletesPageProps {
  searchParams: {
    search: string;
    page: number;
    teamId: number;
    countryId: number;
    genderId: number;
  };
}

const AthletesPage = async ({
  searchParams: { search, page, teamId, countryId, genderId },
}: AthletesPageProps) => {
  const runnerApi = new RunnerApi();
  const dictionaryApi = new DictionaryApi();
  const teamsApi = new TeamApi();
  const pathname = `search=${search || ""}&page=${page || ""}&countryId=${
    countryId || ""
  }&teamId=${teamId || ""}&genderId=${genderId || ""}`;

  const athletes = await runnerApi.getAthletes(pathname);

  const countries = await dictionaryApi.getCountries();
  const genders = await dictionaryApi.getGenders();
  const teamsPreview = await teamsApi.getPreviewTeams();

  return (
    <>
      <RunnerFilters
        teamsPreview={teamsPreview}
        countries={countries}
        genders={genders}
        totalPages={athletes.meta.totalPages}
        page={page}
      >
        <div className="my-8">
          <div className="flex flex-wrap px-4 xl:px-8 my-4 gap-8 justify-center">
            {athletes.items?.map((runner) => (
              <RunnerCardItem hideRole={true} key={runner.id} item={runner} />
            ))}
          </div>
        </div>
      </RunnerFilters>
    </>
  );
};

export default AthletesPage;
