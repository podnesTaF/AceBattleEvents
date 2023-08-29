import { LoaderArgs } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { FormProvider, useForm } from "react-hook-form";
import { Api } from "~/api/axiosInstance";
import { AddTeamSchema, authenticator, getPickItems } from "~/lib/utils";

import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useState } from "react";
import {
  FormButton,
  FormField,
  FormPartsLayout,
  FormSelect,
  PickList,
} from "~/components";
import { teamTypes } from "~/lib/teams";

export const loader = async ({ request, params }: LoaderArgs) => {
  const { teamId } = params;
  if (!teamId) {
    throw new Response(null, {
      status: 404,
      statusText: "Not found",
    });
  }

  const user = await authenticator.isAuthenticated(request);

  if (!user) {
    throw new Response(null, {
      status: 403,
      statusText: "Forbidden",
    });
  }

  const team = await Api(user?.token).teams.getTeamById(teamId);

  if (!team) {
    throw new Response(null, {
      status: 404,
      statusText: "Not found",
    });
  }

  return {
    team,
    user,
  };
};

const TeamSettingsPage = () => {
  const { team, user } = useLoaderData<typeof loader>();
  const [athleteList, setAthleteList] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<string>("male");
  const navigate = useNavigate();

  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(AddTeamSchema),
    defaultValues: {
      name: team.name,
      city: team.city,
      type: team.gender,
      coachName: team.coach.name,
      coachSurname: team.coach.surname,
    },
  });

  const { control, handleSubmit, watch, formState } = form;

  const onSubmit = async (dto: any) => {
    const newTeam = {
      name: dto.name,
      city: dto.city,
      gender: dto.type,
      coach: {
        name: dto.coachName,
        surname: dto.coachSurname,
      },
      players: athleteList,
    };

    try {
      const updated = await Api(user.token).teams.updateTeam(team.id, newTeam);
      if (updated) {
        navigate("/teams/" + team.id);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onAltheleListChange = useCallback((newItemList: any) => {
    setAthleteList(newItemList.map((item: any) => item.id));
  }, []);

  return (
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
            <div className="w-full md:w-2/5">
              <FormField
                label="Coach name*"
                name={"coachName"}
                placeholder={"Enter name here..."}
              />
            </div>
            <div className="w-full md:w-2/5">
              <FormField
                label="Coach Surname*"
                name={"coachSurname"}
                placeholder={"Enter surname here..."}
              />
            </div>
          </FormPartsLayout>
          <div className="m-4">
            <h3 className="mb-3 text-2xl font-semibold">Edit structure</h3>
            <PickList
              title={"Athletes from the club"}
              defaultSelectedItems={getPickItems(team.players)}
              items={getPickItems(
                team.club.members.filter(
                  (member) =>
                    member.role === "runner" && member.gender === activeTab
                )
              )}
              tabs={["Male", "Female"]}
              onSelectedListChange={onAltheleListChange}
              setActiveTab={setActiveTab}
            />
          </div>
          <div className="my-5 w-full flex justify-center">
            <FormButton
              className="w-full sm:w-1/2"
              isLoading={formState.isSubmitting}
              disabled={!formState.isValid}
              title={"update team"}
            />
          </div>
        </form>
      </FormProvider>
    </main>
  );
};

export default TeamSettingsPage;
