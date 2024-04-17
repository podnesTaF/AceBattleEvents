import Image from "next/image";

interface RunnersRankingCardProps {
  gender: string;
  runners: any[];
}

export const RunnersRankingCard = ({
  gender,
  runners,
}: RunnersRankingCardProps): JSX.Element => {
  return (
    <div className="rounded-xl bg-white overflow-hidden w-full">
      <div className="bg-[#EE342C] p-2 md:p-4 lg:p-2 xl:p-4 text-white flex justify-between gap-6">
        <div className="flex flex-col justify-between gap-4">
          <h4 className="font-semibold text-lg lg:text-xl">
            {gender === "male" ? "Men's" : "Women's"} Overall
          </h4>
          <div>
            <h5 className="font-semibold text-lg">Rank</h5>
            <h3 className="text-2xl lg:text-3xl">{runners[0]?.rank}</h3>
          </div>
        </div>
        <div className="flex items-center gap-6 text-end">
          <div className="flex flex-col gap-3">
            <h4 className="text-white text-lg xl:text-xl">
              {runners[0]?.firstName} {runners[0]?.lastName}
            </h4>
            {runners[0]?.team && (
              <p className="text-gray-300 text-sm xl:text-lg">
                {runners[0]?.team}
              </p>
            )}
            {runners[0]?.dateOfBirh && (
              <p className="text-gray-300 text-sm xl:text-lg">
                {runners[0]?.dateOfBirh}
              </p>
            )}
            {runners[0]?.country && (
              <p className="text-gray-500 text-sm xl:text-lg">
                {runners[0]?.country}
              </p>
            )}
          </div>
          {runners[0]?.imageUrl ? (
            <Image
              src={"/logo/abm-logo.png"}
              width={140}
              height={140}
              alt="avatar"
              className="w-24 h-24 xl:w-36 xl:h-36 rounded-full"
            />
          ) : (
            <div className="w-24 h-24 xl:w-36 xl:h-36 rounded-full bg-white">
              <p>
                {runners[0]?.firstName.charAt(0).toUpperCase() +
                  runners[0]?.lastName.charAt(0).toUpperCase()}
              </p>
            </div>
          )}
        </div>
      </div>
      {runners.length > 1 &&
        runners.slice(1).map((runner, index) => (
          <div
            className="flex flex-col sm:flex-row justify-between items-center px-4 py-1 2xl:py-2 border-b border-gray-200"
            key={runner.id}
          >
            <div className="flex gap-4 items-center w-full sm:w-1/2">
              <p>{runner.rank}.</p>
              <Image
                src={"/logo/abm-logo.png"}
                alt="avatar"
                width={40}
                height={40}
                className="w-10 h-10 mr-4 rounded-full"
              />
              <h5>
                {runner.firstName} {runner.lastName}
              </h5>
            </div>
            <div>
              <p>
                {runner.country}, {runner.team}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};
