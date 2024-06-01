import { FormControlLabel, Switch } from "@mui/material";
import { AxiosError } from "axios";
import { Controller, useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import { Api } from "~/api/axiosInstance";
import { IEventRaceType } from "~/lib/races/types/IEventRaceType";
import { IEvent } from "~/lib/types";
import { ParticipateSchema } from "~/lib/utils";

const RacePicker = ({ event }: { event: IEvent }) => {
  const { control, watch } = useFormContext<ParticipateSchema>();
  const {
    data: eventRaceTypes,
    isLoading,
    error,
  } = useQuery<IEventRaceType[], AxiosError>(
    "eventRaceTypes",
    () => Api().events.getEventRaceTypes(event.id),
    { enabled: !!event.id }
  );

  const selectedRaceTypes = watch("eventRaceTypes");

  return (
    <div className="flex flex-col flex-1">
      <h5 className="text-lg md:text-xl font-semibold my-4 xl:mb-6 pb-1 border-b border-b-gray-300">
        Choose races you want to participate in
      </h5>
      <div className="flex flex-col gap-4 md:gap-6 mb-8">
        {isLoading && <div>Loading...</div>}
        {error && <p>Error fetching event race types</p>}
        {eventRaceTypes?.map((ert) => (
          <div
            key={ert.id}
            className={`rounded-xl border border-gray-300 p-3 lg:p-4 ${
              selectedRaceTypes?.includes(ert.id.toString())
                ? "ring-blue-300 ring-1"
                : ""
            }`}
          >
            <FormControlLabel
              className="w-full gap-4"
              control={
                <Controller
                  name="eventRaceTypes"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      {...field}
                      checked={selectedRaceTypes.includes(ert.id.toString())}
                      onChange={(e) => {
                        if (e.target.checked) {
                          field.onChange([
                            ...selectedRaceTypes,
                            ert.id.toString(),
                          ]);
                        } else {
                          field.onChange(
                            selectedRaceTypes.filter(
                              (typeId) => typeId !== ert.id.toString()
                            )
                          );
                        }
                      }}
                      value={ert.id.toString()}
                      color="primary"
                    />
                  )}
                />
              }
              label={
                <div className="w-full flex flex-col gap-1">
                  <h5 className="text-md lg:text-lg font-semibold">
                    {ert.raceType.name.toUpperCase()}
                  </h5>
                  <p className="text-md lg:text-lg font-medium">
                    {ert.raceType.description}
                  </p>
                  <p className="text-sm lg:text-md font-semibold text-gray-400">
                    Free Participance
                  </p>
                </div>
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RacePicker;
