import { VideoItem } from "@/src/shared/ui";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Image from "next/image";
const cards = [
  {
    iconUrl: "https://aba.run/wp-content/uploads/2020/10/advant-1.svg",
    title: "Fun",
    description:
      "This explosive combination of running activity with a real game will open running for each of us in a new way!",
  },
  {
    iconUrl: "https://aba.run/wp-content/uploads/2020/10/advant-2.svg",
    title: "Social",
    description:
      "Running game is available to everyone! Haven't you gone for a run yet? In the company of friends and like-minded people it will be easier!",
  },
  {
    iconUrl: "https://aba.run/wp-content/uploads/2020/10/advant-3.svg",
    title: "Competitive",
    description: "Only 1609 meters and you are the Champion!",
  },
];

export const AboutArticle = () => {
  return (
    <div className="max-w-5xl mx-4 lg:mx-auto mt-5 mb-8">
      <h2 className="text-2xl md:text-4xl mb-6 font-semibold">
        About ACE BATTLE MILE
      </h2>
      <Image
        src="https://storage.googleapis.com/abe_cloud_storage/image/large/0aa36171-6549-4264-a512-6be7fd87ada0.jpeg"
        alt="about image"
        width={980}
        height={620}
        className="object-cover w-full max-w-4xl mb-5"
      />
      <div className="flex gap-0 md:gap-5 flex-wrap w-full mb-5">
        <div className="flex flex-col gap-4 w-1/2 sm:w-1/3 md:w-1/4 pr-4 md:mr-0">
          <h3 className="text-4xl font-semibold">4</h3>
          <div className="w-full bg-[#1E1C1F] px-4 py-1">
            <p className="text-white text-xl">Countries</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-1/2 sm:w-1/3 md:w-1/4 pr-4 md:mr-0">
          <h3 className="text-4xl font-semibold">500+</h3>
          <div className="w-full bg-[#1E1C1F] px-4 py-1">
            <p className="text-white text-xl">Athletes</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-1/2 sm:w-1/3 md:w-1/4 pr-4 md:mr-0">
          <h3 className="text-4xl font-semibold">12</h3>
          <div className="w-full bg-[#1E1C1F] px-4 py-1">
            <p className="text-white text-xl">Categories</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-1/2 sm:w-1/3 md:w-1/4">
          <h3 className="text-4xl font-semibold">15+</h3>
          <div className="w-full bg-[#1E1C1F] px-4 py-1">
            <p className="text-white text-xl">Competitions</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full gap-6 md:gap-8">
        <p>
          <strong>
            <em>ACE Battle Mile… </em>
          </strong>
          Lately, these words have often started to sound in running circles. At
          the same time, these same words raise a lot of questions: where did
          this “Mile” come from, how does it work and who is the “Joker” in the
          distance that everyone is talking about? In fact, the idea and history
          of ACE Battle Mile is really worth a look. So, below we offer an
          analysis of the main questions that may arise for the average runner
          in this discipline.
        </p>

        <div className="flex flex-col gap-4 w-full">
          <h3 className="text-2xl font-semibold">Specifics</h3>
          <p>
            The main feature of the competition is{" "}
            <strong>the team result</strong> and the presence of a person who
            can dramatically change the course of events. Therefore, teams can
            use different approaches to team forming, build their tactics during
            the race and change it depending on the situation.
          </p>
          <p>
            <strong>Monetary rewards</strong>. For the organizers, one of the
            most important point is the development of professional running. To
            popularize and encourage athletes, ACE Battle Mile set prizes for
            the teams, and interestingly - for their coaches as well.
          </p>
          <p>
            This is <strong>a purely Ukrainian product</strong> that has no
            analogues in the world. Despite the fact that the mile is quite a
            popular athletics discipline, to run it as a team with a joker,
            while no one tried.
          </p>
        </div>
        <h3 className="text-2xl font-semibold">Prospect</h3>
        <p>
          <em>
            “We plan to establish a series of starts, leagues and not only
            national but also international, - said Iurii Pidnebesny, president
            of ACE Battle Mile, - therefore, the determining of leaders in
            personal results is key, both to stimulate the growth of results and
            to form the national team of Ukraine in team running to participate
            in international tournaments.”
          </em>
        </p>
        <div className="flex flex-col w-full gap-4">
          <h3 className="text-2xl font-semibold">The governing body</h3>
          <h4 className="text-xl">ACE BATTLE ASSOCIATION</h4>
          <p>Siege social: 2 rue Leon Hengen, L-1745 Luxembourg</p>
          <p>Numero RCS F13868</p>
          <p>
            Statute in French please load hear:{" "}
            <a
              className="font-semibold text-black"
              download
              target="_blank"
              href="https://aba.run/wp-content/uploads/2023/09/statuts_aba_rcs_230831_112310.pdf"
            >
              STATUTS_ABA_RCS_230831_112310
            </a>
          </p>
        </div>
        <div className="w-full bg-[#1E1C1F] py-6 md:py-8 px-4 md:px-6">
          <div className="flex flex-col w-full gap-8">
            {cards.map((card, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex justify-center w-20 items-start flex-shrink-0">
                  <Image
                    src={card.iconUrl}
                    width={40}
                    height={40}
                    alt="world"
                  />
                </div>
                <div className="flex flex-col gap-4 text-white">
                  <h4 className="font-semibold text-xl">{card.title}</h4>
                  <p className="font-light">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-semibold mb-5">Feedback</h3>
          <p>
            <em>
              &quot;This is something so new, just a breath of fresh air against
              the background of the official start - it gives us the opportunity
              to relax, to give free rein to emotions. It is at such
              competitions that you have the opportunity to smile, show
              yourself, your personality,&quot; - said Oleksandr Karpenko, the
              fastest participant in the Winter Battle Mile.
            </em>
          </p>
          <p>
            <em>
              &quot;It&apos;s a really great start. If you compare the emotions
              and impressions of the Championship of Ukraine, although it is a
              larger start, and Battle Mile, then honestly, I got more pleasure
              from the last, more emotions. Although there were not many
              spectators, you felt this support on every lap, on every
              meter,&quot; - said Yulia Moroz, the winner of the Winter Battle
              Mile and the winner of the Rating Mile.
            </em>
          </p>
          <p>
            <em>
              &quot;I love it! To be honest, I always liked to run relays,
              although I specialized in medium distances, but I was always put
              to run relays. And I think why in my time there was no such level
              of competition, well, because it&apos;s very cool. Here you can
              develop very far, attract the elite, make competitions
              international. It&apos;s so spectacular, beautiful, dynamic -
              it&apos;s a new format that we lacked,” - said Iryna Lishchynska,
              a silver medalist at the Olympic Games and the World
              Championships.
            </em>
          </p>
          <p>
            In the end, as smart people say: you can tell a lot, but it&apos;s
            better to see once! Below is a video about Battle Mile Structure and
            Rules!
          </p>
          <div className="w-full md:w-1/2 border-b-4 rounded-bl-2xl border-red-500 shadow-md">
            <VideoItem
              videoId="WSUfPBJf_P4"
              title="What's Battle Mile Structure and Rules"
            />
          </div>
          <div className="flex flex-row mx-4">
            <div className="flex flex-row pr-4">
              <h3 className="text-xl font-semibold pt-3">SHARE:</h3>
            </div>
            <div className="flex flex-row gap-4 mb-4 bg-black p-2">
              <div className="bg-white rounded-full p-2">
                <a href="https://www.youtube.com/">
                  <YouTubeIcon />
                </a>
              </div>
              <div className="bg-white rounded-full p-2">
                <a href="https://www.instagram.com/">
                  <InstagramIcon />
                </a>
              </div>
              <div className="bg-white rounded-full p-2">
                <a href="https://www.facebook.com/">
                  <FacebookIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutArticle;
