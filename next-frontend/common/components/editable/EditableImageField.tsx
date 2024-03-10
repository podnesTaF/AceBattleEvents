import ProfileItemWrapper from "@/app/(user)/_components/ProfileItemWrapper";
import { IUser } from "@/app/(user)/_lib/types";
import { getImageSrc } from "@/common/lib/utils";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../../../src/shared/ui/button";
import { Input } from "../../../src/shared/ui/input";

interface EditableImageFieldProps {
  user: IUser;
  onSave: (names: any[], values: (File | null)[]) => Promise<void>;
  title: string;
  name: string;
  children?: React.ReactNode;
}

const EditableImageField = ({
  user,
  onSave,
  title,
  children,
  name,
}: EditableImageFieldProps) => {
  const [edit, setEdit] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    user[`${name}Name` as keyof IUser]
      ? getImageSrc(user[`${name}Name` as keyof IUser], `${name}s`, user.id)
      : null
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setImageFile(file);
    setPreview(file ? URL.createObjectURL(file) : null);
    setEdit(true);
  };

  const updateField = async () => {
    await onSave([name], [imageFile]);
    setEdit(false);
  };

  const removeField = async () => {
    setImageFile(null);
    setPreview(null);
    await onSave([`${name}Name`], [null]);
    setEdit(false);
  };

  return (
    <ProfileItemWrapper className="gap-4 flex-col">
      <div className="flex gap-3 items-center">
        <h4 className="text-gray-400 w-44">{title}</h4>
        {edit ? (
          <>
            <div className="flex gap-2 items-center flex-[3]">
              {name === "avatar" && (
                <>
                  {preview && (
                    <Image
                      src={preview}
                      alt="Avatar Preview"
                      height={58}
                      width={58}
                      className="rounded-full"
                    />
                  )}
                  <Input
                    id="picture"
                    type="file"
                    className="max-w-xs"
                    onChange={handleFileChange}
                  />
                </>
              )}
            </div>
            <>
              <Button size="lg" onClick={updateField} className="font-semibold">
                Save
              </Button>
              <Button
                size="lg"
                onClick={removeField}
                className="font-semibold p-2 rounded-full"
                variant={"ghost"}
              >
                <Trash2Icon />
              </Button>
              <Button
                size="lg"
                onClick={() => setEdit(false)}
                className="font-semibold"
                variant="link"
              >
                Cancel
              </Button>
            </>
          </>
        ) : (
          <>
            <div className="flex-[3]">
              {name === "avatar" &&
                (preview ? (
                  <Image
                    src={preview}
                    alt={`${title}`}
                    height={58}
                    width={58}
                    className="rounded-full"
                  />
                ) : (
                  <h4 className="text-gray-400 flex-[3]">
                    No {title.toLowerCase()} set
                  </h4>
                ))}
            </div>
            <Button
              size="lg"
              onClick={() => setEdit(true)}
              className="font-semibold"
            >
              Edit
            </Button>
            <Button
              size="lg"
              onClick={removeField}
              className="font-semibold p-2 rounded-full"
              variant={"ghost"}
            >
              <Trash2Icon />
            </Button>
          </>
        )}
      </div>
      {name === "image" && (
        <div className="flex gap-5 justify-between items-end">
          <div className="max-w-52">
            <p className="text-md text-gray-400">
              *It will make easier to reach you on the actual competition.
              Please provide your real photo
            </p>
          </div>
          <div className="flex-1 h-48 flex justify-center items-center">
            {user.imageName || preview ? (
              <Image
                src={preview || getImageSrc(user.imageName, "images", user.id)}
                alt={title}
                height={200}
                width={200}
                className="rounded-md"
              />
            ) : (
              <Input
                id="picture"
                type="file"
                className="max-w-xs"
                onChange={handleFileChange}
              />
            )}
          </div>
        </div>
      )}
    </ProfileItemWrapper>
  );
};

export default EditableImageField;
