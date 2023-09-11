import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import { IconButton } from "@mui/material";
import { useNavigate } from "@remix-run/react";
import React from "react";
import { NewsPreview } from "~/lib/news/types/INews";

interface Props {
  news: NewsPreview;
  handleOpenAlert: (id: number) => void;
}

const NewsLargeItem: React.FC<Props> = ({ news, handleOpenAlert }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full p-4 bg-white rounded-md shadow-md flex items-center justify-between gap-4">
      <img
        src={news.smallImageUrl || "/abm-logo-black.svg"}
        alt="news image"
        width={170}
        className="object-cover rounded-md w-1/3 lg:w-1/4 h-auto"
      />
      <div className="w-1/2">
        <h3 className="text-xl font-semibold mb-6">{news.title}</h3>
        <p>{news.previewText}</p>
      </div>
      <div className="flex w-auto md:w-1/5 items-end flex-col justify-around gap-4 h-full">
        <IconButton onClick={() => navigate("/news/" + news.id)}>
          <FindInPageIcon />
        </IconButton>
        <IconButton
          onClick={() => navigate("/admin/news/add?newsId=" + news.id)}
        >
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => handleOpenAlert(news.id)}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default NewsLargeItem;
