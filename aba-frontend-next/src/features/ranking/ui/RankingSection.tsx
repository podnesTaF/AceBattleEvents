import { RunnersRankingCard } from ".";

interface Runner {
  id: number;
  rank: number;
  firstName: string;
  lastName: string;
  imageUrl: string; // URL to the runner's image
  country: string;
  team: string;
  dateOfBirh: string; // Note: There's a typo here, should be "dateOfBirth"
}

const maleFirstNames = [
  "John",
  "Michael",
  "David",
  "James",
  "Robert",
  "William",
  "Joseph",
  "Charles",
  "Thomas",
  "Christopher",
];
const femaleFirstNames = [
  "Mary",
  "Jennifer",
  "Linda",
  "Elizabeth",
  "Susan",
  "Jessica",
  "Sarah",
  "Karen",
  "Nancy",
  "Lisa",
];
const lastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Miller",
  "Davis",
  "Garcia",
  "Rodriguez",
  "Wilson",
];

// Function to generate random runners
const generateRunners = (gender: "male" | "female"): Runner[] => {
  const firstNames = gender === "male" ? maleFirstNames : femaleFirstNames;
  return Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    rank: index + 1,
    firstName: firstNames[index],
    lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
    imageUrl: `https://placeimg.com/640/480/people/${index}`, // Placeholder image, consider replacing with actual image URLs
    country: "USA",
    team: `${gender === "male" ? "Team USA" : "Team World"}`,
    dateOfBirh: `0${Math.floor(Math.random() * 9) + 1}.0${
      Math.floor(Math.random() * 9) + 1
    }.${Math.floor(Math.random() * 30) + 1980}`,
  }));
};

const runners: { [key: string]: Runner[] } = {
  male: generateRunners("male"),
  female: generateRunners("female"),
};

export const RankingSection = () => {
  return (
    <div className="bg-[#333] py-8 px-5 lg:py-12">
      <h3 className="text-2xl sm:text-3xl lg:text-4xl text-white mb-8 lg:mb-12 text-center">
        Ranking
      </h3>
      <div className="max-w-7xl mx-auto flex flex-col gap-12 md:flex-row">
        {Object.keys(runners).map((gender) => (
          <RunnersRankingCard
            key={gender}
            gender={gender}
            runners={runners[gender]}
          />
        ))}
      </div>
    </div>
  );
};
