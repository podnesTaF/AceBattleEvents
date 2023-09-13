import { Link } from "@remix-run/react";
import React from "react";
import { ClubStatistics, CustomTable, Pagination } from "~/components";
import { IClub } from "~/lib/types";
import { transformIntoMembers } from "~/lib/utils";
import ClubPreview from "./ClubPreview";

interface MyClubProps {
  club: IClub;
}

const MyClub: React.FC<MyClubProps> = ({ club }) => {
  return (
    <div className="w-full">
      <ClubPreview club={club} />
      <ClubStatistics club={club} />
      <section className="m-4">
        <h4 className="text-xl font-semibold mb-5">Club Atheletes</h4>
        <div className="px-4 mb-4 w-full">
          <CustomTable
            itemsName="athletes"
            rows={transformIntoMembers(
              club.members.filter((m) => m.role === "runner")
            )}
            isLoading={false}
            titleColor="bg-black"
            isTitleStraight={true}
          />
          <div className="flex justify-center mt-4">
            <Pagination onChangePage={() => {}} currPage={1} pagesCount={1} />
          </div>
        </div>
      </section>
      <section className="my-5 mx-4">
        <h4 className="text-xl font-semibold mb-5">
          EDIT CLUB INFORMATION AND MEMBERS
        </h4>
        <h2 className="text-2xl font-semibold my-4 text-center text-green-300 underline">
          <Link to="/user/settings/club">OPEN CLUB PREFERENCES</Link>
        </h2>
      </section>
    </div>
  );
};

export default MyClub;
