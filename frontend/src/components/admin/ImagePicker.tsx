import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

interface ImageUploadProps {
  name: string;
  customSubmit?: Function;
}

const ImagePicker: React.FC<ImageUploadProps> = ({ name }) => {
  const [previewUrl, setPreviewUrl] = useState<any>("");
  const [isHover, setIsHover] = useState(false);
  const [valid, setValid] = useState(false);
  const [drag, setDrag] = useState(true);
  const [oldImageUrl, setImageUrl] = useState("");
  const pickImageRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<any>(null);
  const { register, formState, setValue, getValues } = useFormContext();

  useEffect(() => {
    if (!getValues(name)) {
      setPreviewUrl("");
    }
  }, [getValues(name)]);

  useEffect(() => {
    if (!image) {
      return;
    }
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

  const handleDelete = () => {
    if (pickImageRef?.current?.value) {
      pickImageRef.current.value = "";
    }
    if (oldImageUrl) {
      setImageUrl("");
    }
    setImage("");
    setPreviewUrl("");
    setValue(name, "");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const pickedFile = e.target.files[0];
      setImage(pickedFile);
      setValid(true);
      setValue(name, pickedFile); // Set the form value using setValue
    } else {
      console.log("wrong file type");
      setValid(false);
    }
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
              className="absolute top-3 right-3 bg-white/80 text-xl cursor-pointer px-3 py-2 rounded-sm hover:bg-red-500 hover:text-white transition-all"
              onClick={handleDelete}
            >
              DELETE
            </div>
          )}
        </div>
      </div>
      <div
        className={
          "w-full h-full border-2 border-dashed border-gray-300 rounded-md p-4 mt-2 flex justify-center items-center cursor-pointer mb-6" +
          (drag ? "bg-gray-100" : "") +
          (previewUrl ? " hidden" : "")
        }
        onDragStart={(e) => dragStartHandler(e)}
        onDragLeave={(e) => dragLeaveHandler(e)}
        onDragOver={(e) => dragStartHandler(e)}
        onDrop={(e) => onDropHandler(e)}
        onClick={pickImageHandler}
      >
        <input
          {...register(name)}
          ref={pickImageRef}
          type="file"
          id={name}
          className="hidden"
          accept=".jpg,.png,.jpeg,.webp"
          onChange={handleImageChange}
        />
        {!!formState.errors[name]?.message && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            {formState.errors[name]?.message as any}
          </p>
        )}
        <p>
          Drag and drop photos <span>or click to upload</span>
        </p>
      </div>
    </>
  );
};

export default ImagePicker;
