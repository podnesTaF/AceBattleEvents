import HomeIcon from "@mui/icons-material/Home";
import { LoaderArgs, V2_MetaFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Api } from "~/api/axiosInstance";
import { CustomCrumbs } from "~/components";
import FinishedEventCard from "~/components/events/FinishedEventCard";

const links = [
  {
    title: "Home",
    url: "/",
    icon: HomeIcon,
  },
  {
    title: "Results",
    url: "/results",
    active: true,
  },
];

export const meta: V2_MetaFunction = () => {
  return [{ title: "Ace Battle Events | Results" }];
};

export const loader = async ({ request }: LoaderArgs) => {
  const finishedEvents = await Api().events.getEvents("finished=true");

  return json({
    finishedEvents,
  });
};

const ResultsPage = () => {
  const { finishedEvents } = useLoaderData<typeof loader>();

  return (
    <>
      <header className="w-full flex justify-center h-96 bg-[url('/results1.jpg')] bg-cover bg-fixed bg-no-repeat bg-center relative flex-col">
        <div className="h-3/5 mb-10 sm:mb-0 sm:h-1/2 bg-[#FCEF3C] flex justify-center items-center w-3/4 sm:w-3/5 md:w-[500px]">
          <h2 className="uppercase font-semibold text-3xl sm:text-5xl">
            Battles' <br />
            Results
          </h2>
        </div>
      </header>
      <main className="max-w-7xl mx-auto mt-4 mb-8 min-h-[700px]">
        <div className="flex flex-col sm:flex-row gap-6 justify-between items-center mb-6 lg:mb-8">
          <CustomCrumbs links={links} />
        </div>
        <div className="w-full gap-7 flex flex-col">
          {finishedEvents.events.length ? (
            finishedEvents.events.map((event) => (
              <FinishedEventCard key={event.id} event={event} />
            ))
          ) : (
            <p className="text-2xl text-center">No results yet</p>
          )}
        </div>
      </main>
    </>
  );
};

export default ResultsPage;
