import { IconButton } from "@mui/material";
import { FieldErrorsImpl, useFormContext } from "react-hook-form";
import { defaultPlayer } from "~/routes/add-team._index";
import { AddImageDialog, ImageField } from "../media";
import AddPlayerInfo from "./AddPlayerInfo";

import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { TabNames } from "../media/AddImageDialog";

interface IAddPlayerInfo {
  field: typeof defaultPlayer;
  index: number;
  avatarPreviews: any;
  removePlayer: (id: string, index: number) => void;
  setPlayerDialogOpen: (open: boolean) => void;
  playerDialogOpen: boolean;
  setAvatarPreviews: (prev: any) => void;
}

const UnregisteredAthlete: React.FC<IAddPlayerInfo> = ({
  field,
  index,
  avatarPreviews,
  removePlayer,
  setPlayerDialogOpen,
  setAvatarPreviews,
  playerDialogOpen,
}) => {
  const { formState } = useFormContext();

  return (
    <div key={field.id} className="rounded shadow-md p-4 my-5">
      <div className="flex justify-between">
        <p className="text-end mb-3 text-xl font-semibold">
          {`Player ${index + 1}`}
        </p>
        <IconButton onClick={() => removePlayer(field.id, index)}>
          <PersonRemoveIcon fontSize="large" />
        </IconButton>
      </div>
      <div className="flex flex-col md:flex-row flex-wrap gap-3 mb-3 justify-around">
        <AddPlayerInfo
          name={`players[${index}]`}
          errorState={
            (formState?.errors?.players as FieldErrorsImpl<any>)?.[index]
          }
          errorInstance={
            (formState?.errors?.players as FieldErrorsImpl<any>)?.[index]
          }
        />
        <div className="mx-auto">
          <ImageField
            tabs={[TabNames.upload]}
            title="upload avatar"
            name={`players[${index}].image`}
          />
        </div>
        {avatarPreviews && avatarPreviews[field.id]?.url && (
          <div className="mb-4 flex w-full justify-center gap-4">
            <h4 className="text-xl text-gray-500">
              {avatarPreviews[field.id].name}
            </h4>
            <img
              src={avatarPreviews[field.id].url}
              alt={"avatar preview"}
              width={400}
              height={400}
            />
          </div>
        )}
        <AddImageDialog
          isOpen={playerDialogOpen}
          handleClose={() => setPlayerDialogOpen(false)}
          name={"image"}
          tabs={[TabNames.upload]}
          setIntroPreview={(preview: any) => {
            setAvatarPreviews((prev: any) => ({
              ...prev,
              [field.id]: preview,
            }));
          }}
        />
      </div>
    </div>
  );
};

export default UnregisteredAthlete;
