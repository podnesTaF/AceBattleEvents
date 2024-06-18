import { Info } from "@mui/icons-material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData, useRouteError } from "@remix-run/react";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { Api } from "~/api/axiosInstance";
import { AppBar } from "~/components";
import EventButton from "~/components/events/EventButton";
import EventDrawerMenu from "~/components/events/header/EventDrawerMenu";
import EventNavigation from "~/components/events/header/EventNavigation";
import { IParticipant } from "~/lib/registrations/types/IParticipant";
import { useLayout } from "~/lib/shared/context/LayoutContex";
import { getEventHeaderItems } from "~/lib/utils";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { eventCode, sessionId } = params;

  if (!sessionId) {
    throw new Error("Session ID is required");
  }

  const verifiedParticipant = await Api().participant.confirmEmail(sessionId);

  return json({ verifiedParticipant, sessionId });
};

const EventRegistrationConfirmation = () => {
  const { verifiedParticipant, sessionId } = useLoaderData<
    typeof loader
  >() as unknown as {
    verifiedParticipant: IParticipant;
    sessionId: string;
  };
  const [ticketUrl, setTicketUrl] = useState<string | null>(
    verifiedParticipant.ticketUrl || null
  );
  const { setShowNav } = useLayout();

  const {
    mutate: generateTickets,
    isLoading,
    isError,
    error,
  } = useMutation(
    async () => {
      const ticketUrl = await Api().participant.generateTickets(sessionId);
      setTicketUrl(ticketUrl);
    },
    {
      onSuccess: () => {},
      onError: () => {},
      retry: false,
    }
  );

  useEffect(() => {
    setShowNav(false);

    return () => setShowNav(true);
  }, []);

  useEffect(() => {
    // initial ticket generation if not already generated
    if (!verifiedParticipant.ticketUrl) {
      generateTickets();
    }
  }, []);

  return (
    <>
      <AppBar
        user={null}
        NavComponent={EventNavigation}
        navProps={{
          event: verifiedParticipant.event,
          isEventPast: false,
          modalVisible: false,
        }}
        DrawerComponent={EventDrawerMenu}
        drawerProps={{
          items: getEventHeaderItems(verifiedParticipant.event),
          modalVisible: false,
        }}
        className="mb-[45px] md:mb-[84px]"
      />
      <main className="mx-auto max-w-7xl px-3 my-[6%]">
        <div>
          <h1 className="font-extrabold text-2xl lg:text-3xl xl:text-4xl mb-5 lg:mb-8">
            Congratulations!
          </h1>
          <h4 className="text-xl font-bold lg:text-2xl text-red-500 mb-4 lg:mb-6">
            Your Email Confirmed
          </h4>
          <p className="text-lg lg:text-xl font-medium">
            You successfully registered for the competitions{" "}
            <span className="font-bold">
              “{verifiedParticipant.event.title}”
            </span>
            . We looking forward to see you running on our competitions
          </p>
        </div>
        {!isLoading ||
          (!isError && !ticketUrl && (
            <div className="my-6 flex flex-col items-center gap-4 animate-fadeInOut">
              <img
                src="/ticket.svg"
                alt="ticket"
                className="w-32 h-32 md:h-40 md:w-40"
              />
              <p className="text-lg md:text-xl text-center">
                Generating a ticket for you...
                <br />
                Please wait and do not leave or reload the page
              </p>
            </div>
          ))}
        {ticketUrl && (
          <div className="my-3 md:my-6 flex flex-col gap-4">
            <div>
              <a href={ticketUrl} target="_blank">
                <EventButton color="red">Download Ticket</EventButton>
              </a>
              <p className="text-sm text-gray-400 mt-2">
                We will send you an email with copy of this ticket.
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <Info className="text-gray-400" fontSize="large" />
              <p className="text-lg lg:text-xl">
                You have to scan the qr code of tickets when entering the
                stadium
              </p>
            </div>
          </div>
        )}
        {isError && (
          <div className="my-6 flex gap-4 items-center">
            <WarningAmberIcon color="error" fontSize="large" />
            <p className="text-lg md:text-xl font-semibold">
              Error generating ticket. Please try reload the page or contact us:{" "}
              <span className="text-gray-400">info@aba.run</span>
            </p>
          </div>
        )}
        <h4 className="text-xl font-bold lg:text-2xl text-red-500 mb-4 lg:mb-6">
          Your races
        </h4>
        <div className="flex flex-wrap gap-6 xl:gap-8 my-6 xl:my-8">
          {verifiedParticipant.registrations.map((registration) => (
            <div
              key={registration.id}
              className={`rounded-xl bg-[url('/main-page-img.jpg')] relative overflow-hidden w-full md:max-w-[450px] h-72 flex items-end p-7`}
            >
              <div className="bg-black/20 absolute left-0 top-0"></div>
              <h3 className="text-white font-bold text-2xl xl:text-3xl capitalize max-w-4/5">
                {registration.eventRaceType?.raceType?.name}
              </h3>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <main className="mx-auto max-w-7xl px-3 my-[6%] min-h-[70vh]">
      <div>
        <h1 className="font-extrabold text-2xl lg:text-3xl xl:text-4xl mb-3">
          Ops...
        </h1>
        <p className="text-lg md:text-xl font-semibold mb-5">
          An error occurred verifying your email.
        </p>
        <h3 className="font-extrabold text-xl lg:text-2xl mb-2 lg:mb-3">
          Possible reasons and solutions:
        </h3>
        <ul className="list-inside list-disc mb-5">
          <li className="text-lg md:text-xl font-semibold">
            The link has been expired (It is active for 24 hours since your
            registration)
          </li>
          <li className="text-lg md:text-xl font-semibold">
            You already verified your email address
          </li>
          <li className="text-lg md:text-xl font-semibold">
            Please try to reload the page
          </li>
        </ul>
        <h3 className="font-extrabold text-xl lg:text-2xl mb-4 lg:mb-5">
          Contact us
        </h3>
        <p className="text-lg md:text-xl font-semibold">
          You can easily reach us out via email: <br />
          info@aba.run
        </p>
      </div>
    </main>
  );
}

export default EventRegistrationConfirmation;
