"use client";

import FormField from "@/components/shared/FormField";
import { addEventSchema } from "@/utils/validators";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";

const AddEvent = () => {
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [activeSlide, setActiveSlide] = useState(0);

  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(addEventSchema),
    defaultValues: {
      prizes: [{ place: 1, prize: "" }],
    },
  });

  const { control, formState, handleSubmit, watch } = form;

  const { append, remove } = useFieldArray({
    control,
    name: "prizes",
  });

  const onSubmit = async (dto: any) => {
    console.log(dto);
  };

  return (
    <>
      <div className="w-full bg-[#1E1C1F] p-4">
        <h2 className="text-white text-3xl font-semibold">Add Event</h2>
      </div>
      <div className="mx-3 my-5 max-w-4xl md:mx-auto">
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="shadow-md p-4">
              {activeSlide === 0 && (
                <>
                  <h3 className="text-2xl sm:text-3xl text-center uppercase font-semibold mb-4">
                    Event info
                  </h3>
                  <div className="w-full flex flex-col gap-3">
                    <div className="w-full">
                      <FormField
                        name={"title"}
                        label={"Event title"}
                        placeholder={"enter event title"}
                      />
                    </div>
                    <div className="flex gap-3 w-full flex-col sm:flex-row">
                      <div className="w-full sm:w-1/2">
                        <div className="flex flex-col">
                          <label className="mb-3 text-xl" htmlFor="datetime">
                            Select Start Date and Time:
                          </label>
                          <div className="relative">
                            <input
                              type="datetime-local"
                              id="datetime"
                              value={selectedDateTime}
                              onChange={(e) =>
                                setSelectedDateTime(e.target.value)
                              }
                              className="appearance-none border border-gray-300 py-2 px-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default AddEvent;
