import { Link } from "@remix-run/react";
import React from "react";
import { getTimeAgo } from "~/lib/utils";

interface Props {
  news: {
    id: number;
    title: string;
    text: string;
    media: {
      mediaUrl: string;
    };
    createdAt: string;
  };
}

const NewsCard: React.FC<Props> = ({ news }) => {
  return (
    <div className="rounded-md shadow-md max-w-[550px] bg-white w-full">
      <div className="flex justify-between w-full mb-4">
        <div className="p-3 w-3/5">
          <h3 className="text-xl font-semibold mb-3">
            {news.title.slice(0, 30) + "..."}
          </h3>
          <p>{news.text.slice(0, 40) + "..."}</p>
        </div>
        <div>
          <img
            src={news.media.mediaUrl}
            alt="news preview"
            width={200}
            height={200}
            className="object-cover rounded-tr-md"
          />
        </div>
      </div>
      <div className="flex w-full justify-between p-3">
        <Link to={"/news/" + news.id} className="underline">
          read more in article
        </Link>
        <p className="text-gray-400">{getTimeAgo(news.createdAt)}</p>
      </div>
    </div>
  );
};

export default NewsCard;
