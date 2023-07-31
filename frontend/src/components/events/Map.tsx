import { Loader } from "@googlemaps/js-api-loader";
import React, { useEffect, useState } from "react";

interface Props {
  address: string;
}

const key = process.env.GOOGLE_MAPS_KEY || "";

const Map: React.FC<Props> = ({ address }) => {
  const loader = new Loader({
    apiKey: key,
    version: "weekly",
    libraries: ["places"],
  });

  const [map, setMap] = useState(null);
  useEffect(() => {
    loader.load().then(() => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK" && results) {
          const mapOptions = {
            center: results[0].geometry.location,
            zoom: 16,
          };
          const map = document.getElementById("map") as HTMLElement;
          const newMap: any = new window.google.maps.Map(map, mapOptions);
          const marker = new window.google.maps.Marker({
            position: results[0].geometry.location,
            map: newMap,
          });
          setMap(newMap);
        }
      });
    });
  }, [address]);
  return (
    <>
      <h1 className="text-center text-2xl py-3">Find in maps</h1>
      <div id="map" className="w-full h-[380px] md:h-[480px]"></div>
    </>
  );
};

export default Map;
