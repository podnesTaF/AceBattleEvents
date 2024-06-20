"use client";
import { cutString, formatDateToDots } from "@/src/shared/lib";
import { EventButton } from "@/src/shared/ui";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { INewsPreview } from "../model";

type CardProps = React.HTMLProps<HTMLDivElement> & {
  item: INewsPreview;
  variant?: "light" | "dark";
  hideImage?: boolean;
};

export function NewsCard({
  className,
  item,
  variant = "light",
  children,
  hideImage = false,
  ...props
}: CardProps) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/news/${item.id}`)}
      className={`flex flex-col w-full maw-w-[340px] sm:max-w-[400px] h-[360px] md:h-[450px] border-none cursor-pointer rounded-md overflow-hidden`}
      {...props}
    >
      {!hideImage && item.previewImageUrl && (
        <div className="p-0 overflow-hidden rounded-lg">
          <Image
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
            {formatDateToDots(item.createdAt)}
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

export default NewsCard;
