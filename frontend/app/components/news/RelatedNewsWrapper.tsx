import React from "react";
import { NewsPreview } from "~/lib/news/types/INews";
import { IEvent } from "~/lib/types";
import RelatedNews from "./RelatedNews";

interface Props {
  relatedNews: NewsPreview[];
  relatedEvents: IEvent[];
}

const RelatedNewsWrapper: React.FC<Props> = ({
  relatedNews,
  relatedEvents,
}) => {
  return (
    <div className="bg-white border-[1px] border-gray-300 rounded-b-md mt-8 p-3">
      <h2 className="text-xl font-semibold">RELATED NEWS</h2>
      {relatedNews.map((news, index) => {
        return (
          <RelatedNews
            key={news.id}
            news={news}
            isLast={index === relatedNews.length - 1}
          />
        );
      })}
    </div>
  );
};

export default RelatedNewsWrapper;
