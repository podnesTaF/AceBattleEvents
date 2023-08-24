import { useCallback, useState } from "react";

import { LoaderArgs, json } from "@remix-run/node";
import {
  Link,
  isRouteErrorResponse,
  useLoaderData,
  useNavigate,
  useRouteError,
} from "@remix-run/react";

import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { Api } from "~/api/axiosInstance";

import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { Button, Divider } from "@mui/material";
import {
  FormButton,
  FormField,
  FormPartsLayout,
  FormSelect,
  GrayedInput,
  ImageField,
  PickList,
  UnregisteredAthlete,
} from "~/components";
import { teamTypes } from "~/lib/teams";
import { IUser } from "~/lib/types";
import { AddTeamSchema, authenticator, getCategoryByDoB } from "~/lib/utils";

export const loader = async ({ request }: LoaderArgs) => {
  let user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/auth/login",
  });

  const club = await Api().clubs.getClub(user?.clubId?.toString());

  if (!club) {
    throw new Response("Club not found", { status: 404 });
  }

  return json({ club, user });
};

export const defaultPlayer = {
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

  const registerPlayer = async (player: any) => {
    try {
      const user = await Api().users.registerUser(player);
      if (user) {
        return user.id;
      }
    } catch (error) {
      console.log(error, "registering player error");
    }
  };

  const onSubmit = async (dto: any) => {
    try {
      const players = await Promise.all(
        dto.players.map(async (player: any) => {
          const userId = await registerPlayer({
            ...player,
            club,
            role: "runner",
          });
          return userId;
        })
      );

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
        players: [...players, ...athleteList.map((a) => a.id)],
      });

      if (team) {
        navigate("/");
      }
    } catch (error: any) {
      console.log(error);
      throw new Response(`An error occurs while creating team`, {
        status: 402,
      });
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
              <UnregisteredAthlete
                field={field}
                index={index}
                avatarPreviews={avatarPreviews}
                removePlayer={removePlayer}
                setPlayerDialogOpen={setPlayerDialogOpen}
                playerDialogOpen={playerDialogOpen}
                setAvatarPreviews={setAvatarPreviews}
              />
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

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <div className="error-container">
          <div className="max-w-[400px] w-full py-4 mx-auto">
            <h3 className="text-3xl font-semibold">
              You don&apos; have a club yet. <br /> Maybe{" "}
              <Link to="/create-club" className="underline">
                create one
              </Link>
              ?
            </h3>
          </div>
        </div>
      );
    }
    return (
      <div className="error-container">
        <div className="max-w-[400px] w-full py-4 border-red-500 border-2 rounded-md">
          <h3 className="text-3xl font-semibold">{error.status}</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[400px] w-full py-4 border-red-500 border-2 rounded-md">
      <h3 className="text-xl font-semibold">
        There was an error loading close events.
      </h3>
    </div>
  );
}
