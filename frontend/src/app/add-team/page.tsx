"use client";

import AddImageDialog from "@/components/admin/AddImageDialog";
import AddPlayerInfo from "@/components/shared/AddPlayerInfo";
import CreatePagesTitle from "@/components/shared/CreatePagesTitle";
import FormButton from "@/components/shared/FormButton";
import FormField from "@/components/shared/FormField";
import FormSelect from "@/components/shared/FormSelect";
import GrayedInput from "@/components/shared/GrayedInput";
import ImageField from "@/components/shared/ImageField";
import PickList from "@/components/shared/PickList";
import { useFetchClubQuery } from "@/services/clubService";
import { useAddTeamMutation } from "@/services/teamService";
import { teamTypes } from "@/utils/events-filter-values";
import { AddTeamSchema } from "@/utils/validators";
import { yupResolver } from "@hookform/resolvers/yup";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Button, Divider, IconButton } from "@mui/material";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import FormPartsLayout from "../../components/shared/FormPartsLayout";

const AddTeam = () => {
  const [addTeam, { data, isLoading, error }] = useAddTeamMutation();
  const { data: session } = useSession();
  const {
    data: club,
    isLoading: clubLoading,
    error: clubError,
  } = useFetchClubQuery({ id: session?.user.clubId || 0 });

  const [athleteList, setAthleteList] = useState<any[]>([]);
  const [personalBests, setPersonalBests] = useState<{
    [key: string]: { distance: string; time: string; id: number }[];
  }>({
    [Date.now() + ""]: [{ distance: "", time: "", id: Date.now() }],
  });

  const [avatarPreviews, setAvatarPreviews] = useState<{
    [key: string]: { url: string; name: string };
  }>();

  const [playerDialogOpen, setPlayerDialogOpen] = useState<boolean>(false);

  const router = useRouter();

  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(AddTeamSchema),
    defaultValues: {
      players: [
        {
          name: "",
          surname: "",
          dateOfBirth: "",
          gender: "",
          worldAthleticsUrl: "",
          id: Object.keys(personalBests)[0],
          personalBests: personalBests[Object.keys(personalBests)[0]],
        },
      ],
    },
  });

  const appendPlayer = () => {
    const id = Date.now() + "";
    setPersonalBests((prev: any) => ({
      ...prev,
      [id]: [{ distance: "", time: "", id: Date.now() }],
    }));

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
      personalBests: [{ distance: "", time: "", id: Date.now() }],
    });
  };

  const { control, formState, handleSubmit, watch } = form;

  const { append, remove } = useFieldArray({
    control,
    name: "players",
  });

  const onAltheleListChange = (newItemList: any) => {
    setAthleteList(newItemList.map((item: any) => item.id));
  };

  const removePlayer = (playerId: string, index: number) => {
    remove(index);
    setPersonalBests((prev: any) => {
      const newPbs = { ...prev };
      delete newPbs[playerId];
      return newPbs;
    });
    setAvatarPreviews((prev: any) => {
      const newPreviews = { ...prev };
      delete newPreviews[playerId];
      return newPreviews;
    });
  };

  const removePb = (playerId: string, pbIdx: number) => {
    setPersonalBests((prev: any) => ({
      ...prev,
      [playerId]: prev[playerId].filter((pb: any, i: number) => i !== pbIdx),
    }));
  };

  const appendPb = (playerId: string) => {
    const updatedPbs = personalBests[playerId];
    setPersonalBests((prev: any) => ({
      ...prev,
      [playerId]: updatedPbs.concat({ distance: "", time: "", id: Date.now() }),
    }));
  };

  useEffect(() => {
    setAvatarPreviews({
      [Object.keys(personalBests)[0]]: {
        url: "",
        name: "",
      },
    });
  }, []);

  const onSubmit = async (dto: any) => {
    try {
      await addTeam({
        name: dto.name,
        club: dto.club,
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
          personalBests: player.personalBests.map((pb: any) => ({
            distance: pb.distance,
            timeInSeconds: pb.time,
          })),
        })),
      });

      // router.back();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <CreatePagesTitle title="Add team" />
      <main className="mx-auto my-5 sm:my-8 max-w-5xl">
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
                    .filter((member) => member.role === "runner")
                    .map((item) => ({
                      id: item.id,
                      title: item.name + " " + item.surname,
                      additionalInfo: item.dateOfBirth,
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
                      {avatarPreviews && avatarPreviews[field.id].url && (
                        <div className="mb-4 flex w-full justify-center gap-4">
                          <h4 className="text-xl text-gray-500">
                            {avatarPreviews[field.id].name}
                          </h4>
                          <Image
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
                      <div className="my-3 w-full">
                        <h3 className="font-semibold text-2xl mb-3">
                          Personal Bests
                        </h3>
                        <div className="flex flex-col sm:flex-row flex-wrap">
                          {field.personalBests.map(
                            (personalBest: any, idx: number) => (
                              <div
                                key={personalBest.id}
                                className="flex w-full sm:w-1/2 lg:w-1/4 items-center"
                              >
                                <div className="mr-3 border-r-[1px] border-black h-4/5 flex items-center ">
                                  <IconButton
                                    onClick={() => {
                                      field.personalBests.splice(idx, 1);
                                      removePb(field.id, idx);
                                    }}
                                  >
                                    <RemoveCircleOutlineIcon fontSize="large" />
                                  </IconButton>
                                </div>
                                <div className="flex sm:flex-col w-full">
                                  <div className="mb-4 mr-3 sm:mb-2 sm:mr-4 w-full">
                                    <FormField
                                      label="distance*"
                                      type="number"
                                      name={`players[${index}].personalBests[${idx}].distance`}
                                      placeholder={"distance in m"}
                                    />
                                  </div>

                                  <div className="mb-4 sm:mb-2 sm:mr-4  w-full">
                                    <FormField
                                      label="time"
                                      type="number"
                                      name={`players[${index}].personalBests[${idx}].time`}
                                      placeholder={"time in s"}
                                    />
                                  </div>
                                </div>
                              </div>
                            )
                          )}

                          <div className="w-full flex items-center sm:w-auto">
                            <div className="h-[1px] flex-1 sm:hidden bg-black" />
                            <IconButton
                              onClick={() => {
                                field.personalBests.push({
                                  distance: "",
                                  time: "",
                                  id: Date.now(),
                                });
                                appendPb(field.id);
                              }}
                            >
                              <ControlPointIcon fontSize="large" />
                            </IconButton>
                            <div className="h-[1px] flex-1 sm:hidden bg-black" />
                          </div>
                        </div>
                        <p className="font-semibold text-end">
                          Fill personalBests or delete them*
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="w-full my-3 flex items-center">
                <div className="flex-1 mx-4 h-[2px] bg-red-500" />
                <Button
                  variant="outlined"
                  color="error"
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
                isLoading={formState.isSubmitting || isLoading}
              />
            </div>
          </form>
        </FormProvider>
      </main>
    </>
  );
};

export default AddTeam;
