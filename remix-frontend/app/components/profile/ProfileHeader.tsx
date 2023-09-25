import { Link, useNavigate } from "@remix-run/react";
import React, { useState } from "react";
import { Api } from "~/api/axiosInstance";
import { IUser } from "~/lib/types";
import {
  getCategoryByDoB,
  isAbleToInvite,
  isAbleToJoin,
  msToMinutesAndSeconds,
} from "~/lib/utils";
import { ChangeImageForm } from "..";

interface ProfileHeaderProps {
  user: IUser;
  isMe: boolean;
  token?: string;
  authedUser?: IUser | null;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  user,
  isMe,
  token,
  authedUser,
}) => {
  const [editImageDialogOpen, setEditImageDialogOpen] = useState(false);
  const navigate = useNavigate();

  const onAddProfileImage = async (dto: any) => {
    if (!dto || !user) return;
    try {
      await Api(token).users.updateImage(dto.id);
      navigate(`/profile/${user.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const onCloseDialog = (image?: any) => {
    if (image.title) {
      onAddProfileImage(image);
    }
    setEditImageDialogOpen(false);
  };

  return (
    <>
      <header className="w-full flex flex-col md:h-[800px] relative">
        <div className="absolute h-64 md:h-full bg-[url('/profile-bg-sm.jpg')] md:bg-[url('/profile-bg-lg.jpg')] bg-fixed left-0 top-0 w-full bg-cover bg-no-repeat bg-top">
          <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.4)] z-0"></div>
        </div>
        <div className="mt-8 mx-auto z-10 h-1/5">
          <h3 className="text-white text-3xl md:text-4xl uppercase font-semibold">
            Personal cabinet
          </h3>
        </div>
        <div className="flex flex-col md:flex-row rounded-lg md:bg-white p-3 md:p-6 mx-auto max-w-5xl w-full md:w-4/5 lg:2/3 z-10">
          <div className="relative w-[300px] rounded-2xl mx-auto">
            <img
              src={
                user?.image?.mediaUrl ||
                "https://storage.googleapis.com/abe_cloud_storage/image/large/c4bccba0-3f80-4eb5-b50f-63e5cd4f0100.jpg"
              }
              alt="profile"
              className="rounded-2xl object-cover"
              width={300}
              height={300}
            />
            <div className="absolute -top-4 px-5 py-2 bg-red-700 rounded-md left-1/2 -translate-x-1/2">
              <p className="text-white text-xl font-semibold">{user.role}</p>
            </div>
            {isMe && (
              <div className="mt-4">
                <button
                  onClick={() => setEditImageDialogOpen(true)}
                  className="w-full py-2 border-none rounded-md bg-red-500 text-white font-semibold text-xl hover:opacity-95 active:scale-95"
                >
                  Edit Avatar
                </button>
              </div>
            )}
          </div>
          <div className="flex-1 flex justify-between items-center md:items-start">
            <div className="md:ml-10 flex flex-row justify-between md:flex-col md:h-full mt-5 mb-5 md:mt-0 w-full">
              <div className="flex-1">
                <h3 className="text-3xl md:text-4xl font-semibold">
                  {user.name} <br />
                  {user.surname}
                </h3>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-2 mt-4">
                  {getCategoryByDoB(user.dateOfBirth)}
                </h3>
                <p className="text-xl font-semibold">
                  {user.club ? (
                    <Link
                      to={`/clubs/${user.club.id}`}
                      className="text-blue-400 hover:underline"
                    >
                      {user.club.name}
                    </Link>
                  ) : (
                    "No Club"
                  )}
                </p>
                <p className="text-xl font-semibold text-gray-400">
                  {user.city} | {user.country?.name}
                </p>
              </div>
            </div>
          </div>
          {isAbleToJoin(user) && isAbleToInvite(authedUser) && (
            <div className="flex items-start">
              <button className="w-full mt-4 md:w-auto md:mt-0 bg-blue-400 hover:bg-blue-300 rounded-md active:scale-95 text-white font-semibold px-4 py-2">
                Invite to club
              </button>
            </div>
          )}
          {user.role === "runner" && (
            <div className="w-full md:max-w-xs my-auto border-red-500 border-[1px] shadow-md p-4">
              <div className="flex gap-4 mb-5 items-center">
                <img
                  src="/abm-logo-black.svg"
                  alt="abm logo"
                  width={65}
                  height={50}
                />
                <h3 className="text-xl md:text-2xl font-semibold">
                  Statistics
                </h3>
              </div>
              <div className="w-full flex flex-col gap-4">
                <div className="flex justify-between gap-4">
                  <p className="font-semibold">Overall men&apos;s rank:</p>
                  <p className="font-semibold">{user.rank || "-"}</p>
                </div>
                <div className="flex justify-between gap-4">
                  <p className="font-semibold">Personal Mile Best:</p>
                  <p className="font-semibold">
                    {msToMinutesAndSeconds(
                      user.personalBests?.find((pb) => pb.distance === 160934)
                        ?.finalResultInMs
                    ) || "-"}
                  </p>
                </div>
                <div className="flex justify-between gap-4">
                  <p className="font-semibold">Finished Races:</p>
                  <p className="font-semibold">{user.results?.length || 0}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
      {token && (
        <ChangeImageForm
          successCallback={onAddProfileImage}
          setEditImageDialogOpen={setEditImageDialogOpen}
          editImageDialogOpen={editImageDialogOpen}
          onClose={onCloseDialog}
        />
      )}
    </>
  );
};

export default ProfileHeader;
