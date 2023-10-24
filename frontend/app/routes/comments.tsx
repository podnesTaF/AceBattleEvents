import { Fade } from "@mui/material";
import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Api } from "~/api/axiosInstance";
import { FeedbackCard, FeedbackForm } from "~/components/comments";
import { IFeedback } from "~/lib/types";
import { authenticator } from "~/lib/utils";

const tabs = ["Competitors", "Spectators"];

export const loader = async ({ request }: LoaderArgs) => {
  const user = await authenticator.isAuthenticated(request);

  return json({ user });
};

const CommentsPage = () => {
  const { user } = useLoaderData<typeof loader>();

  const [isVisible, setIsVisible] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [feedbacks, setFeedbacks] = useState<IFeedback[]>([]);

  useEffect(() => {
    setIsVisible(true);
    (async () => {
      const feedbacksData = await Api().feedback.getApprovedFeedbacks(
        `type=${activeTab === 0 ? "runner" : "spectator"}&page=1`
      );
      if (!feedbacksData) return;

      setFeedbacks(feedbacksData?.feedbacks);
    })();
  }, [activeTab]);

  const onChangeTab = (tab: number) => {
    setIsVisible(false);
    setTimeout(() => {
      setIsVisible(true);
      setActiveTab(tab);
    }, 200);
  };

  return (
    <>
      <Fade in={isVisible} timeout={200} easing={"ease-in"}>
        <div className="h-screen-join bg-[url('/comments.jpg')] bg-no-repeat bg-cover bg-center relative w-full overflow-hidden flex items-center">
          <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.4)] z-0"></div>
          <div className="ml-4 sm:ml-6 lg:ml-[10%] z-10">
            <h3 className="text-2xl md:text-3xl font-semibold text-white mb-6">
              Feedback & Reviews
            </h3>
            <div className="flex flex-col gap-5">
              {tabs.map((tab, index) => (
                <h2
                  key={index}
                  onClick={onChangeTab.bind(null, index)}
                  className={`${
                    activeTab === index
                      ? "text-4xl md:text-6xl font-semibold text-white pb-1"
                      : "text-gray-500 text-2xl md:text-4xl font-semibold"
                  } cursor-pointer hover:opacity-80 transition-all
                    `}
                >
                  {tab}
                </h2>
              ))}
            </div>
          </div>
          <div className="hidden lg:flex absolute right-0 bottom-1/2 lg:w-2/5 xl:w-1/2 translate-y-1/2 max-w-4xl bg-[#1E1C1F]/90 items-center justify-end">
            <div className="w-full m-[10%]">
              <FeedbackForm user={user} />
            </div>
          </div>
        </div>
      </Fade>
      <main className="my-4 max-w-7xl mx-4 xl:mx-auto">
        <div className="w-full border-b-[1px] border-black py-2 mb-6">
          <h3 className="text-xl lg:text-2xl font-semibold">
            {tabs[activeTab] === "Competitors" ? "Athletes" : "Spectators"}{" "}
            Feedback
          </h3>
        </div>
        <div className="flex justify-around gap-8 flex-wrap">
          {feedbacks.map((comment, index) => (
            <FeedbackCard feedback={comment} key={comment.id} index={index} />
          ))}
        </div>
      </main>
    </>
  );
};

export default CommentsPage;
