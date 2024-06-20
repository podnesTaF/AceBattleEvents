import { INewsPreview } from "@/src/entities/News";
import Image from "next/image";
import Link from "next/link";

export const RelatedNews = ({
  news,
  isLast,
}: {
  news: INewsPreview;
  isLast: boolean;
}) => {
  return (
    <div>
      <div className="flex flex-row-reverse gap-4 py-2">
        <Link href={`/news/${news.id}`}>
          <h3 className="text-lg font-medium w-full">{news.title}</h3>
        </Link>
        {news.previewImageUrl && (
          <Image
            src={news.previewImageUrl}
            alt="event img"
            width={120}
            height={120}
            className="w-2/5 max-h-[120px] object-cover rounded-md"
          />
        )}
      </div>
      {!isLast && <div className="border-t-2 border-red-500"></div>}
    </div>
  );
};

export default RelatedNews;
