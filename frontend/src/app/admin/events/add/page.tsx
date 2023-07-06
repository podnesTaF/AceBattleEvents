"use client";

import FormButton from "@/components/shared/FormButton";
import FormField from "@/components/shared/FormField";
import FormSelect from "@/components/shared/FormSelect";
import { useAddEventMutation } from "@/services/eventService";
import { countries } from "@/utils/events-filter-values";
import { addEventSchema } from "@/utils/validators";
import { yupResolver } from "@hookform/resolvers/yup";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Button, Divider, IconButton } from "@mui/material";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";

const AddImageDialog = dynamic(
  () => import("@/components/admin/AddImageDialog")
);

const AddEvent = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [addEvent, { isLoading }] = useAddEventMutation();
  const [imageDialogOpen, setImageDialogOpen] = useState<boolean>(false);
  const [minorImagePreview, setMinorImagePreview] = useState<{
    url: string;
    name: string;
  }>({ url: "", name: "" });
  const [introImagePreview, setIntroImagePreview] = useState<{
    url: string;
    name: string;
  }>({ url: "", name: "" });
  const [minorImageOpen, setMinorImageOpen] = useState<boolean>(false);

  const router = useRouter();

  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(addEventSchema),
    defaultValues: {
      prizes: [{ place: "", amount: "", id: Date.now() }],
    },
  });

  const { control, formState, handleSubmit, watch, getValues } = form;

  const { append, remove } = useFieldArray({
    control,
    name: "prizes",
  });

  const onSubmit = async (dto: any) => {
    console.log(dto);
    const location = {
      country: dto.country,
      city: dto.city,
      address: dto.address,
      zipCode: dto.zipCode,
    };

    try {
      await addEvent({
        title: dto.title,
        startDateTime: dto.startDateTime,
        endDate: dto.endDate,
        location: location,
        prizes: dto.prizes.map((prize: any) => ({
          place: prize.place,
          amount: prize.amount,
        })),
        description: "description",
        introImage: dto.introImage,
        minorImage: dto.minorImage,
      });

      router.push("/admin/events");
    } catch (error) {
      console.log(error);
    }
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
                        <FormField
                          name={"startDateTime"}
                          label={"Select Start Date and Time:"}
                          placeholder={"enter start date and time"}
                          type="datetime-local"
                        />
                      </div>
                      <div className="w-full sm:w-1/2">
                        <FormField
                          name={"endDate"}
                          label={"Select End Date:"}
                          placeholder={"enter end date"}
                          type="date"
                        />
                      </div>
                    </div>
                    <div className="flex gap-3 w-full flex-col sm:flex-row">
                      <div className="w-full sm:w-1/2">
                        <FormSelect
                          name={"discipline"}
                          label={"Discipline*"}
                          placeholder={"Choose discipline"}
                          values={Object.entries({
                            outdoor: "Outdoor",
                            indoor: "Indoor",
                          })}
                          onChangeFilter={() => {}}
                        />
                      </div>
                      <div className="w-full sm:w-1/2">
                        <FormSelect
                          name={"category"}
                          label={"Category*"}
                          placeholder={"Choose category"}
                          values={Object.entries({
                            pro: "Pro",
                            amateur: "Amateur",
                          })}
                          onChangeFilter={() => {}}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
              {activeSlide === 1 && (
                <>
                  <h3 className="text-2xl sm:text-3xl text-center uppercase font-semibold mb-4">
                    Location
                  </h3>
                  <div className="w-full flex flex-col sm:flex-row gap-3">
                    <div className="w-full sm:w-1/2">
                      <FormSelect
                        name={"country"}
                        label={"Country*"}
                        placeholder={"Choose country"}
                        values={Object.entries(countries)}
                        onChangeFilter={() => {}}
                      />
                    </div>
                    <div className="w-full sm:w-1/2">
                      <FormField
                        label="City*"
                        name={"city"}
                        placeholder={"Enter city here..."}
                      />
                    </div>
                  </div>
                  <div className="w-full flex flex-col  sm:flex-row gap-3">
                    <div className="w-full sm:w-1/2">
                      <FormField
                        label="Address*"
                        name={"address"}
                        placeholder={"Enter address here..."}
                      />
                    </div>
                    <div className="w-full sm:w-1/2">
                      <FormField
                        label="zip code*"
                        name={"zipCode"}
                        placeholder={"Enter zipCode here..."}
                        type="number"
                      />
                    </div>
                  </div>
                </>
              )}
              {activeSlide === 2 && (
                <>
                  <h3 className="text-2xl sm:text-3xl text-center uppercase font-semibold mb-4">
                    Prizes (optional)
                  </h3>
                  <div className="w-full flex flex-col gap-3">
                    {watch("prizes")?.map((field, index) => (
                      <div
                        key={field.id}
                        className="flex gap-3 w-full pt-4 relative"
                      >
                        <div className="w-full sm:w-1/2">
                          <FormField
                            name={`prizes[${index}].place`}
                            label={"Place"}
                            placeholder={"enter place"}
                            type="number"
                          />
                        </div>
                        <div className="w-full sm:w-1/2">
                          <FormField
                            name={`prizes[${index}].amount`}
                            label={"Amount"}
                            type="number"
                            placeholder={"enter amount"}
                          />
                        </div>
                        <div className="absolute right-0 top-0">
                          <IconButton onClick={() => remove(index)}>
                            <RemoveCircleOutlineIcon />
                          </IconButton>
                        </div>
                      </div>
                    ))}
                    <div className="w-full flex justify-center">
                      <IconButton
                        onClick={() =>
                          append({
                            place: "",
                            amount: "",
                            id: Date.now(),
                          })
                        }
                      >
                        <AddCircleOutlineIcon
                          fontSize="large"
                          className={"text-red-500"}
                        />
                      </IconButton>
                    </div>
                  </div>
                </>
              )}
              {activeSlide === 3 && (
                <>
                  <h3 className="text-2xl sm:text-3xl text-center uppercase font-semibold mb-4">
                    Media
                  </h3>
                  <div className="w-full">
                    <div>
                      <div className="flex gap-4 mb-4 items-center">
                        <h4 className="text-gray uppercase text-xl font-semibold">
                          UPLOAD INTRO IMAGE
                        </h4>
                        <button
                          className="px-4 py-2 rounded-md bg-red-500 text-xl text-white font-semibold"
                          onClick={() => setImageDialogOpen(true)}
                        >
                          Open Storage
                        </button>
                      </div>
                      {introImagePreview.url && (
                        <div className="mb-4 flex w-full justify-center gap-4">
                          <div>
                            <h4 className="text-xl text-gray-500">
                              {introImagePreview.name}
                            </h4>
                          </div>
                          <Image
                            src={introImagePreview.url}
                            alt={"intro preview"}
                            width={400}
                            height={400}
                          />
                        </div>
                      )}
                      <AddImageDialog
                        isOpen={imageDialogOpen}
                        handleClose={() => setImageDialogOpen(false)}
                        name={"introImage"}
                        setIntroPreview={setIntroImagePreview}
                      />
                    </div>
                  </div>
                  <Divider />
                  <div className="w-full my-4">
                    <div className="flex gap-4 mb-4 items-center">
                      <h4 className="text-gray uppercase text-xl font-semibold">
                        UPLOAD MINOR IMAGE
                      </h4>
                      <button
                        className="px-4 py-2 rounded-md bg-red-500 text-xl text-white font-semibold"
                        onClick={() => setMinorImageOpen(true)}
                      >
                        Open Storage
                      </button>
                    </div>
                    {minorImagePreview.url && (
                      <div className="mb-4 flex w-full justify-center gap-4">
                        <h4 className="text-xl text-gray-500">
                          {minorImagePreview.name}
                        </h4>
                        <Image
                          src={minorImagePreview.url}
                          alt={"minor preview"}
                          width={400}
                          height={400}
                        />
                      </div>
                    )}
                    <AddImageDialog
                      isOpen={minorImageOpen}
                      handleClose={() => setMinorImageOpen(false)}
                      name={"minorImage"}
                      setIntroPreview={setMinorImagePreview}
                    />
                  </div>
                </>
              )}
              <div className="flex w-full justify-between mt-6 mb-3">
                <Button
                  onClick={() => {
                    setActiveSlide((prev) => prev - 1);
                  }}
                  variant="outlined"
                  type="button"
                  className="w-36"
                  disabled={activeSlide === 0}
                >
                  prev
                </Button>
                {activeSlide !== 3 ? (
                  <Button
                    onClick={() => {
                      setActiveSlide((prev) => prev + 1);
                    }}
                    color={"secondary"}
                    variant="outlined"
                    type={"button"}
                  >
                    Next
                  </Button>
                ) : (
                  <div className="max-w-xs">
                    <FormButton
                      title="create event"
                      disabled={!formState.isValid || formState.isSubmitting}
                      isSubmitting={formState.isSubmitting}
                      isLoading={formState.isSubmitting}
                    />
                  </div>
                )}
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default AddEvent;
