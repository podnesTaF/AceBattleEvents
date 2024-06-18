import HomeIcon from "@mui/icons-material/Home";
import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Api } from "~/api/axiosInstance";
import { CustomCrumbs } from "~/components";
import FinishedEventCard from "~/components/events/FinishedEventCard";
import { IEvent } from "~/lib/types";

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

export const meta: MetaFunction = () => {
  return [{ title: "Ace Battle Events | Results" }];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const finishedEvents = await Api().events.getEventPreviews("finished=true");

  return json({
    finishedEvents,
  });
};

const ResultsPage = () => {
  const { finishedEvents } = useLoaderData<typeof loader>();

  return (
    <>
      <header className="w-full flex justify-end md:justify-center h-56 md:h-[400px] bg-[url('/results1.jpg')] bg-cover bg-no-repeat bg-center relative flex-col ">
        <div className="h-2/5 sm:h-1/2 bg-[#FCEF3C] flex justify-center items-center w-3/4 sm:w-3/5 md:w-[500px]">
          <h2 className="uppercase font-semibold text-2xl sm:text-3xl md:text-5xl">
            Battles' <br />
            Results
          </h2>
        </div>
      </header>
      <main className="max-w-5xl mx-4 sm:mx-6 lg:mx-auto mt-4 mb-8 min-h-[700px]">
        <div className="flex flex-col sm:flex-row gap-6 justify-between items-center mb-6 lg:mb-8">
          <CustomCrumbs links={links} />
        </div>
        <div className="w-full gap-7 flex flex-col">
          {finishedEvents.events.length ? (
            finishedEvents.events.map((event) => (
              <FinishedEventCard key={event.id} event={event as IEvent} />
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
