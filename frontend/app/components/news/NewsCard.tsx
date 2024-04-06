import { useNavigate } from "@remix-run/react";
import { NewsPreview } from "~/lib/news/types/INews";
import { cutString, formatDate } from "~/lib/utils";

type CardProps = React.HTMLProps<HTMLDivElement> & {
  item: NewsPreview;
  variant?: "light" | "dark";
  hideImage?: boolean;
};

function NewsCard({
  className,
  item,
  variant = "light",
  children,
  hideImage = false,
  ...props
}: CardProps) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/news/${item.id}`)}
      className={`flex flex-col w-full maw-w-[340px] sm:max-w-[400px] h-[360px] md:h-[400px] border-none cursor-pointer rounded-md overflow-hidden`}
      {...props}
    >
      <div
        className={`flex-1 flex flex-col gap-1 p-2 px-4 h-64   transition-colors duration-300 ease-in-out ${
          variant === "light"
            ? "bg-[#f4f4f4] text-[#333] hover:text-gray-600"
            : "bg-[#1E1C1F] text-white hover:text-gray-200"
        }`}
      >
        <h4 className="text-xl 2xl:text-2xl font-semibold">
          {cutString(item.title, !hideImage && item.mainImage ? 80 : 160)}
        </h4>
        <div
          className={`border-t-[1px]  border-t-gray-400 p-0 pt-2 ${
            variant === "dark" ? "text-white" : "text-[#333]"
          } mt-auto`}
        >
          <p className="text-sm   2xl:text-lg">
            {formatDate(item.createdAt, false)}
          </p>
        </div>
      </div>
      {!hideImage && item.mainImage && (
        <div className="p-0 overflow-hidden">
          <img
            src={item.mainImage.mediaUrl || item.smallImageUrl}
            alt="head image"
            width={400}
            height={200}
            className="object-cover flex-1 w-full h-[200px] hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </div>
      )}
    </div>
  );
}

// const NewsCard: React.FC<Props> = ({ item, darkMode }) => {
//   return (
//     <div
//       className={`rounded-md border-[1px] border-gray-300 max-w-[550px] sm:h-[260] ${
//         darkMode ? "bg-[#1E1C1F]" : "bg-white"
//       } w-full`}
//     >
//       <div className="flex flex-col-reverse sm:flex-row justify-between w-full min-h-[200px]">
//         <div className="p-3 w-full sm:w-3/5">
//           <h3
//             className={`text-xl font-semibold mb-3 hover:text-blue-400 ${
//               darkMode ? "text-white" : ""
//             }`}
//           >
//             <Link to={`/news/${item.id}`}>
//               {item?.title.length < 60
//                 ? item.title
//                 : item.title.slice(0, 57) + "..."}
//             </Link>
//           </h3>
//           <p className={darkMode ? "text-white" : ""}>
//             {item ? <TextContent text={item?.previewText} /> : ""}
//           </p>
//         </div>
//         {item.smallImageUrl && (
//           <div className="rounded-md bg-white h-fit w-full sm:w-auto">
//             <img
//               src={item.smallImageUrl}
//               alt="news preview"
//               width={200}
//               height={200}
//               className="object-cover rounded-tr-md w-full h-[200px] sm:w-[200px]"
//             />
//           </div>
//         )}
//       </div>
//       <div className="flex w-full justify-between p-3 bg-red-500 rounded-b-md">
//         <p className="text-gray-200">
//           {getTimeAgo("2023-08-26 11:31:14.000000")}
//         </p>
//       </div>
//     </div>
//   );
// };

export default NewsCard;
