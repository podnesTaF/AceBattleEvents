import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { IconButton } from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormSelect, ResultsInputs } from "~/components/shared";
import { JoinFormValues } from "~/lib/auth/utils/join-schema";

const RunnerInfo = ({
  distances,
}: {
  distances: { id: number; name: string }[];
}) => {
  const { watch, control } = useFormContext<JoinFormValues>();

  const { append: appendPb, remove: removePb } = useFieldArray({
    control,
    name: "personalBests",
  });

  const { append: appendSb, remove: removeSb } = useFieldArray({
    control,
    name: "seasonBests",
  });

  return (
    <div className="my-4">
      <FormSelect
        className="w-full"
        name={`category`}
        label="What is your category?"
        placeholder="Choose category"
        values={Object.entries({
          professional: "Professional Runner",
          amateur: "Amateur",
        })}
        onChangeFilter={() => {}}
      />
      <div className="flex flex-col gap-3 md:flex-row mt-4 lg:gap-5 2xl:gap-[5%]">
        <div className="flex-1">
          <h4 className="mb-3">What are your best result?</h4>
          {watch("personalBests")?.map((field, i) => (
            <ResultsInputs
              key={i}
              distances={distances}
              field={field}
              name={`personalBests`}
              remove={() => removePb(i)}
              i={i}
            />
          ))}
          <div className="w-full flex items-center sm:w-auto">
            <div className="h-[1px] flex-1 sm:hidden bg-black" />
            <IconButton
              onClick={() =>
                appendPb({
                  distanceId: 0,
                  result: "",
                  type: "personalBest",
                })
              }
            >
              <ControlPointIcon fontSize="large" />
            </IconButton>
            <div className="h-[1px] flex-1 sm:hidden bg-black" />
          </div>
        </div>
        <div className="flex-1">
          <h4 className="mb-3">What are your season best result?</h4>
          {watch("seasonBests")?.map((field, i) => (
            <ResultsInputs
              key={i}
              distances={distances}
              field={field}
              name={`seasonBests`}
              remove={() => removeSb(i)}
              i={i}
            />
          ))}
          <div className="w-full flex items-center sm:w-auto">
            <div className="h-[1px] flex-1 sm:hidden bg-black" />
            <IconButton
              onClick={() =>
                appendSb({
                  distanceId: 0,
                  result: "",
                  type: "seasonBest",
                })
              }
            >
              <ControlPointIcon fontSize="large" />
            </IconButton>
            <div className="h-[1px] flex-1 sm:hidden bg-black" />
          </div>
        </div>
      </div>
      <p className="mt-2 text-gray-300">
        Leave blank if you don't have relevant results
      </p>
    </div>
  );
};

export default RunnerInfo;
