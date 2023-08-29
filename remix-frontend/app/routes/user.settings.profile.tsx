import { yupResolver } from "@hookform/resolvers/yup";
import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { FormProvider, useForm } from "react-hook-form";
import { Api } from "~/api/axiosInstance";
import {
  FormButton,
  FormField,
  FormPartsLayout,
  FormSelect,
  ImageField,
} from "~/components";
import AdminHeader from "~/components/admin/AdminHeader";
import { countries } from "~/lib/shared";
import { updateProfileSchema } from "~/lib/user/utils/shemas";
import { authenticator } from "~/lib/utils";

export const loader = async ({ request }: LoaderArgs) => {
  const user = await authenticator.isAuthenticated(request);

  if (!user) {
    throw new Response(null, {
      status: 403,
      statusText: "Forbidden",
    });
  }

  return json({ user });
};

const ProfileSettings = () => {
  const { user } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const form = useForm({
    mode: "onChange",
    defaultValues: {
      name: user.name,
      surname: user.surname,
      city: user.city,
      country: user.country?.name,
      image: user.image,
    },
    resolver: yupResolver(updateProfileSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      const dto = {
        name: data.name,
        surname: data.surname,
        city: data.city,
        country: data.country,
        image: data.image,
      };

      await Api(user.token).users.updateProfile(dto);

      navigate(`/profile/${user.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <AdminHeader pageName="Settings" title="Profile" description="Settings" />
      <div className="w-full md:max-w-5xl mx-4 lg:mx-auto my-6">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormPartsLayout title="PROFILE INFO">
              <div className="w-full md:w-2/5">
                <FormField
                  label="First name*"
                  name={"name"}
                  placeholder={"Enter name here..."}
                />
              </div>
              <div className="w-full md:w-2/5">
                <FormField
                  label="City*"
                  name={"city"}
                  placeholder={"Enter city here..."}
                />
              </div>
              <div className="w-full md:w-2/5">
                <FormField
                  label="Surname*"
                  name={"surname"}
                  placeholder={"Enter surname here..."}
                />
              </div>
              <div className="w-full md:w-2/5">
                <FormSelect
                  name={`country`}
                  label={"Country*"}
                  placeholder={"Choose Country..."}
                  values={Object.entries(countries)}
                  onChangeFilter={() => {}}
                />
              </div>
              <div className="mx-auto my-4">
                <ImageField
                  defaulImage={
                    user.image && {
                      url: user.image.mediaUrl,
                      name: user.image.title,
                    }
                  }
                  title="upload avatar"
                  name={`image`}
                />
              </div>
              <div className="w-full flex justify-center">
                <div className="w-full md:w-1/2">
                  <FormButton
                    isLoading={form.formState.isSubmitting}
                    disabled={
                      form.formState.isSubmitting || !form.formState.isValid
                    }
                    title={"Update User"}
                  ></FormButton>
                </div>
              </div>
            </FormPartsLayout>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default ProfileSettings;
