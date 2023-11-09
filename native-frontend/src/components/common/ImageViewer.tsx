import { Image } from "@gluestack-ui/themed";

export default function ImageViewer({
  placeholderImageSource,
  selectedImage,
}: {
  placeholderImageSource?: any;
  selectedImage: string;
}) {
  const imageSource = selectedImage
    ? { uri: selectedImage }
    : placeholderImageSource;

  return (
    <Image source={imageSource} size={"md"} role="img" alt={"picked image"} />
  );
}
