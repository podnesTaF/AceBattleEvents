import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Api } from "~/api/axiosInstance";
import { NewsCardList } from "~/components";

export const loader = async () => {
  const newsPreviews = await Api().news.getNewsPreviews();

  return json({ newsPreviews });
};

const NewsPage = () => {
  const { newsPreviews } = useLoaderData<typeof loader>();
  return (
    <div className="w-full my-16">
      <div className="max-w-6xl mx-6 lg:mx-auto">
        <h1 className="my-6 pl-8 text-2xl font-bold">ALL NEWS</h1>
        <NewsCardList newsPreviews={newsPreviews || []} />
      </div>
    </div>
  );
};

export default NewsPage;
