"use client";

import NoTeams from "@/components/register-team/NoTeams";
import StatusCard from "@/components/register-team/StatusCard";
import TeamCard from "@/components/shared/TeamCard";
import { abi } from "@/constants";
import { useAppDispatch } from "@/hooks/useTyped";
import { ITeam } from "@/models/ITeam";
import { addBalance } from "@/redux/features/userSlice";
import { useFetchEventQuery } from "@/services/eventService";
import {
  useFetchTeamsByUserIdQuery,
  useRegiterTeamMutation,
} from "@/services/teamService";
import { formatDate } from "@/utils/date-formater";
import { chainAddress } from "@/utils/web3-helpers";
import { Checkbox, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { red } from "@mui/material/colors";
import { ethers } from "ethers";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";

interface RegisterTeamProps {
  params: {
    id: string;
  };
}

const RegisterTeam: React.FC<RegisterTeamProps> = ({ params }) => {
  const [teamId, setTeamId] = useState(0);
  const [choosenTeam, setChoosenTeam] = useState<ITeam | null>(null);
  const [price, setPrice] = useState(0);
  const [status, setStatus] = useState(""); // ["success", "error", "pending"]
  const { data: session, update } = useSession();
  const { data: teams, isLoading, error } = useFetchTeamsByUserIdQuery();
  const [regiterTeam, { data, error: registerError }] =
    useRegiterTeamMutation();

  const { chainId: inHex, account, Moralis } = useMoralis();

  // @ts-ignore
  const runAddress = chainAddress(inHex);

  const dispatch = useAppDispatch();

  const { data: event } = useFetchEventQuery(params.id);

  const [activeTab, setActiveTab] = useState(0);

  const router = useRouter();

  const { runContractFunction: buyRegistration } = useWeb3Contract({
    abi: abi,
    contractAddress: runAddress,
    functionName: "buy",
    params: {
      sender: account,
      date: Date.now(),
      sum: ethers.utils.parseEther(price * 0.01 + "") as any,
      companyAddress: "0x93467db8e687AA59f449D64b5b262691A75F3d10",
    },
  });

  const handleRegisterTeam = async () => {
    if (!session?.user || !account) return;
    if (teamId > 0 && event?.id) {
      try {
        await buyRegistration({
          onSuccess: async () => {
            await onSuccessRegister();
            setStatus("success");
          },
          onError: (error) => {
            console.log(error);
          },
        });

        // if (tx) {
        //   await onSuccessRegister(tx);
        // }
        // @ts-ignore
        // if (!registerError) {

        // } else {
        //   setStatus("error");
        // }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onSuccessRegister = async () => {
    if (!session?.user || !event?.id) return;
    await regiterTeam({ teamId, eventId: event.id });
    dispatch(addBalance(-event?.price || 0));
    update({
      ...session,
      user: {
        ...session.user,
        balance: session.user.balance + -event?.price,
      },
    });
  };

  const id = params.id;

  const handleCancel = () => {
    setActiveTab(0);
    router.push(`/calendar/${id}`);
  };

  useEffect(() => {
    if (teamId > 0) {
      setChoosenTeam(teams?.find((team: any) => team.id === teamId) || null);
    }
  }, [teamId]);

  useEffect(() => {
    if (event?.price) {
      setPrice(event.price);
    }
  }, [event]);

  useEffect(() => {
    Moralis.enableWeb3();
  }, []);

  if (status === "success") {
    return (
      <div className="w-full">
        <div className="w-full flex justify-center items-center relative h-40 md:h-60 bg-[url('/auth-intro.jpg')] bg-cover bg-center">
          <div className="absolute left-0 top-0 h-full w-full bg-black/40"></div>
          <h2 className="text-3xl md:text-4xl text-white z-10 uppercase font-semibold">
            Register Team
          </h2>
        </div>
        <StatusCard
          status={status}
          userId={session?.user.id || "0"}
          eventId={id}
        />
      </div>
    );
  }
  return (
    <div className="w-full">
      <div className="w-full flex justify-center items-center relative h-40 md:h-60 bg-[url('/auth-intro.jpg')] bg-cover bg-center">
        <div className="absolute left-0 top-0 h-full w-full bg-black/40"></div>
        <h2 className="text-3xl md:text-4xl text-white z-10 uppercase font-semibold">
          Register Team
        </h2>
      </div>
      {activeTab === 0 &&
        (teams && teams.length === 0 ? (
          <div className="w-full min-h-[50vh] relative">
            <Image
              src={"/running.svg"}
              width={400}
              height={450}
              alt="running group"
              className="absolute bottom-10 left-10 -z-10 max-w-[300px] sm:max-w-none"
            />
            <h3 className="text-3xl md:text-4xl font-semibold mt-5 text-center">
              Choose team to register
            </h3>
            <NoTeams />
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
          <Image
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
                  {(event && formatDate(event.date)) || "Event Date"}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row w-full sm:justify-between gap-3 my-3">
                <p>Location:</p>
                <p className="font-semibold w-full text-center md:w-auto md:text-start">
                  {`${event?.location.city}, ${event?.location.country}` ||
                    "Event Location"}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row w-full sm:justify-between gap-3 my-3">
                <p>Team to Register:</p>
                <p className="font-semibold w-full text-center md:w-auto md:text-start">
                  {choosenTeam?.name || "Team Name"}
                </p>
              </div>
              <div className="py-2 border-y-[1px] border-red-500">
                <h3 className="text-2xl font-semibold">To pay:</h3>
                <div className="text-end flex flex-col w-full gap-3">
                  <h4 className="font-semibold text-xl">
                    {event?.price} MileCoin
                  </h4>
                  <h4 className="font-semibold text-xl">
                    {event && event.price * 50} euro
                  </h4>
                  <h4 className="font-semibold text-xl">0,28 ether</h4>
                </div>
              </div>
              <div className="py-2">
                <div className="mb-3">
                  <h3 className="text-2xl font-semibold">Your Balance:</h3>
                  <h4 className="font-semibold text-xl text-end">
                    {session?.user?.balance.toFixed(2) || 0} MileCoin
                  </h4>
                </div>
                <div className="mb-3">
                  <h3 className="text-2xl font-semibold">Remaining:</h3>
                  <h4 className="font-semibold text-xl text-end">
                    {session &&
                      event &&
                      (session.user.balance - event.price).toFixed(2)}{" "}
                    MileCoin
                  </h4>
                </div>
              </div>
              <div className="my-3">
                <FormControlLabel
                  label="I agree this policies and agreements"
                  control={
                    <Checkbox
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
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-500 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRegisterTeam}
                  className="hover:bg-slate-800 bg-black text-white font-bold py-2 px-4 border border-slate-800 rounded"
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

export default RegisterTeam;
