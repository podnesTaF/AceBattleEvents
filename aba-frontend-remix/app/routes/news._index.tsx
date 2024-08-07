import HomeIcon from "@mui/icons-material/Home";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { Breadcrumbs } from "@mui/material";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Api } from "~/api/axiosInstance";
import {
  EventItemCard,
  NewsCard,
  NewsCollage,
  SectionTitle,
  VideoItem,
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
          <NewsCollage news={newsPreviews.filter((n) => n.previewImageUrl)} />
        </div>
        <div className="my-8">
          <SectionTitle title="Events" />
          <Swiper
            spaceBetween={20}
            slidesPerView={2}
            breakpoints={{
              0: {
                slidesPerView: 1.2,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 2.2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 2.2,
                spaceBetween: 50,
              },
            }}
          >
            {eventsPreviews
              ?.sort(
                (a, b) =>
                  new Date(b.startDateTime!).getTime() -
                  new Date(a.startDateTime!).getTime()
              )
              ?.map((event, i) => (
                <SwiperSlide key={event.id}>
                  <EventItemCard item={event} />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
        <section className="w-full my-8 md:my-10">
          <div className="max-w-6xl w-full px-4 lg:mx-auto">
            <SectionTitle title="Videos" align="justify-end" />
            <div className="w-full flex gap-6 flex-col lg:flex-row">
              <div className="w-full md:w-1/3 border-b-4 rounded-bl-2xl border-red-500 shadow-md">
                <VideoItem
                  videoId="WSUfPBJf_P4"
                  title="What's Battle Mile Structure and Rules"
                />
              </div>
              <div className="w-full md:w-1/3 border-b-4 rounded-bl-2xl border-red-500 shadow-md">
                <VideoItem
                  videoId="RRs8Z7GQmdk"
                  title="What's Battle Mile? Structure and Rules."
                />
              </div>
              <div className="w-full md:w-1/3 border-b-4 rounded-bl-2xl border-red-500 shadow-md">
                <VideoItem
                  videoId="kehD79rNiyU"
                  title="
                  Signing of the Memorandum between Battle Mile and Sport for All"
                />
              </div>
            </div>
          </div>
        </section>
        <div className="w-full mb-10">
          <h4 className="text-right text-2xl font-semibold uppercase mb-4">
            Other News
          </h4>
          <div className="w-full flex justify-center gap-4 flex-wrap">
            {newsPreviews.map((preview) => {
              return (
                <NewsCard variant="dark" key={preview.id} item={preview} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
