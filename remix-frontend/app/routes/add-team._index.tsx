import { yupResolver } from "@hookform/resolvers/yup";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { Button, Divider, IconButton } from "@mui/material";
import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useCallback, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { Api } from "~/api/axiosInstance";
import AddImageDialog from "~/components/media/AddImageDialog";
import ImageField from "~/components/media/ImageField";
import PickList from "~/components/media/PickList";
import FormButton from "~/components/shared/forms/FormButton";
import FormField from "~/components/shared/forms/FormField";
import FormPartsLayout from "~/components/shared/forms/FormPartsLayout";
import FormSelect from "~/components/shared/forms/FormSelect";
import GrayedInput from "~/components/shared/forms/GrayedInput";
import AddPlayerInfo from "~/components/teams/AddPlayerInfo";
import { authenticator } from "~/lib/auth/utils/auth.server";
import { getCategoryByDoB } from "~/lib/shared/utils/date-formaters";
import { teamTypes } from "~/lib/teams/data/options-data";
import { AddTeamSchema } from "~/lib/teams/utils/add-team-helpers";
import { IUser } from "~/lib/user/types/IUser";

export const loader = async ({ request }: LoaderArgs) => {
  let user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/auth/login",
  });

  const club = await Api().clubs.getClub(user?.clubId?.toString());

  return json({ club, user });
};

const defaultPlayer = {
  name: "",
  surname: "",
  dateOfBirth: "",
  gender: "",
  worldAthleticsUrl: "",
  id: Date.now().toString(),
};

const AddTeamIndex = () => {
  const { club, user } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const [athleteList, setAthleteList] = useState<any[]>([]);

  const [avatarPreviews, setAvatarPreviews] = useState<{
    [key: string]: { url: string; name: string };
  }>();

  const [playerDialogOpen, setPlayerDialogOpen] = useState<boolean>(false);

  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(AddTeamSchema),
    defaultValues: {
      players: [defaultPlayer],
    },
  });
  const { control, handleSubmit, watch, formState } = form;

  const { append, remove } = useFieldArray({
    control,
    name: "players",
  });

  const onAltheleListChange = useCallback((newItemList: any) => {
    setAthleteList(newItemList.map((item: any) => item.id));
  }, []);

  const removePlayer = useCallback((playerId: string, index: number) => {
    remove(index);
    setAvatarPreviews((prev) => {
      const newPreviews = { ...prev };
      delete newPreviews[playerId];
      return newPreviews;
    });
  }, []);

  const appendPlayer = () => {
    const id = Date.now() + "";

    setAvatarPreviews((prev: any) => ({
      ...prev,
      [id]: { url: "", name: "" },
    }));

    append({
      name: "",
      surname: "",
      dateOfBirth: "",
      gender: "",
      worldAthleticsUrl: "",
      id,
    });
  };

  const onSubmit = async (dto: any) => {
    try {
      const team = await Api(user.token).teams.addTeam({
        name: dto.name,
        clubId: club?.id || 0,
        country: dto.country,
        city: dto.city,
        coach: {
          name: dto.coachName,
          surname: dto.coachSurname,
        },
        gender: dto.type,
        teamImage: dto.teamImage,
        logo: dto.logo,
        players: dto.players.map((player: any) => ({
          name: player.name,
          surname: player.surname,
          dateOfBirth: player.dateOfBirth,
          gender: player.gender,
          worldAthleticsUrl: player.worldAthleticsUrl,
          image: player.image,
        })),
      });

      if (team) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormPartsLayout title="Team details">
          <div className="w-full md:w-2/5">
            <FormField
              label="Team name*"
              name={"name"}
              placeholder={"Enter name here..."}
            />
          </div>
          <div className="w-full md:w-2/5">
            <GrayedInput
              name={"club"}
              value={club?.name || ""}
              label={"Club"}
            />
          </div>
          <div className="w-full md:w-2/5">
            <GrayedInput
              name={"country"}
              value={club?.country || ""}
              label={"Country"}
            />
          </div>
          <div className="w-full md:w-2/5">
            <FormField
              label="City*"
              name={"city"}
              placeholder={"Enter club here..."}
            />
          </div>
          <div className="w-full md:w-2/5">
            <FormSelect
              name={"type"}
              label={"Team Type*"}
              placeholder={"Choose Gender"}
              values={Object.entries(teamTypes)}
              onChangeFilter={() => {}}
            />
          </div>
        </FormPartsLayout>
        <FormPartsLayout title="Coach">
          <div className="w-full md:w-2/5">
            <FormField
              label="First name*"
              name={"coachName"}
              placeholder={"Enter name here..."}
            />
          </div>
          <div className="w-full md:w-2/5">
            <FormField
              label="Surname*"
              name={"coachSurname"}
              placeholder={"Enter surname here..."}
            />
          </div>
        </FormPartsLayout>
        <div className="m-4">
          <h3 className="mb-3 text-2xl font-semibold">Players</h3>
          <PickList
            title={"Athletes from the club"}
            items={
              club?.members
                .filter((member: IUser) => member.role === "runner")
                .map((item: IUser) => ({
                  id: item.id,
                  title: item.name + " " + item.surname,
                  additionalInfo: getCategoryByDoB(item.dateOfBirth),
                })) || []
            }
            tabs={["Male", "Female"]}
            onSelectedListChange={onAltheleListChange}
          />
        </div>
        <div className="mx-4 my-6">
          <div className="flex flex-col w-full sm:flex-row justify-between mb-3">
            <h3 className=" mb-3 text-xl font-semibold">
              Add unregistered athletes*
            </h3>
            <p className="max-w-sm">
              *We will send password to each players&apos; email. The player
              will become a member of your club.
            </p>
          </div>
          {watch("players").map((field, index) => {
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
                      formState?.errors?.players &&
                      formState?.errors?.players[index]
                    }
                    errorInstance={
                      formState?.errors?.players &&
                      formState?.errors?.players[index]
                    }
                  />
                  <div className="mx-auto">
                    <ImageField
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
          })}
          <div className="w-full my-3 flex items-center">
            <div className="flex-1 mx-4 h-[2px] bg-red-500" />
            <Button
              variant="outlined"
              color="success"
              onClick={() => {
                appendPlayer();
              }}
            >
              <PersonAddAlt1Icon fontSize="large" />
            </Button>
          </div>
          <p className="font-semibold text-end">
            Team has to consist of at least 5 players*
          </p>
        </div>
        <FormPartsLayout title="Media">
          <div className="w-full">
            <ImageField title="upload team logo" name="logo" />
          </div>
          <Divider />
          <div className="w-full my-4">
            <div className="my-3">
              <ImageField title="upload Team Image" name="teamImage" />
            </div>
          </div>
        </FormPartsLayout>
        <div className="mx-5 md:w-1/2 lg:w-1/3 md:ml-auto">
          <FormButton
            title="add team"
            disabled={!formState.isValid || formState.isSubmitting}
            isSubmitting={formState.isSubmitting}
            isLoading={formState.isSubmitting}
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default AddTeamIndex;
