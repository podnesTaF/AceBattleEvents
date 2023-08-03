import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  item: any;
}

const CarouselItem: React.FC<Props> = ({ item }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/team/" + item.id)}
      className="w-full overflow-hidden relative cursor-pointer active:scale-95 flex justify-center items-center"
    >
      <Image
        src={item.logo.mediaUrl}
        alt="team logo"
        className="object-contain max-h-[250px] md:max-h-[350px]"
        width={350}
        height={350}
      />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 px-3 py-1 md:px-4 md:py-1 bg-red-500 rounded-md">
        <h3 className="text-lg md:text-xl uppercase font-semibold text-white">
          {item.name}
        </h3>
      </div>
    </div>
  );
};

export default CarouselItem;
