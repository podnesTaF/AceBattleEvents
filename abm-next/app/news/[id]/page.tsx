import { NewsApi } from "@/src/entities/News";
import { Article, RelatedNewsWrapper } from "@/src/features/news";
import { getTimeAgo } from "@/src/shared/lib";
import { CustomCrumbs } from "@/src/shared/ui";
import FacebookIcon from "@mui/icons-material/Facebook";
import HomeIcon from "@mui/icons-material/Home";
import InstagramIcon from "@mui/icons-material/Instagram";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Image from "next/image";

const links = [
  {
    title: "Home",
    url: "/",
    icon: HomeIcon,
  },
  {
    title: "News",
    url: "/news",
    icon: NewspaperIcon,
    active: true,
  },
];

const ArticlePage = async ({ params }: { params: { id: string } }) => {
  const newsApi = new NewsApi();
  const article = await newsApi.getNewsById(params.id);

  if (!article) {
    throw new Error("Article not found");
  }

  return (
    <div className="flex flex-col">
      <div className="relative mb-6  w-full h-72 md:h-96 overflow-hidden ">
        <Image
          src={article.previewImageUrl || "/new-dummy-img.jpg"}
          alt="background pict"
          width={1200}
          height={600}
          className="absolute object-cover h-full top-0 right-0 -z-20 w-full object-center auto-approximation"
        />
        <div className="absolute w-full md:w-full lg:w-3/4 bottom-0 left-1/2 -translate-x-1/2 px-4 py-2 bg-gradient-to-b from-transparent to-black">
          <div className=" px-4 w-full pb-2 pt-4 border-red-500 border-b-[1px] flex justify-between">
            <p className="text-white text-sm md:text-lg">
              {getTimeAgo(article.createdAt)}
            </p>
            <p className="text-white text-sm md:text-lg">News</p>
          </div>
          <h3 className="text-white text-2xl py-4 px-4 md:text-3xl font-semibold max-w-2xl">
            {article.title}
          </h3>
        </div>
      </div>
      <div className="max-w-7xl mx-6 xl:mx-auto">
        <div className="my-4">
          <CustomCrumbs links={links} />
        </div>
        <div className="relative flex flex-col lg:flex-row gap-6 mb-6">
          <div className="w-full lg:w-3/5">
            <Article article={article} />
            <div className="flex flex-row mx-4">
              <div className="flex flex-row pr-4">
                <h3 className="text-xl font-semibold pt-3">SHARE:</h3>
              </div>
              <div className="flex flex-row gap-4 mb-4 bg-black p-2">
                <div className="bg-white rounded-full p-2">
                  <a href="https://www.youtube.com/">
                    <YouTubeIcon />
                  </a>
                </div>
                <div className="bg-white rounded-full p-2">
                  <a href="https://www.instagram.com/">
                    <InstagramIcon />
                  </a>
                </div>
                <div className="bg-white rounded-full p-2">
                  <a href="https://www.facebook.com/">
                    <FacebookIcon />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-8 w-full h-fit md:w-1/3 md:flex top-5 lg:sticky">
            <RelatedNewsWrapper
              relatedNews={article.relatedArticles.newsPreviews || []}
              relatedEvents={article.relatedEvents || []}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
