import { NewsPreview } from "~/lib/news/types/INews";
import NewsCard from "./NewsCard";

interface Props {
  newsPreviews: NewsPreview[];
}

const NewsCardList: React.FC<Props> = ({ newsPreviews }) => {
  return (
    <div className="max-w-6xl flex justify-center mx-4 gap-4 flex-wrap md:mx-auto">
      {newsPreviews.map((preview) => {
        return <NewsCard key={preview.id} item={preview} />;
      })}
    </div>
  );
};

export default NewsCardList;
