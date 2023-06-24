import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface ImageUploadProps {
  setImage: Function;
  imageUrl?: string;
  image: any;
}

const ImagePicker: React.FC<ImageUploadProps> = ({
  setImage,
  image,
  imageUrl,
}) => {
  const [previewUrl, setPreviewUrl] = useState<any>("");
  const [isHover, setIsHover] = useState(false);
  const [valid, setValid] = useState(false);
  const [drag, setDrag] = useState(true);
  const [oldImageUrl, setImageUrl] = useState("");
  const pickImageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!image) return;
    console.log(image);
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(image);
  }, [image]);

  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(true);
  };

  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(false);
  };

  const onDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // @ts-ignore
    let file = [...e.dataTransfer.files][0];
    setImage(file);
    setDrag(false);
  };

  const pickImageHandler = () => {
    if (pickImageRef.current) {
      pickImageRef.current.click();
    }
  };

  const pickedHandler = (e: any) => {
    if (e.target.files || e.target.files.length === 1) {
      console.log(e.target.files);
      const pickedFile = e.target.files[0];
      setImage(pickedFile);
      setValid(true);
    } else {
      console.log("wrong file type");
      setValid(false);
    }
  };

  const handleDelete = () => {
    if (pickImageRef?.current) {
      pickImageRef.current.value = "";
    }
    if (oldImageUrl) {
      setImageUrl("");
    }
    setPreviewUrl("");
    setImage(undefined);
  };

  return (
    <>
      <div className="flex w-full justify-center items-center">
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className={"relative hover:shadow-md"}
        >
          {previewUrl && valid && (
            <Image
              src={previewUrl}
              alt="Preview"
              width={500}
              height={500}
              className="object-contain"
            />
          )}
          {isHover && (
            <div
              className="absolute top-3 right-3 bg-white/80 text-xl cursor-pointer px-3 py-2 rounded-sm hover:bg-cyan-300"
              onClick={handleDelete}
            >
              DELETE
            </div>
          )}
        </div>
      </div>
      <div
        className={
          "w-full border-2 border-dashed border-gray-300 rounded-md p-4 mt-6 flex justify-center items-center cursor-pointer " +
          (drag ? "bg-gray-100" : "")
        }
        onDragStart={(e) => dragStartHandler(e)}
        onDragLeave={(e) => dragLeaveHandler(e)}
        onDragOver={(e) => dragStartHandler(e)}
        onDrop={(e) => onDropHandler(e)}
        onClick={pickImageHandler}
      >
        <input
          ref={pickImageRef}
          type="file"
          style={{ display: "none" }}
          accept=".jpg,.png,.jpeg,.webp"
          onChange={pickedHandler}
        />

        <p>
          Drag and drop photos <span>or click to upload</span>
        </p>
      </div>
    </>
  );
};

export default ImagePicker;
