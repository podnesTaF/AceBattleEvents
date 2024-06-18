import FacebookIcon from "@mui/icons-material/Facebook";
import HomeIcon from "@mui/icons-material/Home";
import InstagramIcon from "@mui/icons-material/Instagram";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React from "react";
import { Api } from "~/api/axiosInstance";
import { CustomCrumbs, RelatedNewsWrapper, TextContent } from "~/components";
import { INews } from "~/lib/types";
import { getTimeAgo } from "~/lib/utils";

export const loader = async ({ params }: LoaderFunctionArgs) => {
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

const links = [
  {
    title: "Home",
    url: "/",
    icon: HomeIcon,
  },
  {
    title: "News",
    url: "/news",
    icon: NewspaperIcon,
    active: true,
  },
];

const NewsItemPage = () => {
  const { news } = useLoaderData<typeof loader>() as unknown as {
    news: INews;
  };

  return (
    <div className="flex flex-col">
      <div className="relative mb-6  w-full h-72 md:h-96 overflow-hidden ">
        <img
          src={news.previewImageUrl || "/news-dummy-img.jpg"}
          alt="background pict"
          className="absolute object-cover h-full top-0 right-0 -z-20 w-full object-center auto-approximation"
        />
        <div className="absolute w-full md:w-full lg:w-3/4 bottom-0 left-1/2 -translate-x-1/2 px-4 py-2 bg-gradient-to-b from-transparent to-black">
          <div className=" px-4 w-full pb-2 pt-4 border-red-500 border-b-[1px] flex justify-between">
            <p className="text-white text-sm md:text-lg">
              {getTimeAgo("2023-08-19 12:00:00")}
            </p>
            <p className="text-white text-sm md:text-lg ">News</p>
          </div>
          <h3 className="text-white text-2xl py-4 px-4 md:text-3xl font-semibold max-w-2xl">
            {news.title}
          </h3>
        </div>
      </div>
      <div className="max-w-7xl mx-6 xl:mx-auto">
        <div className="my-4">
          <CustomCrumbs links={links} />
        </div>
        <div className="relative flex flex-col lg:flex-row gap-6 mb-6">
          <div className="w-full lg:w-3/5">
            <div className="flex flex-col w-full gap-6 mb-6">
              {news.contents.map((item) => (
                <React.Fragment key={item.id}>
                  {item.text ? (
                    <TextContent text={item.text} />
                  ) : (
                    item.type === "media" && (
                      <img
                        src={item.mediaUrl || "/new-dummy-img.jpg"}
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
          <div className="mb-8 w-full h-fit md:w-1/3 md:flex top-5 lg:sticky">
            <RelatedNewsWrapper
              relatedNews={news.relatedArticles.newsPreviews || []}
              relatedEvents={news.relatedEvents || []}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsItemPage;
