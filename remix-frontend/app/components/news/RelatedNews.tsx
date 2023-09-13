import { Link } from "@remix-run/react";
import { NewsPreview } from "~/lib/news/types/INews";

const RelatedNews = ({
  news,
  isLast,
}: {
  news: NewsPreview;
  isLast: boolean;
}) => {
  return (
    <div>
      <div className="flex flex-row-reverse gap-4 py-2">
        <Link to={`/news/${news.id}`}>
          <h3 className="text-lg font-medium w-full">{news.title}</h3>
        </Link>
        <img
          src={news.smallImageUrl || "/news-dummy-img.jpg"}
          alt="event img"
          className="w-2/5 max-h-[120px] object-cover rounded-md"
        />
      </div>
      {!isLast && <div className="border-t-2 border-red-500"></div>}
    </div>
  );
};

export default RelatedNews;
