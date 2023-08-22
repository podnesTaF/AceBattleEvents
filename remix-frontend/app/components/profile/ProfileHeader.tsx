import { Link } from "@remix-run/react";
import React, { useState } from "react";
import { IUser } from "~/lib/types";
import { getCategoryByDoB, isAbleToInvite, isAbleToJoin } from "~/lib/utils";
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
            <div className="md:ml-10 flex flex-col md:h-full mt-5 md:mt-0">
              <div className="flex-1">
                <h3 className="text-3xl md:text-4xl font-semibold">
                  {user.name} <br />
                  {user.surname}
                </h3>
              </div>
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
          {isAbleToJoin(user) && isAbleToInvite(authedUser) && (
            <div className="flex items-start">
              <button className="w-full mt-4 md:w-auto md:mt-0 bg-blue-400 hover:bg-blue-300 rounded-md active:scale-95 text-white font-semibold px-4 py-2">
                Invite to club
              </button>
            </div>
          )}
        </div>
      </header>
      {token && (
        <ChangeImageForm
          setEditImageDialogOpen={setEditImageDialogOpen}
          editImageDialogOpen={editImageDialogOpen}
          user={user}
          token={token}
        />
      )}
    </>
  );
};

export default ProfileHeader;
