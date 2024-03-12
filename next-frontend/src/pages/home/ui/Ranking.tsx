import { NewsCard } from "@/src/entities/News/ui/NewsCard";

const news = [
  {
    id: 1,
    headImageSrc: "/images/paphos.jpg",
    title: "New event in Paphos",
    date: "2024-05-11T10:00:00",
    description: "The next event will take place in Paphos, Cyprus",
  },
  {
    id: 2,
    headImageSrc: "/images/paphos.jpg",
    title: "New event in Paphos",
    date: "2024-05-11T10:00:00",
    description: "The next event will take place in Paphos, Cyprus",
  },
  {
    id: 3,
    headImageSrc: "/images/paphos.jpg",
    title: "New event in Paphos",
    date: "2024-05-11T10:00:00",
    description: "The next event will take place in Paphos, Cyprus",
  },
];

const Ranking = () => {
  return (
    <div className="bg-[#EE342C] py-20 lg:py-32 overflow-hidden">
      <div className="flex flex-col gap-4 md:flex-row md:gap-6 xl:gap-12 w-full justify-between max-w-3xl ml-5 3xl:mx-auto">
        <div className="text-left md:text-right md:flex-1 flex flex-col justify-center">
          <h2 className="text-white text-3xl md:text-4xl xl:text-5xl mb-3">
            Ace Battle Mile
          </h2>
          <h2 className="text-primary text-3xl md:text-4xl xl:text-5xl mb-3">
            Top Ranking
          </h2>
        </div>
        <div className="flex-1 lg:flex-[2] xl:flex-[3] max-w-xl">
          <div className="w-full flex gap-10">
            {news.map((item, index) => (
              <div key={item.id} className="w-2/5">
                <NewsCard
                  headImageSrc={item.headImageSrc}
                  title={item.title}
                  date={item.date}
                  description={item.description}
                  variant={"dark"}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ranking;
