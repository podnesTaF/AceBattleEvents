import { Link, useNavigate } from "@remix-run/react";
import React from "react";
import { IClub } from "~/lib/types";

interface ClubCardProps {
  club: IClub;
}

const ClubCard: React.FC<ClubCardProps> = ({ club }) => {
  const navigate = useNavigate();
  return (
    <div className={`w-full border-[1px] border-gray-300 p-3`}>
      <div className="flex items-center gap-4 mb-2">
        {club.country?.flagIconUrl && (
          <img
            src={club.country.flagIconUrl}
            alt={"flag"}
            width={60}
            height={40}
          />
        )}
        <h4 className="text-2xl font-semibold">{club.name}</h4>
      </div>
      <div className="w-full h-1 rounded-md bg-red-500"></div>
      <div className="mt-2 flex w-full gap-4">
        <div className="flex flex-col gap-2 w-1/2">
          <div>
            <p className="text-lg pb-1 border-b-1 border-red-500">Teams:</p>
            <div className="my-1">
              {club.teams?.length ? (
                club.teams.map((team) => (
                  <div key={team.id} className="mb-2">
                    <Link
                      to={`/teams/${team.id}`}
                      className="text-xl font-semibold underline"
                    >
                      {team.name}
                    </Link>
                  </div>
                ))
              ) : (
                <h4 className="text-xl font-semibold">
                  Club doen&apos;t have any teams yet
                </h4>
              )}
            </div>
          </div>
          <div>
            <p className="text-lg mb-1">Coach:</p>
            <h4 className="text-xl font-semibold">Vitaliy Sabulyak</h4>
          </div>
          <div className="mb-4">
            <p className="text-lg mb-1">Location:</p>
            <h4 className="text-xl font-semibold">
              {club.country?.name}, {club.city}
            </h4>
          </div>
          <button
            onClick={() => navigate("/clubs/" + club.id)}
            className="w-full bg-yellow-300 hover:bg-yellow-600 active:scale-95 font-semibold py-4 rounded-md"
          >
            Club&apos;s page
          </button>
        </div>
        <div className="w-1/2 flex items-center">
          <img
            src={
              club.logo?.mediaUrl ||
              "https://storage.googleapis.com/abe_cloud_storage/image/large/c4bccba0-3f80-4eb5-b50f-63e5cd4f0100.jpg"
            }
            alt={"club"}
            width={250}
            height={250}
            className="w-full max-h-[300px] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default ClubCard;
