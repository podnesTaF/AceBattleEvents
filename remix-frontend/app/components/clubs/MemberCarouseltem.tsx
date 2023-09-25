import React from "react";

interface Props {
  item: any;
  hideRole?: boolean;
}

const MemberCarouseltem: React.FC<Props> = ({ item, hideRole }) => {
  return (
    <div className="max-w-xs max-h-sm mx-auto w-full relative cursor-pointer active:scale-95 flex justify-center items-center shadow-md rounded-md">
      <img
        src={
          item.image
            ? item.image.mediaUrl
            : "https://storage.googleapis.com/abe_cloud_storage/image/large/c4bccba0-3f80-4eb5-b50f-63e5cd4f0100.jpg"
        }
        alt="avatar"
        width={250}
        height={200}
        className="rounded-md object-cover h-[250px]"
      />
      <div className="absolute bg-black py-1 w-full flex justify-center bottom-0 left-0 gap-2 items-center">
        {item.country?.flagIconUrl && (
          <img
            src={item.country.flagIconUrl}
            alt="flag"
            width={50}
            height={30}
          />
        )}
        {item.worldAthleticsUrl ? (
          <a href={item.worldAthleticsUrl} target="_blank">
            <h4 className={`text-xl text-white underline`}>
              {item.name} {item.surname}
            </h4>
          </a>
        ) : (
          <h4 className={`text-xl text-white`}>
            {item.name} {item.surname}
          </h4>
        )}
      </div>
      {!hideRole && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 bg-red-500">
          <h4 className="text-white font-semiblod text-xl">{item.role}</h4>
        </div>
      )}
    </div>
  );
};

export default MemberCarouseltem;
