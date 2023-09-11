import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { Api } from "~/api/axiosInstance";
import { ConfirmAlert, NewsLargeItem } from "~/components";
import AdminHeader from "~/components/admin/AdminHeader";

export const loader = async () => {
  const news = await Api().news.getNewsPreviews({ textLength: 300 });

  return json({ news });
};

const AdminNews = () => {
  const { news } = useLoaderData<typeof loader>();
  const [confirmAlertOpen, setConfirmAletOpen] = useState(false);
  const [newsIdToDelete, setNewsIdToDelete] = useState<number | null>(null);
  const [newsState, setNewsState] = useState(news);

  const handleDelete = async () => {
    if (!newsIdToDelete) return;
    const data = await Api().news.deleteNews(newsIdToDelete);
    if (data) {
      setNewsState((prev) => prev.filter((n) => n.id !== newsIdToDelete));
    }
    handleClose();
  };

  const handleOpenAlert = (id: number) => {
    setNewsIdToDelete(id);
    setConfirmAletOpen(true);
  };

  const handleClose = () => {
    setConfirmAletOpen(false);
  };

  return (
    <div className="w-full">
      <AdminHeader
        title={"News"}
        pageName={"Admin Dashboard"}
        description={"All News"}
      />
      <main className="max-w-4xl mx-4 lg:mx-auto my-6">
        <div className="flex justify-between gap-6 mb-6">
          <h3 className="font-semibold text-2xl">News List</h3>
          <Link
            to={"/admin/news/add"}
            className="bg-green-400 hover:bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Add News
          </Link>
        </div>
        <div className="w-full flex flex-col gap-4">
          {newsState.map((newsItem) => (
            <NewsLargeItem
              key={newsItem.id}
              news={newsItem}
              handleOpenAlert={handleOpenAlert}
            />
          ))}
        </div>
      </main>
      <ConfirmAlert
        onSure={handleDelete}
        onCancel={handleClose}
        open={confirmAlertOpen}
        handleClose={handleClose}
        title={"Are You Sure you want to remove the article?"}
        description={`
        This action is irreversible.
        All the data related to this article will be removed from the database.
        Click "Confirm" to proceed.
      `}
      />
    </div>
  );
};

export default AdminNews;
