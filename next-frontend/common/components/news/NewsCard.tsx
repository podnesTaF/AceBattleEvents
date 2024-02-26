import { cn, formatDateToShortMonth } from "@/common/lib/utils/utils";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

type CardProps = React.ComponentProps<typeof Card> & {
  headImageSrc: string;
  title: string;
  description?: string;
  date: string;
  variant: "light" | "dark";
};

export function NewsCard({
  className,
  headImageSrc,
  variant = "light",
  children,
  title,
  date,
  description,
  ...props
}: CardProps) {
  return (
    <Card
      className={cn(
        "w-full p-0 pb-2 border-none cursor-pointer",
        variant === "light" ? "bg-white/10" : "bg-primary",
        className
      )}
      {...props}
    >
      <CardHeader className="p-0 overflow-hidden">
        <Image
          src={headImageSrc}
          alt="head image"
          width={400}
          height={200}
          className="object-cover flex-1 w-full hover:scale-105 transition-transform duration-300 ease-in-out"
        />
      </CardHeader>
      <CardContent
        className={cn(
          "flex-1 flex flex-col gap-1 p-2 px-4 text-white hover:text-gray-200  transition-colors duration-300 ease-in-out"
        )}
      >
        <h4 className="text-xl 2xl:text-2xl">{title}</h4>
        <p className="text-sm  2xl:text-lg">{description}</p>
      </CardContent>
      <CardFooter className="border-t-[1px] mx-3 border-t-gray-400 p-0 pt-2 text-white">
        <p className="text-sm   2xl:text-lg">{formatDateToShortMonth(date)}</p>
      </CardFooter>
    </Card>
  );
}
