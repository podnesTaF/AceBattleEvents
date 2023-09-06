import { Link } from "@remix-run/react";
import React from "react";
import { NewsPreview } from "~/lib/news/types/INews";

interface Props {
  news: NewsPreview;
}

const NewsCard: React.FC<Props> = ({ news }) => {
  return (
    <div className="mb-8 bg-white border drop-shadow-xl rounded-lg md:w-2/5">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col justify-between pb-4 w-2/4">
          <h2 className="flex text-base font-semibold px-4 py-4 w-2/3 h-1/6">
            {news.title}
          </h2>
          <p className="px-4 text-base">{news.previewText}</p>
        </div>
        <img
          src={news.smallImageUrl}
          alt={news.title}
          width={400}
          height={450}
          className="flex rounded-tr-lg w-2/4 h-30 pb-2"
        />
      </div>
      <div className="flex flex-row justify-between pb-4">
        <Link to={`news/${news.id}`}>
          <p className="underline text-base px-4">read more about in article</p>
        </Link>
        <p className="px-4 text-base">2 days ago</p>
      </div>
    </div>
  );
};

export default NewsCard;
