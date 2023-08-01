"use client";

import ImagePicker from "@/components/admin/ImagePicker";
import CreatePagesTitle from "@/components/shared/CreatePagesTitle";
import FormButton from "@/components/shared/FormButton";
import FormField from "@/components/shared/FormField";
import FormPartsLayout from "@/components/shared/FormPartsLayout";
import FormSelect from "@/components/shared/FormSelect";
import { IMedia } from "@/models/IMedia";
import { useCreateClubMutation } from "@/services/clubService";
import { countries } from "@/utils/events-filter-values";
import { createClubSchema } from "@/utils/validators";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

const CreateClubPage = () => {
  const [createClub, { isLoading, error }] = useCreateClubMutation();
  const { data: session, update } = useSession();
  const router = useRouter();
  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(createClubSchema),
  });

  const onSubmit = async (dto: any) => {
    let logo;
    if (dto.logo) {
      try {
        const formData = new FormData();
        formData.append("image", dto.logo);

        const { data: resData } = await axios.post<IMedia, any>(
          "http://localhost:4000/api/v1/images",
          formData
        );

        logo = resData;

        if (!logo) throw new Error("error uploading image");
      } catch (error) {
        console.log("error uploading image");
      }
    }
    try {
      // @ts-ignore
      const { data } = await createClub({ ...dto, logo: logo });

      if (!error && session) {
        await update({
          ...session,
          user: {
            ...session.user,
            club: data,
          },
        });
        router.push("/");
      }
    } catch (error) {
      console.log("error creating club");
    }
  };

  return (
    <>
      <CreatePagesTitle title="Create a club" />
      <main className="mx-auto my-5 sm:my-8 max-w-5xl">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormPartsLayout title="club details">
              <div className="w-full md:w-2/5">
                <FormField
                  label="Club name*"
                  name={"name"}
                  placeholder={"Enter name here..."}
                />
              </div>
              <div className="w-full md:w-2/5">
                <FormField
                  label="Contact number"
                  name={"phone"}
                  placeholder={"Enter number here (optional)..."}
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
            </FormPartsLayout>
            <FormPartsLayout title="Media">
              <div className="w-full">
                <ImagePicker name={"logo"} />
              </div>
            </FormPartsLayout>
            <div className="mx-5 md:w-1/2 lg:w-1/3 md:ml-auto">
              <FormButton
                title="create club"
                disabled={
                  !form.formState.isValid || form.formState.isSubmitting
                }
                isSubmitting={form.formState.isSubmitting}
                isLoading={form.formState.isSubmitting || isLoading}
              />
            </div>
          </form>
        </FormProvider>
      </main>
    </>
  );
};

export default CreateClubPage;