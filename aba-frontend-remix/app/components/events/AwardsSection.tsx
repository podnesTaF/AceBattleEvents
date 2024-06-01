import { IPrizeCategory } from "~/lib/events/types/EventBound";
import { IContent } from "~/lib/news/types/INews";
import { TextContent } from "../news";
import { CustomTable } from "../shared";

interface Props {
  categoryAwards: IPrizeCategory[];
  contents: IContent[];
}

const getTableInformation = (categories: IPrizeCategory[]) => {
  return categories.map((c) => {
    return {
      Category: c.name,
      ...c.prizes.reduce(
        (acc, curr) => ({
          ...acc,
          [curr.place]: "€ " + curr.amount,
        }),
        {}
      ),
    };
  });
};

const AwardsSection = ({ categoryAwards, contents }: Props): JSX.Element => {
  return (
    <section className="px-3 lg:px-6 max-w-7xl mx-auto">
      <div className="py-4 border-b-2 border-b-[#333] mb-4">
        <h3 className="text-xl font-semibold lg:text-2xl 2xl:text-3xl text-[#333]">
          Awards
        </h3>
      </div>
      <div className="flex flex-col gap-3">
        {contents?.map((c) => (
          <TextContent text={c.text!} key={c.id} />
        ))}
      </div>
      <p>
        As you know the idea behind Ace Battle Association is to make the
        running not only fun, but also profitable for atheletes. Every event in
        Ace Battle is powered with awards and prizes for every category.
      </p>
      <div className="my-4">
        <CustomTable
          rows={getTableInformation(categoryAwards)}
          isLoading={false}
          isTitleStraight={true}
        />
      </div>
    </section>
  );
};

export default AwardsSection;
