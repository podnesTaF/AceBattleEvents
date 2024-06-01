import { Link } from "@remix-run/react";
import { useState } from "react";
import { IClub, JoinRequest } from "~/lib/clubs/types";
import { IUser } from "~/lib/user/types/IUser";
import AgreeCheck from "../shared/forms/AgreeCheck";
import FormButton from "../shared/forms/FormButton";
import ClubMemberSection from "./ClubMemberSection";

interface Props {
  club: IClub;
  user: IUser | null;
  onSubmit: (
    motivation: string,
    clubId: number,
    checkValue: boolean
  ) => Promise<JoinRequest | undefined>;
}

const JoinClubForm: React.FC<Props> = ({ club, user, onSubmit }) => {
  const [joinMotivation, setJoinMotivation] = useState("");
  const [checkValue, setCheckValue] = useState(false);

  const onSubmitHandler = async () => {
    const joinRequest = await onSubmit(joinMotivation, club.id, checkValue);
    if (joinRequest) {
      setJoinMotivation("");
      setCheckValue(false);
    }
  };
  return (
    <section className="my-16 w-full">
      {user?.club?.id === club.id ? (
        <ClubMemberSection user={user} />
      ) : (
        <div className="max-w-6xl mx-4 lg:mx-auto flex flex-col md:flex-row justify-between items-center gap-5">
          <div className="w-full md:w-2/5 flex flex-col gap-5">
            <h2 className="text-2xl font-semibold mb-3">
              Join &quot;{club.name}&quot; right now
            </h2>
            <p className="mb-4">
              Fill in an application letter. It will be sent to club&apos;s
              manager / coach. After their approval you become a club of &quot;
              {club.name}&quot;.
            </p>
            <h4 className="text-lg font-semibold underline">
              What does it mean to become a club member?
            </h4>
          </div>
          <div className="w-full md:w-2/5">
            <div className="flex flex-col gap-3">
              <label htmlFor="motivation" className="text-xl font-semibold">
                Your motivation*
              </label>
              <textarea
                id="motivation"
                value={joinMotivation}
                onChange={(e) => setJoinMotivation(e.target.value)}
                rows={5}
                className="w-full border-[1px] border-gray-300 rounded-md p-2"
                placeholder="Write your motivation to become the club member (min 10 words)..."
              ></textarea>
              <AgreeCheck
                checked={checkValue}
                onChange={setCheckValue}
                message="I agree with rules and terms of club membership"
              />
              {user ? (
                <FormButton
                  isLoading={false}
                  title={"Send an application"}
                  onClick={onSubmitHandler}
                />
              ) : (
                <Link
                  to={"/auth/login"}
                  className="w-full text-center text-2xl font-semibold text-green-500"
                >
                  Authorize to send a join request
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default JoinClubForm;
