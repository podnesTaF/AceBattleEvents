import { IRunner } from "~/lib/types";
import { RunnersRankingCard } from "./RunnersRankingCard";

interface Props {
  topRunners: {
    male: IRunner[];
    female: IRunner[];
  };
}

export const RankingSection = ({ topRunners }: Props) => {
  return (
    <div className="bg-[#1E1C1F] py-8 px-5 lg:py-12">
      <h3 className="text-2xl sm:text-3xl lg:text-4xl text-white mb-8 lg:mb-12 text-center font-semibold">
        Ranking
      </h3>
      <div className="max-w-7xl mx-auto flex flex-col gap-12 md:flex-row">
        {Object.keys(topRunners).map((gender: any) => (
          <RunnersRankingCard
            key={gender}
            gender={gender}
            runners={(topRunners as any)[gender]}
          />
        ))}
      </div>
    </div>
  );
};
