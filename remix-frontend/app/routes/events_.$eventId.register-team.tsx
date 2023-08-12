import { Checkbox, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { red } from "@mui/material/colors";
import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData, useLocation, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Api } from "~/api/axiosInstance";
import NoTeams from "~/components/teams/NoTeams";
import StatusCard from "~/components/teams/StatusCard";
import TeamCard from "~/components/teams/TeamCard";
import { formatDate } from "~/lib/shared/utils/date-formaters";
import { ITeam } from "~/lib/teams/types";

export const loader = async ({ params }: LoaderArgs) => {
  const { eventId } = params;
  const event = await Api().events.getEvent(eventId || "");
  const { teams } = await Api().teams.getTeams({ params: "" });

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

  return json({ event, teams });
};

// export const action = async ({ request, params }: ActionArgs) => {
//   const form = await request.formData();
//   const teamId = form.get("teamId");
//   const agreement = form.get("agreement");
//   const { eventId } = params;

//   console.log(eventId, teamId);
//   if (!teamId || !eventId) {
//     return json({ status: "error" }, { status: 400 });
//   }

//   try {
//     console.log(agreement, teamId, eventId);

//     return json({ status: "success", teamId, eventId });
//   } catch (error) {
//     return json({ status: "success", teamId, eventId });
//   }
// };

const RegisterTeamIndex = () => {
  const { event, teams } = useLoaderData<typeof loader>();

  const [teamId, setTeamId] = useState(0);
  const [choosenTeam, setChoosenTeam] = useState<ITeam | null>(null);
  const [status, setStatus] = useState("");
  const [activeTab, setActiveTab] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  const handleCancel = () => {
    setActiveTab(0);
    navigate(`/events/${event.id}`);
  };

  useEffect(() => {
    if (teamId > 0) {
      setChoosenTeam(teams?.find((team: any) => team.id === teamId) || null);
    }
  }, [teamId]);

  const handleRegisterTeam = async () => {
    // if (!session?.user) return;
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
    // if (!session?.user || !event?.id) return;
    await Api().teams.registerTeam({
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
        <StatusCard status={status} eventId={event.id} />
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
                  {/* <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 mr-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg> */}
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
