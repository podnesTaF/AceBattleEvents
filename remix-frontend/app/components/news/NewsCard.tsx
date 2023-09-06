import { Link } from "@remix-run/react";
import React from "react";
import { getTimeAgo } from "~/lib/utils";

interface Props {
  item: any;
}

const NewsCard: React.FC<Props> = ({ item }) => {
  return (
    <div className="rounded-md shadow-md max-w-[550px] bg-white w-full">
      <div className="flex justify-between w-full mb-4">
        <div className="p-3 w-3/5">
          <h3 className="text-xl font-semibold mb-3">{item?.title}</h3>
          <p>{item?.previewText}</p>
        </div>
        <div>
          <img
            src={item.smallImageUrl || "/abm-logo-black.svg"}
            alt="news preview"
            width={200}
            height={200}
            className="object-cover rounded-tr-md"
          />
        </div>
      </div>
      <div className="flex w-full justify-between p-3">
        <Link to={"/news/" + item.id} className="underline">
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
