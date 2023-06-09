"use client";

import EventCard from "@/app/close-events/EventCard";
import AddImageDialog from "@/components/admin/AddImageDialog";
import Pagination from "@/components/shared/Pagination";
import TeamCard from "@/components/shared/TeamCard";
import { IUser } from "@/models/IUser";
import {
  useFetchTeamsByUserIdQuery,
  useGetRegistrationsQuery,
} from "@/services/teamService";
import {
  useFetchMeQuery,
  useUpdateImageMutation,
} from "@/services/userService";
import { Divider, Skeleton } from "@mui/material";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Tab from "./Tab";

const EventSkeleton = dynamic(
  () => import("@/components/events/EventSkeleton")
);

const Profile = () => {
  const [pagesCount, setPageCount] = useState(1);
  const [currPage, setCurrPage] = useState<number>(1);
  const [activeTab, setActiveTab] = useState(0);
  const [editImageDialogOpen, setEditImageDialogOpen] = useState(false);
  const [user, setUser] = useState<IUser>();

  const { data: session, update: updateSession } = useSession();
  const { data: teams, isLoading } = useFetchTeamsByUserIdQuery();
  const { data, isLoading: userLoading } = useFetchMeQuery();
  const { data: registrations, isLoading: regLoading } =
    useGetRegistrationsQuery({ page: currPage, limit: 3 });

  const [updateImage] = useUpdateImageMutation();

  const ref = useRef<HTMLDivElement>(null);

  const form = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  useEffect(() => {
    if (registrations) {
      setPageCount(registrations.totalPages);
    }
  }, [registrations]);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currPage]);

  const changePage = (pageNum: number) => {
    setCurrPage(pageNum);
  };

  const onCloseDialog = (image?: any) => {
    if (image) {
      onAddProfileImage(image);
    }
    setEditImageDialogOpen(false);
  };

  const onAddProfileImage = async (dto: any) => {
    if (!dto || !user) return;
    try {
      await updateImage({ image: dto, userId: user.id });

      setUser((prev: any) => ({
        ...prev,
        image: dto,
      }));
      updateSession({
        ...session,
        user: {
          ...session?.user,
          image: dto.image,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <header className="w-full flex flex-col md:h-[800px] relative">
        <div className="absolute h-64 md:h-full bg-[url('/main-intro.jpg')] bg-fixed left-0 top-0 w-full bg-cover bg-no-repeat bg-top">
          <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.4)] z-0"></div>
        </div>
        <div className="mt-8 mx-auto z-10 h-1/5">
          <h3 className="text-white text-3xl md:text-4xl uppercase font-semibold">
            Personal cabinet
          </h3>
        </div>
        <div className="flex flex-col md:flex-row rounded-lg md:bg-white p-3 md:p-6 mx-auto max-w-5xl w-full md:w-4/5 lg:2/3 z-10">
          <div className="relative w-[300px] rounded-2xl mx-auto">
            {isLoading ? (
              <Skeleton variant={"rectangular"} width={300} height={300} />
            ) : (
              <Image
                src={
                  user?.image?.mediaUrl ||
                  "https://storage.googleapis.com/abe_cloud_storage/image/large/c4bccba0-3f80-4eb5-b50f-63e5cd4f0100.jpg"
                }
                alt="profile"
                className="rounded-2xl object-cover"
                width={300}
                height={300}
              />
            )}
            <div className="absolute -top-4 px-5 py-2 bg-red-700 rounded-md left-1/2 -translate-x-1/2">
              <p className="text-white text-xl font-semibold">manager</p>
            </div>
            <div className="mt-4">
              <button
                onClick={() => setEditImageDialogOpen(true)}
                className="w-full py-2 border-none rounded-md bg-red-500 text-white font-semibold text-xl hover:opacity-95 active:scale-95"
              >
                Edit Avatar
              </button>
            </div>
          </div>
          <div className="flex-1 flex justify-between items-center md:items-start">
            <div className="md:ml-10 flex flex-col md:h-full mt-5 md:mt-0">
              <div className="flex-1">
                {session ? (
                  <h3 className="text-3xl md:text-4xl font-semibold">
                    {session?.user.name} <br />
                    {session?.user.surname}
                  </h3>
                ) : (
                  <Skeleton variant="rectangular" width={100} height={40} />
                )}
              </div>
              <p className="text-xl font-semibold">Club “Muse Run”</p>
              {session ? (
                <p className="text-xl font-semibold text-gray-400">
                  {session?.user.city}|{session?.user.country}
                </p>
              ) : (
                <Skeleton variant="rectangular" width={100} height={40} />
              )}
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-4 xl-auto mt-4 mb-8 md:mx-auto">
        <Divider className="md:hidden" />
        <div className="flex w-full gap-1 md:gap-2 border-b-[1px] border-b-red-500">
          {["Teams", "Registrations", "Last races"].map((title, index) => (
            <Tab
              key={index}
              onClick={() => setActiveTab(index)}
              isActive={index === activeTab}
              title={title}
            />
          ))}
        </div>
        <div className="p-4 md:p-6 border-[1px] border-t-0 border-red-500 rounded-b-lg">
          {activeTab === 0 && (
            <>
              <h2 className="text-3xl font-semibold mb-4 text-center">
                Your teams
              </h2>
              {isLoading &&
                Array.from({ length: 2 }).map((_, idx) => (
                  <TeamCard key={idx} />
                ))}
              {teams && !isLoading ? (
                teams.map((team, idx) => <TeamCard key={team.id} team={team} />)
              ) : (
                <p className="text-center text-xl font-semibold">
                  You don't have teams yet
                  <br />
                </p>
              )}
            </>
          )}
          {activeTab === 1 && (
            <>
              <div className="mx-3 md:mx-5 my-4 p-3 flex justify-center border-b-[1px] w-full">
                <h3 className="text-2xl font-semibold">Your Registrations</h3>
              </div>
              <div className="w-full h-full" ref={ref}>
                {regLoading &&
                  Array.from({ length: 2 }).map((_, idx) => (
                    <EventSkeleton key={idx} />
                  ))}
                {registrations && !isLoading ? (
                  registrations.teamsForEvents.map((reg, idx) => (
                    <EventCard
                      key={idx}
                      isYourRegister={true}
                      event={reg.event}
                      team={reg.team}
                      idx={idx + 1 * (currPage * 3 - 3) + 1}
                    />
                  ))
                ) : (
                  <p className="text-center text-xl font-semibold">
                    You don't have registrations yet
                    <br />
                  </p>
                )}
              </div>
              <div className="flex justify-center">
                <Pagination
                  pagesCount={pagesCount}
                  onChangePage={changePage}
                  currPage={currPage}
                />
              </div>
              <div className="my-4 mx-auto flex flex-col items-center">
                <p className="text-xl my-4">
                  There are lots of events to register your team!
                </p>
                <button className="px-4 py-2 bg-red-500 text-lg sm:text-xl uppercase text-white rounded hover:bg-red-700 drop-shadow-lg active:scale-95">
                  CALENDAR
                </button>
              </div>
            </>
          )}
          {activeTab === 2 && null}
        </div>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onAddProfileImage)}>
            <AddImageDialog
              isOpen={editImageDialogOpen}
              handleClose={onCloseDialog}
              name={"image"}
              instantUpload={true}
              setIntroPreview={() => {}}
            />
          </form>
        </FormProvider>
      </main>
    </>
  );
};

export default Profile;
