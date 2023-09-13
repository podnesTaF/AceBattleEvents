import HomeIcon from "@mui/icons-material/Home";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { Breadcrumbs } from "@mui/material";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Api } from "~/api/axiosInstance";
import {
  EventItemCard,
  NewsCard,
  NewsCollage,
  SectionTitle,
  WideCarousel,
} from "~/components";

export const loader = async () => {
  const { newsPreviews, totalPages } = await Api().news.getNewsPreviews({
    itemsAmount: 5,
  });
  const eventsPreviews = await Api().events.getEventsShortform();

  return json({ newsPreviews, eventsPreviews, totalPages });
};

const NewsPage = () => {
  const { newsPreviews, eventsPreviews } = useLoaderData<typeof loader>();
  return (
    <div className="w-full my-4">
      <div className="max-w-6xl mx-6 py-3 lg:mx-auto">
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            className="hover:underline flex items-center gap-2"
            color="inherit"
            to="/"
          >
            <HomeIcon />
            <p className="text-lg">Home</p>
          </Link>
          <Link to={"/news"} className="text-red-500 flex items-center gap-2">
            <NewspaperIcon /> <p className="text-lg">News</p>
          </Link>
        </Breadcrumbs>
        <h1 className="mt-2 pl-6 lg:pl-0 text-2xl font-bold">ALL NEWS</h1>
        <div className="w-full flex">
          <NewsCollage news={newsPreviews.filter((n) => n.mainImage)} />
        </div>
        <div className="my-6">
          <SectionTitle title="Events" />
          <WideCarousel ItemCard={EventItemCard} items={eventsPreviews} />
        </div>
        <div className="w-full mb-10">
          <h4 className="text-right text-2xl font-semibold uppercase mb-4">
            Other News
          </h4>
          <div className="w-full flex justify-center gap-4 flex-wrap">
            {newsPreviews.map((preview) => {
              return <NewsCard key={preview.id} item={preview} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
