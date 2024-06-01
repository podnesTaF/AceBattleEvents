import { createIcon } from "@gluestack-ui/themed";
import { Path, Rect } from "react-native-svg";

export const GluestackIcon = createIcon({
  viewBox: "0 0 32 32",
  path: (
    <>
      <Rect width="32" height="32" rx="2" fill="currentColor" />
      <Path
        d="M9.5 14.6642L15.9999 9.87633V12.1358L9.5 16.9236V14.6642Z"
        fill="white"
      />
      <Path
        d="M22.5 14.6642L16.0001 9.87639V12.1359L22.5 16.9237V14.6642Z"
        fill="white"
      />
      <Path
        d="M9.5 19.8641L15.9999 15.0763V17.3358L9.5 22.1236V19.8641Z"
        fill="white"
      />
      <Path
        d="M22.5 19.8642L16.0001 15.0764V17.3358L22.5 22.1237V19.8642Z"
        fill="white"
      />
    </>
  ),
});
