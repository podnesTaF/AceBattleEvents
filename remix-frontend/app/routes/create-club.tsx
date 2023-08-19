import { yupResolver } from "@hookform/resolvers/yup";
import { LoaderArgs } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useNavigate,
  useRouteError,
} from "@remix-run/react";
import { FormProvider, useForm } from "react-hook-form";
import { Api } from "~/api/axiosInstance";
import ImagePicker from "~/components/media/ImagePicker";
import FormButton from "~/components/shared/forms/FormButton";
import FormField from "~/components/shared/forms/FormField";
import FormPartsLayout from "~/components/shared/forms/FormPartsLayout";
import FormSelect from "~/components/shared/forms/FormSelect";
import CreatePagesTitle from "~/components/shared/header/CreatePagesTitle";
import { authenticator } from "~/lib/auth/utils/auth.server";
import { createClubSchema } from "~/lib/clubs/utils/shemas";
import { countries } from "~/lib/shared/data/countries";

export const loader = async ({ request }: LoaderArgs) => {
  const user = await authenticator.isAuthenticated(request);

  if (!user || user.role !== "manager" || user.clubId) {
    throw new Response("Unauthorized", {
      status: 403,
    });
  }

  return { user };
};

export const action = async ({ request }: LoaderArgs) => {
  const form = await request.formData();

  const name = form.get("name");
  const phone = form.get("phone");
  const country = form.get("country");
  const city = form.get("city");
  const logo: any = form.get("logo");
  const photo: any = form.get("photo");

  console.log("logo", logo);
};

const CreateClubPage = () => {
  const { user } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(createClubSchema),
  });

  const onSubmit = async (dto: any) => {
    let mediaLogo;
    let mediaPhoto;
    if (dto.logo || dto.photo) {
      const files = [dto.logo, dto.photo];
      for (let i = 0; i < files.length; i++) {
        if (files[i]) {
          const formData = new FormData();
          formData.append("image", files[i]);
          const { data: resData } = await Api().media.addMedia(formData);
          if (i === 0) {
            mediaLogo = resData;
          } else {
            mediaPhoto = resData;
          }
        }
      }
      if (!mediaLogo && !mediaPhoto) throw new Error("error uploading image");
    }

    try {
      // @ts-ignore
      const data = await Api(user?.token).clubs.createClub({
        name: dto.name,
        phone: dto.phone,
        country: dto.country,
        city: dto.city,
        logo: mediaLogo,
        photo: mediaPhoto,
      });
      if (data) {
        navigate(`/clubs/${data.id}`);
      }
    } catch (error: any) {
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
              <div className="w-full mb-6">
                <ImagePicker name={"logo"} />
              </div>
              <div className="w-full">
                <ImagePicker name={"photo"} />
              </div>
            </FormPartsLayout>
            <div className="mx-5 md:w-1/2 lg:w-1/3 md:ml-auto">
              <FormButton
                title="create club"
                disabled={
                  !form.formState.isValid || form.formState.isSubmitting
                }
                isSubmitting={form.formState.isSubmitting}
                isLoading={form.formState.isSubmitting}
              />
            </div>
          </form>
        </FormProvider>
      </main>
    </>
  );
};

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 403) {
      return (
        <div className="error-container">
          <h3 className="text-3xl font-semibold">
            {error.status} Unauthorized
          </h3>
        </div>
      );
    }
    return (
      <div className="max-w-[400px] w-full py-4 border-red-500 border-2 rounded-md">
        <h3 className="text-xl font-semibold">
          {error.status} {error.statusText}
        </h3>
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

export default CreateClubPage;