import { Box } from "@gluestack-ui/themed";
import { ILocation } from "@lib/models";
import { transformAddress } from "@lib/utils";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import MapView, { Marker, Region } from "react-native-maps";

interface Props {
  eventLocation: ILocation;
  height?: number;
}

const EventMap: React.FC<Props> = ({ eventLocation, height }) => {
  const [region, setRegion] = useState<Region>();
  const [markerCoordinate, setMarkerCoordinate] = useState<{
    latitude: number;
    longitude: number;
  }>();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }

      let result = await Location.geocodeAsync(transformAddress(eventLocation));

      const location = result[0];

      if (location) {
        setRegion({
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.08,
          longitudeDelta: 0.005,
        });
        setMarkerCoordinate({
          latitude: location.latitude,
          longitude: location.longitude,
        });
      }
    })();
  }, []);

  return (
    <Box flex={1}>
      <MapView
        style={{
          width: "100%",
          height: height || 250,
        }}
        region={region}
      >
        {markerCoordinate && <Marker coordinate={markerCoordinate}></Marker>}
      </MapView>
    </Box>
  );
};

export default EventMap;
