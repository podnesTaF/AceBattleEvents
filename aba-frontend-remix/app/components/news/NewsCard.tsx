import { useNavigate } from "@remix-run/react";
import { NewsPreview } from "~/lib/news/types/INews";
import { cutString, formatDate } from "~/lib/utils";
import EventButton from "../events/EventButton";

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
      className={`flex flex-col w-full maw-w-[340px] sm:max-w-[400px] h-[360px] md:h-[450px] border-none cursor-pointer rounded-md overflow-hidden`}
      {...props}
    >
      {!hideImage && item.previewImageUrl && (
        <div className="p-0 overflow-hidden rounded-lg">
          <img
            src={item.previewImageUrl}
            alt="head image"
            width={400}
            height={200}
            className="object-cover flex-1 w-full h-[250px] hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </div>
      )}
      <div
        className={`flex-1 flex flex-col gap-1 py-2 transition-colors duration-300 ease-in-out ${
          variant === "light"
            ? "text-[#333] hover:text-gray-600"
            : "text-white hover:text-gray-200"
        }`}
      >
        <h4 className="text-xl 2xl:text-2xl font-semibold">
          {cutString(item.title, !hideImage && item.mainImageUrl ? 50 : 120)}
        </h4>
        <div
          className={`${
            variant === "dark" ? "text-white" : "text-[#333]"
          } mt-auto`}
        >
          <p className="text-sm font-semibold 2xl:text-lg mb-2">
            {formatDate(item.createdAt, false)}
          </p>
          <EventButton
            className="w-full !py-1.5"
            color={variant === "dark" ? "white" : "red"}
          >
            Read in Article
          </EventButton>
        </div>
      </div>
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
