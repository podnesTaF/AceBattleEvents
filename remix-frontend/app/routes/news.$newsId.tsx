import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React from "react";
import { Api } from "~/api/axiosInstance";
import { RelatedNewsWrapper } from "~/components";
import { getTimeAgo } from "~/lib/utils";

export const loader = async ({ params }: LoaderArgs) => {
  const { newsId } = params;

  if (!newsId) {
    throw new Response("No newsId provided", { status: 404 });
  }

  const news = await Api().news.getNewsById(newsId);

  if (!news) {
    throw new Response("No news found", { status: 404 });
  }

  return json({ news });
};

const NewsItemPage = () => {
  const { news } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col">
      <div className="relative mb-6 h-48 md:h-56">
        <div className="absolute bg-black/50 h-full top-0 left-0 bottom-0 w-full -z-10"></div>
        <img
          src={news.mainImage?.mediaUrl || "/news-dummy-img.jpg"}
          alt="background pict"
          width={400}
          height={700}
          className="absolute object-cover h-full top-0 right-0 -z-20 md:w-full"
        />
        <h3 className="text-white text-2xl py-4 px-4 md:text-4xl">
          {news.title}
        </h3>
        <p className="text-white text-sm pb-4 px-4 md:text-lg">
          {getTimeAgo("2023-08-19 12:00:00")}
        </p>
      </div>
      <div className="relative flex flex-col lg:flex-row max-w-7xl mx-6 gap-6 xl:mx-auto">
        <div className="w-full lg:w-3/5">
          <div className="flex flex-col w-full gap-6">
            {news.contents.map((item) => (
              <React.Fragment key={item.id}>
                {item.type === "text" ? (
                  <p className="p-4">{item.text}</p>
                ) : (
                  item.type === "image" && (
                    <img
                      src={item.media?.mediaUrl || "/new-dummy-img.jpg"}
                      alt={news.title}
                      width={400}
                      height={200}
                      className="p-4 md:w-auto"
                    />
                  )
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="flex flex-row mx-4 md:flex md:justify-center">
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
        <div className="mb-8 w-full h-fit md:w-1/3 md:flex top-5 lg:sticky">
          <RelatedNewsWrapper
            relatedNews={news.relatedNews || []}
            relatedEvents={news.relatedEvents || []}
          />
        </div>
      </div>
    </div>
  );
};

export default NewsItemPage;
