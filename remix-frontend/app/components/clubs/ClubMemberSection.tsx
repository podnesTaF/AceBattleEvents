import { Link } from "@remix-run/react";
import React from "react";
import { IUser } from "~/lib/types";

interface ClubMemberSectionProps {
  user: IUser;
}

const ClubMemberSection: React.FC<ClubMemberSectionProps> = ({ user }) => {
  return (
    <div className="w-full my-6 bg-gray-100">
      <div className="max-w-7xl mx-4 xl:mx-auto relative py-6">
        <div className="absolute -top-5 right-0 px-3 py-2 rounded-md bg-red-500">
          <p className="text-lg font-semibold text-white">
            {user.role === "manager" ? "Manager" : "Runner"}
          </p>
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 capitalize">
          Welcome, {user.name} {user.surname}
        </h2>
        <h5 className="font-semibold mb-6 text-xl">
          {user.role === "manager"
            ? "EDIT CLUB INFORMATION AND MEMBERS"
            : "Manage your membership"}
        </h5>
        <div className="flex justify-center w-full mb-6">
          <Link
            to={"/user/settings/club"}
            className="underline text-blue-400 hover:text-blue-600 text-xl md:text-2xl font-semibold"
          >
            {user.role === "manager"
              ? "Open Club Preferences"
              : "Manage Membership"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClubMemberSection;
