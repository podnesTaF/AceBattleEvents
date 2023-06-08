"use client";

import FormButton from "@/components/shared/FormButton";
import FormField from "@/components/shared/FormField";
import FormRadio from "@/components/shared/FormRadio";
import FormSelect from "@/components/shared/FormSelect";
import { useAddTeamMutation } from "@/services/teamService";
import { countries } from "@/utils/events-filter-values";
import { AddTeamSchema } from "@/utils/validators";
import { yupResolver } from "@hookform/resolvers/yup";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { Button, IconButton } from "@mui/material";
import { useEffect } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import FormLayout from "./FormLayout";

const AddTeam = () => {
  const [addTeam, { data, isLoading, error }] = useAddTeamMutation();

  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(AddTeamSchema),
    defaultValues: {
      players: [
        { name: "", surname: "", dateOfBirth: "", gender: "", id: Date.now() },
      ],
    },
  });

  const { control, formState, handleSubmit, watch } = form;

  const { append, remove } = useFieldArray({
    control,
    name: "players",
  });

  useEffect(() => {
    if (data) {
      form.reset();
    }
  }, [data]);

  const onSubmit = async (dto: any) => {
    await addTeam({
      name: dto.name,
      club: dto.club,
      country: dto.country,
      city: dto.city,
      coach: {
        name: dto.coachName,
        surname: dto.coachSurname,
      },
      players: dto.players.map((player: any) => ({
        name: player.name,
        surname: player.surname,
        dateOfBirth: player.dateOfBirth,
      })),
    });
  };
  return (
    <>
      <header className="w-full flex justify-center items-center h-48 sm:h-56 bg-[url('/add-team-sm.jpg')] md:bg-[url('/add-team-large.jpg')] bg-cover bg-no-repeat bg-center relative flex-col ">
        <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.4)] z-0"></div>
        <h2 className="text-white text-3xl uppercase semibold z-10">
          Add team
        </h2>
      </header>
      <main className="mx-auto my-5 sm:my-8 max-w-5xl">
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormLayout title="Team details">
              <div className="w-full md:w-2/5">
                <FormField
                  label="Team name*"
                  name={"name"}
                  placeholder={"Enter name here..."}
                />
              </div>
              <div className="w-full md:w-2/5">
                <FormField
                  label="Club"
                  name={"club"}
                  placeholder={"Enter club here (optional)..."}
                />
              </div>
              <div className="w-full md:w-2/5">
                <FormSelect
                  name={"country"}
                  label={"Country*"}
                  placeholder={"Choose country"}
                  values={Object.entries(countries)}
                  onChangeFilter={() => {}}
                />
              </div>
              <div className="w-full md:w-2/5">
                <FormField
                  label="City*"
                  name={"city"}
                  placeholder={"Enter club here..."}
                />
              </div>
            </FormLayout>
            <FormLayout title="Coach">
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
              <div className="w-full md:w-5/6">
                <div className="w-full md:w-2/5">
                  <h3>Gender</h3>
                  <FormRadio
                    options={[
                      { value: "male", label: "Male" },
                      { value: "female", label: "Female" },
                    ]}
                    onChange={() => {}}
                    name={"coachGender"}
                  />
                </div>
              </div>
            </FormLayout>
            <div className="m-4">
              <h3 className="text-center mb-3 text-2xl font-semibold">
                Players
              </h3>
              {watch("players").map((field, index) => {
                return (
                  <div key={field.id} className="rounded shadow-md p-4 my-5">
                    <div className="flex justify-between">
                      <p className="text-end mb-3 text-xl font-semibold">
                        {`Player ${index + 1}`}
                      </p>
                      <IconButton onClick={() => remove(index)}>
                        <PersonRemoveIcon fontSize="large" />
                      </IconButton>
                    </div>
                    <div className="flex flex-col md:flex-row flex-wrap gap-3 mb-3 justify-around">
                      <div className="w-full md:w-2/5">
                        <FormField
                          label="First name*"
                          name={`players[${index}].name`}
                          placeholder={"Enter name here..."}
                        />
                        {formState.errors.players &&
                          formState.errors.players[index] && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                              {formState?.errors?.players[index]?.name?.message}
                            </p>
                          )}
                      </div>
                      <div className="w-full md:w-2/5">
                        <FormField
                          label="Surname*"
                          name={`players[${index}].surname`}
                          placeholder={"Enter surname here..."}
                        />
                        {formState.errors.players &&
                          formState.errors.players[index] && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                              {
                                formState?.errors?.players[index]?.surname
                                  ?.message
                              }
                            </p>
                          )}
                      </div>
                      <div className="w-full md:w-2/5">
                        <FormField
                          label="Date Of Birth*"
                          name={`players[${index}].dateOfBirth`}
                          placeholder={"dd/mm/yyyy"}
                        />
                        {formState.errors.players &&
                          formState.errors.players[index] && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                              {
                                formState?.errors?.players[index]?.dateOfBirth
                                  ?.message
                              }
                            </p>
                          )}
                      </div>
                      <div className="w-full md:w-2/5">
                        <h3>Gender</h3>
                        <FormRadio
                          options={[
                            { value: "male", label: "Male" },
                            { value: "female", label: "Female" },
                          ]}
                          onChange={() => {}}
                          name={`players[${index}].gender`}
                        />
                        {formState.errors.players &&
                          formState.errors.players[index] && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                              {
                                formState?.errors?.players[index]?.gender
                                  ?.message
                              }
                            </p>
                          )}
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
                  onClick={() =>
                    append({
                      name: "",
                      surname: "",
                      dateOfBirth: "",
                      gender: "",
                      id: Date.now(),
                    })
                  }
                >
                  <PersonAddAlt1Icon fontSize="large" />
                </Button>
              </div>
              <p className="font-semibold text-end">
                Team has to consist of at least 5 players*
              </p>
            </div>
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
