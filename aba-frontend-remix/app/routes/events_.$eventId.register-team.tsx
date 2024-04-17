import { useEffect, useState } from "react";

import { Checkbox, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { red } from "@mui/material/colors";
import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData, useLocation, useNavigate } from "@remix-run/react";
import { Api } from "~/api/axiosInstance";
import { NoTeams, StatusCard, TeamCard } from "~/components";
import { ITeam } from "~/lib/types";
import { authenticator, formatDate } from "~/lib/utils";

export const loader = async ({ params, request }: LoaderArgs) => {
  const { eventId } = params;
  const event = await Api().events.getEvent(eventId || "");
  const user = await authenticator.isAuthenticated(request);
  const teams = await Api(user?.token).teams.findMyTeams();

  if (!user) {
    throw new Response("User not found.", {
      status: 404,
    });
  }

  if (!event) {
    throw new Response("Event not found.", {
      status: 404,
    });
  }

  if (!teams) {
    throw new Response("Teams not found.", {
      status: 404,
    });
  }

  return json({ event, teams, user });
};

const RegisterTeamIndex = () => {
  const { event, teams, user } = useLoaderData<typeof loader>();

  const [teamId, setTeamId] = useState(0);
  const [choosenTeam, setChoosenTeam] = useState<ITeam | null>(null);
  const [status, setStatus] = useState("");
  const [activeTab, setActiveTab] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  const handleCancel = () => {
    setActiveTab(0);
    navigate(`/events/${event.eventCode}`);
  };

  useEffect(() => {
    if (teamId > 0) {
      setChoosenTeam(teams?.find((team: any) => team.id === teamId) || null);
    }
  }, [teamId]);

  const handleRegisterTeam = async () => {
    if (!user) return;
    if (teamId > 0 && event?.id) {
      try {
        await onSuccessRegister(123);
        setStatus("success");
      } catch (error) {
        setStatus("error");
      }
    }
  };

  const onSuccessRegister = async (tx: any) => {
    if (!user || !event?.id) return;
    await Api(user.token).teams.registerTeam({
      teamId: +teamId,
      eventId: +event.id,
      txHash: "123",
      wallet: "123",
    });
  };

  useEffect(() => {
    if (teamId > 0) {
      setChoosenTeam(teams?.find((team: any) => team.id === teamId) || null);
    }
  }, [teamId]);

  if (status === "success" || status === "error") {
    return (
      <div className="w-full">
        <div className="w-full flex justify-center items-center relative h-40 md:h-60 bg-[url('/register-team-sm.jpg')] md:bg-[url('/register-team-lg.jpg')] bg-cover bg-center">
          <div className="absolute left-0 top-0 h-full w-full bg-black/40"></div>
          <h2 className="text-3xl md:text-4xl text-white z-10 uppercase font-semibold">
            Register Team
          </h2>
        </div>
        <StatusCard
          status={status}
          eventId={event.id}
          eventCode={event.eventCode}
        />
      </div>
    );
  }
  return (
    <div className="w-full">
      <div className="w-full flex justify-center items-center relative h-40 md:h-60 bg-[url('/register-team-sm.jpg')] md:bg-[url('/register-team-lg.jpg')] bg-cover bg-center">
        <div className="absolute left-0 top-0 h-full w-full bg-black/40"></div>
        <h2 className="text-3xl md:text-4xl text-white z-10 uppercase font-semibold">
          Register Team
        </h2>
      </div>
      {activeTab === 0 &&
        (teams && teams.length === 0 ? (
          <div className="w-full min-h-[50vh] relative">
            <img
              src={"/running.svg"}
              width={400}
              height={450}
              alt="running group"
              className="absolute bottom-10 left-10 -z-10 max-w-[300px] sm:max-w-none"
            />
            <h3 className="text-3xl md:text-4xl font-semibold mt-5 text-center">
              Choose team to register
            </h3>
            <NoTeams url={location.pathname} />
          </div>
        ) : (
          <div className="w-full max-w-6xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-semibold mt-5 text-center">
              Choose team to register
            </h3>
            <RadioGroup
              className="flex flex-col gap-5 my-4 mx-4 lg:mx-0"
              value={teamId}
              onChange={(e) => setTeamId(+e.target.value)}
            >
              {teams?.map((team: ITeam) => (
                <FormControlLabel
                  key={team.id}
                  value={team.id}
                  name="teamId"
                  control={<Radio />}
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      maxWidth: "400px",
                      width: "80vw",
                      "@media (min-width: 640px)": {
                        width: "100%",
                        maxWidth: "none",
                      },
                    },
                  }}
                  label={<TeamCard team={team} />}
                />
              ))}
            </RadioGroup>

            <div className="flex justify-end w-full">
              <button
                onClick={() => setActiveTab(1)}
                disabled={teamId < 1}
                className="bg-red-700 text-white px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Checkout
              </button>
            </div>
          </div>
        ))}
      {activeTab === 1 && (
        <div className="w-full h-full min-h-screen flex justify-center items-center relative my-5">
          <img
            src={"/running.svg"}
            width={500}
            height={600}
            alt="running group"
            className="absolute bottom-10 left-10 -z-10 max-w-[350px] sm:max-w-none"
          />
          <div className="w-full max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold my-4 uppercase text-center">
              Checkout
            </h2>
            <div className="py-2 px-3 md:py-4 md:px-5 rounded-md shadow-md bg-white/50 mx-4 md:mx-0">
              <div className="flex flex-col sm:flex-row w-full sm:justify-between gap-3 my-3">
                <p>Registration for event:</p>
                <p className="font-semibold w-full text-center md:w-auto md:text-start">
                  {event?.title || "Event Name"}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row w-full sm:justify-between gap-3 my-3">
                <p>Date:</p>
                <p className="font-semibold w-full text-center md:w-auto md:text-start">
                  {(event && formatDate(event.startDateTime)) || "Event Date"}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row w-full sm:justify-between gap-3 my-3">
                <p>Location:</p>
                <p className="font-semibold w-full text-center md:w-auto md:text-start">
                  {`${event?.location.city}, ${event?.location.country.name}` ||
                    "Event Location"}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row w-full sm:justify-between gap-3 my-3">
                <p>Team to Register:</p>
                <p className="font-semibold w-full text-center md:w-auto md:text-start">
                  {choosenTeam?.name || "Team Name"}
                </p>
              </div>

              <div className="my-3">
                <FormControlLabel
                  label="I agree this policies and agreements"
                  control={
                    <Checkbox
                      name="agreement"
                      sx={{
                        color: red[500],
                        "&.Mui-checked": {
                          color: red[700],
                        },
                      }}
                    />
                  }
                />
              </div>
              <div className="flex justify-between">
                <button
                  onClick={handleCancel}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-500 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRegisterTeam}
                  className="hover:bg-slate-800 bg-black text-white font-bold py-2 px-4 border border-slate-800 rounded disabled:opacity-80 disabled:cursor-not-allowed"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterTeamIndex;
