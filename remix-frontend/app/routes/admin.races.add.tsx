import { yupResolver } from "@hookform/resolvers/yup";
import { json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Api } from "~/api/axiosInstance";
import { FormButton, FormField, FormSelect } from "~/components";
import { createRaceSchema, transformDataToSelect } from "~/lib/utils";

export const loader = async () => {
  const eventsSnippets = await Api().events.getEventsSnippet();

  return json({
    eventsSnippets,
  });
};

const AdminRacesAdd = () => {
  const { eventsSnippets } = useLoaderData<typeof loader>();
  const [chosenEvent, setChosenEvent] = useState<number>();
  const [teams, setTeams] = useState<{ id: number; name: string }[]>([]);
  const navigate = useNavigate();

  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(createRaceSchema),
  });

  const onSubmit = async (dto: any) => {
    try {
      const race = await Api().races.createRace({
        teamIds: [dto.team1Id, dto.team2Id],
        eventId: dto.eventId,
        startTime: dto.startTime,
      });
      navigate("/admin/races");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!chosenEvent) return;
    (async () => {
      const teamsSnippets = await Api().teams.getTeamsSnippetsByEventId(
        chosenEvent
      );
      if (teamsSnippets) {
        setTeams(teamsSnippets);
      }
    })();
  }, [chosenEvent]);

  return (
    <>
      <div className="w-full bg-[#1E1C1F] p-4">
        <h2 className="text-white text-3xl font-semibold">Add Event</h2>
      </div>
      <div className="mx-3 my-5 max-w-4xl md:mx-auto">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="shadow-md p-4">
              <div className="w-full flex flex-col gap-3">
                <div className="w-full">
                  <FormSelect
                    name={"eventId"}
                    label={"Race for Event*"}
                    placeholder={"Choose Event"}
                    values={Object.entries(
                      transformDataToSelect(eventsSnippets)
                    )}
                    onChangeFilter={(value) => setChosenEvent(+value)}
                  />
                </div>
                <div className="flex gap-3 w-full flex-col sm:flex-row">
                  <div className="w-full sm:w-2/5">
                    <FormSelect
                      name={"team1Id"}
                      label={"Choose team 1*"}
                      placeholder={"Choose team"}
                      values={Object.entries(transformDataToSelect(teams))}
                      onChangeFilter={() => {}}
                    />
                  </div>
                  <div className="flex justify-center w-1/5 self-center">
                    vs
                  </div>
                  <div className="w-full sm:w-2/5">
                    <FormSelect
                      name={"team2Id"}
                      label={"Choose team 2*"}
                      placeholder={"Choose team"}
                      values={Object.entries(transformDataToSelect(teams))}
                      onChangeFilter={() => {}}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <FormField
                    name={"startTime"}
                    label={"Select Start Date and Time:"}
                    placeholder={"enter start date and time"}
                    type="datetime-local"
                  />
                </div>
              </div>
              <div className="w-full justify-center">
                <FormButton
                  title="create event"
                  disabled={
                    !form.formState.isValid || form.formState.isSubmitting
                  }
                  isSubmitting={form.formState.isSubmitting}
                  isLoading={form.formState.isSubmitting}
                />
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default AdminRacesAdd;
