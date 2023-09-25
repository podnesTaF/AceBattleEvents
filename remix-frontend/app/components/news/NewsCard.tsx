import { Link } from "@remix-run/react";
import React from "react";
import { getTimeAgo } from "~/lib/utils";

interface Props {
  item: any;
  darkMode?: boolean;
}

const NewsCard: React.FC<Props> = ({ item, darkMode }) => {
  return (
    <div
      className={`rounded-md border-[1px] border-gray-300 max-w-[550px] sm:h-[260] ${
        darkMode ? "bg-[#1E1C1F]" : "bg-white"
      } w-full`}
    >
      <div className="flex flex-col-reverse sm:flex-row justify-between w-full min-h-[200px]">
        <div className="p-3 w-full sm:w-3/5">
          <h3
            className={`text-xl font-semibold mb-3 hover:text-blue-400 ${
              darkMode ? "text-white" : ""
            }`}
          >
            <Link to={`/news/${item.id}`}>
              {item?.title.length < 70
                ? item.title
                : item.title.slice(0, 67) + "..."}
            </Link>
          </h3>
          <p className={darkMode ? "text-white" : ""}>{item?.previewText}</p>
        </div>
        {item.smallImageUrl && (
          <div className="rounded-md bg-white h-fit w-full sm:w-auto">
            <img
              src={item.smallImageUrl}
              alt="news preview"
              width={200}
              height={200}
              className="object-cover rounded-tr-md w-full h-[200px] sm:w-[200px]"
            />
          </div>
        )}
      </div>
      <div className="flex w-full justify-between p-3 bg-red-500 rounded-b-md">
        <Link
          to={"/news/" + item.id}
          className="underline text-lg font-semibold text-white"
        >
          read more in article
        </Link>
        <p className="text-gray-200">
          {getTimeAgo("2023-08-26 11:31:14.000000")}
        </p>
      </div>
    </div>
  );
};

export default NewsCard;
