import { EventApi, EventItemsCarousel } from "@/src/entities/Event";
import { NewsApi, NewsCard } from "@/src/entities/News";
import { NewsCollage } from "@/src/features/news";
import { SectionTitle, VideoItem } from "@/src/shared/ui";
import HomeIcon from "@mui/icons-material/Home";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { Breadcrumbs } from "@mui/material";
import Link from "next/link";

export default async function NewsPage() {
  const newsApi = new NewsApi();
  const eventApi = new EventApi();
  const { newsPreviews } = await newsApi.getNewsPreviews({
    itemsAmount: 5,
  });
  const events = await eventApi.getEventsShortform();

  return (
    <div className="w-full my-4">
      <div className="max-w-7xl mx-6 py-3 lg:mx-auto">
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            className="hover:underline flex items-center gap-2"
            color="inherit"
            href="/"
          >
            <HomeIcon />
            <p className="text-lg">Home</p>
          </Link>
          <Link href={"/news"} className="text-red-500 flex items-center gap-2">
            <NewspaperIcon /> <p className="text-lg">News</p>
          </Link>
        </Breadcrumbs>
        <h1 className="mt-2 pl-6 lg:pl-0 text-2xl font-bold">All News</h1>
        <div className="w-full flex">
          <NewsCollage news={newsPreviews} />
        </div>
        <EventItemsCarousel events={events} />
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
          <div className="w-full grid-col-1 lg:grid-col-2 xl:grid grid-cols-3 justify-center gap-4">
            {newsPreviews.map((preview) => {
              return <NewsCard key={preview.id} item={preview} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
