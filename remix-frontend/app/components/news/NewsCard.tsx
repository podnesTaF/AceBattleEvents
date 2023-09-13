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
      className={`rounded-md border-[1px] border-gray-300 max-w-[550px] sm:h-[260px] ${
        darkMode ? "bg-[#1E1C1F]" : "bg-white"
      } w-full`}
    >
      <div className="flex justify-between w-full mb-4">
        <div className="p-3 w-3/5">
          <h3
            className={`text-xl font-semibold mb-3 hover:text-blue-400 ${
              darkMode ? "text-white" : ""
            }`}
          >
            <Link to={`/news/${item.id}`}>{item?.title}</Link>
          </h3>
          <p className={darkMode ? "text-white" : ""}>{item?.previewText}</p>
        </div>
        <div className="rounded-md bg-white">
          <img
            src={item.smallImageUrl || "/abm-logo-black.svg"}
            alt="news preview"
            width={200}
            height={200}
            className="object-cover rounded-md"
          />
        </div>
      </div>
      <div className="flex w-full justify-between p-3">
        <Link
          to={"/news/" + item.id}
          className="underline text-lg font-semibold text-red-500"
        >
          read more in article
        </Link>
        <p className="text-gray-400">
          {getTimeAgo("2023-08-26 11:31:14.000000")}
        </p>
      </div>
    </div>
  );
};

export default NewsCard;
