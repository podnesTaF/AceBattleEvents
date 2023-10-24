import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { IconButton } from "@mui/material";
import { useLocation, useNavigate } from "@remix-run/react";
import React, { useState } from "react";
import { Api } from "~/api/axiosInstance";
import { IUser } from "~/lib/types";
import { formatDate, getCategoryByDoB } from "~/lib/utils";
import ChangeImageForm from "./ChangeImageForm";

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
  const location = useLocation();

  const onAddProfileImage = async (dto: any) => {
    if (!dto || !user) return;
    try {
      await Api(token).users.updateImage(dto.id);
      navigate(location.pathname, { replace: true });
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
      <header className="w-full my-4">
        <div className="flex flex-col md:flex-row relative pt-6 md:pt-0">
          <img
            src="/profile-bg-lg.jpg"
            alt="profile bg image"
            className="hidden md:flex absolute left-0 top-0 h-1/2 w-full object-cover"
          />
          <div className="flex flex-col md:flex-row w-full max-w-7xl px-4 xl:mx-auto xl:px-0 justify-between md:items-end gap-7">
            <div className="relative w-full md:w-auto flex justify-center mt-4 md:mt-[7%]">
              <div className="relative">
                <img
                  src={
                    user?.image?.mediaUrl ||
                    "https://storage.googleapis.com/abe_cloud_storage/image/large/c4bccba0-3f80-4eb5-b50f-63e5cd4f0100.jpg"
                  }
                  alt="profile"
                  className="rounded object-cover w-[300px] h-[300px] md:w-[260px] md:h-[260px]"
                  width={300}
                  height={300}
                />
                {isMe && (
                  <div className="flex justify-center items-center absolute bottom-2 right-2">
                    <IconButton
                      onClick={() => setEditImageDialogOpen(true)}
                      sx={{
                        backgroundColor: "#fff",
                        opacity: 0.8,
                      }}
                      size="large"
                    >
                      <AddPhotoAlternateIcon fontSize="large" />
                    </IconButton>
                  </div>
                )}
              </div>
              <div className="absolute -top-6 px-5 py-1 bg-red-700 rounded-md left-1/2 -translate-x-1/2">
                <p className="text-white text-xl font-semibold">{user.role}</p>
              </div>
            </div>
            <div className="flex-1 w-full flex gap-5 justify-between self-end">
              <div className="flex-1 md:mt-6">
                <h3 className="text-2xl md:text-3xl font-semibold mb-5">
                  {user.name} {user.surname}
                </h3>
                <div className="flex gap-2 items-center mb-5">
                  {user.country.flagIconUrl && (
                    <img src={user.country.flagIconUrl} alt="flag" width={40} />
                  )}
                  <p className="font-semibold text-xl text-gray-400">
                    {user.city}, {user.country?.name}
                  </p>
                </div>
                {user.runner && (
                  <p className="font-semibold text-xl">
                    {formatDate(user.runner.dateOfBirth, false)} |{" "}
                    {getCategoryByDoB(user.runner.dateOfBirth)}
                  </p>
                )}
              </div>
              {user.runner && (
                <div className="w-auto flex flex-col items-center justify-end">
                  <div className="rounded-full w-16 h-16 md:w-24 md:h-24 border-green-400 border-4 bg-green-400/50 flex justify-center items-center mb-4">
                    <h3 className="font-semibold text-2xl md:text-3xl">
                      {user.runner.rank && user.runner.rank < 9000
                        ? user.runner.rank
                        : "-"}
                    </h3>
                  </div>
                  <p className="font-semibold text-xl">
                    {user.runner.gender === "male"
                      ? "Men's ranking"
                      : "Women's ranking"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      {token && (
        <ChangeImageForm
          token={token}
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

{
  /* <>
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
                {user.role === "runner" && (
                  <h3 className="text-xl md:text-2xl font-semibold mb-2 mt-4">
                    {getCategoryByDoB(user.runner?.dateOfBirth)}
                  </h3>
                )}
                <p className="text-xl font-semibold">
                  {user.role &&
                  user.role !== "spectator" &&
                  (user as any)[user.role].club ? (
                    <Link
                      to={`/clubs/${(user as any)[user.role].club.id}`}
                      className="text-blue-400 hover:underline"
                    >
                      {(user as any)[user.role].club.name}
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
          {user.runner && (
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
                  <p className="font-semibold">{user.runner.rank || "-"}</p>
                </div>
                <div className="flex justify-between gap-4">
                  <p className="font-semibold">Personal Mile Best:</p>
                  <p className="font-semibold">
                    {msToMinutesAndSeconds(
                      user.runner.personalBests?.find(
                        (pb) => pb.distance === 160934
                      )?.finalResultInMs
                    ) || "-"}
                  </p>
                </div>
                <div className="flex justify-between gap-4">
                  <p className="font-semibold">Finished Races:</p>
                  <p className="font-semibold">
                    {user.runner.results?.length || 0}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
      {token && (
        <ChangeImageForm
          token={token}
          successCallback={onAddProfileImage}
          setEditImageDialogOpen={setEditImageDialogOpen}
          editImageDialogOpen={editImageDialogOpen}
          onClose={onCloseDialog}
        />
      )}
    </> */
}
