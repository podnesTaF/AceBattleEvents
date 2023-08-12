import React, { useState } from "react";
import AddImageDialog from "./AddImageDialog";

interface Props {
  title: string;
  name: string;
  storageUnavailable?: boolean;
}

const ImageField: React.FC<Props> = ({ title, name, storageUnavailable }) => {
  const [imageDialogOpen, setImageDialogOpen] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<{
    url: string;
    name: string;
  }>({ url: "", name: "" });

  return (
    <>
      <div className="flex gap-4 mb-4 items-center">
        <h4 className="text-gray uppercase text-xl font-semibold">{title}</h4>
        <button
          type="button"
          className="px-4 py-2 rounded-md bg-red-500 text-xl text-white font-semibold"
          onClick={() => setImageDialogOpen(true)}
        >
          Open Storage
        </button>
      </div>
      {imagePreview.url && (
        <div className="mb-4 flex w-full justify-center gap-4">
          <div>
            <h4 className="text-xl text-gray-500">{imagePreview.name}</h4>
          </div>
          <img
            src={imagePreview.url}
            alt={"intro preview"}
            width={400}
            height={400}
          />
        </div>
      )}
      <AddImageDialog
        isOpen={imageDialogOpen}
        handleClose={() => setImageDialogOpen(false)}
        name={name}
        setIntroPreview={setImagePreview}
        storageUnavailable={storageUnavailable}
      />
    </>
  );
};

export default ImageField;
