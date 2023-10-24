import { IClub } from "~/lib/types";
import MyClub from "../MyClub";

const MyClubSection = ({ club }: { club?: IClub | null }) => {
  return (
    <>
      {club ? (
        <MyClub club={club} />
      ) : (
        <h3 className="text-2xl">You don't have a club yet</h3>
      )}
    </>
  );
};

export default MyClubSection;
