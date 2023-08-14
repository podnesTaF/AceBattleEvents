import { yupResolver } from "@hookform/resolvers/yup";
import { ActionArgs, LoaderArgs, json } from "@remix-run/node";
import { useActionData, useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Api } from "~/api/axiosInstance";
import RegistrationPopup from "~/components/events/RegistrationPopup";
import AgreeCheck from "~/components/shared/forms/AgreeCheck";
import FormButton from "~/components/shared/forms/FormButton";
import FormField from "~/components/shared/forms/FormField";
import FormSelect from "~/components/shared/forms/FormSelect";
import { formatDate } from "~/lib/events/utils/format-date";
import { registerAsViewerSchema } from "~/lib/registrations/utils/schemas";
import { genders } from "~/lib/teams/data/options-data";

export const loader = async ({ params, request }: LoaderArgs) => {
  const { eventId } = params;

  const event = await Api().events.getEvent(eventId || "");

  if (!event) {
    throw new Response("Event not found.", {
      status: 404,
    });
  }

  return json({ event });
};

export const action = async ({ request, params }: ActionArgs) => {
  const form = await request.formData();
  const firstName = form.get("firstName")?.toString();
  const lastName = form.get("lastName")?.toString();
  const email = form.get("email")?.toString();
  const gender = form.get("gender")?.toString();
  const discoveryMethod = form.get("discoveryMethod")?.toString();
  const agreeToTerms = form.get("agreeToTerms");
  const { eventId } = params;

  console.log(firstName, lastName, email, discoveryMethod, agreeToTerms);

  const registration = await Api().events.registerViewer({
    eventId: eventId || "",
    firstName,
    lastName,
    gender,
    email,
    discoveryMethod,
  });

  console.log(registration);

  if (registration) {
    return json({ registration, error: null });
  } else {
    return json({ registration: null, error: "Error registering" });
  }
};

const RegisterAsViewer = () => {
  const { event } = useLoaderData<typeof loader>();
  const data = useActionData<typeof action>();
  const [dialogOpen, setDialogOpen] = useState(true);

  const navigate = useNavigate();

  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(registerAsViewerSchema),
  });

  useEffect(() => {
    if (data?.registration) {
      setDialogOpen(true);
    }
  }, [data]);

  return (
    <>
      <header className="w-full flex flex-col-reverse md:flex-row md:h-96 xl:h-[450px] overflow-hidden">
        <div className="w-full md:w-1/2 h-64 md:h-96 xl:h-[450px]">
          <div className="p-6 md:p-8 bg-yellow-300 h-2/3 md:h-4/5 flex flex-col justify-start md:justify-center">
            <h1 className="text-2xl md:text-6xl font-semibold mb-4 md:mb-6">
              {event.title}
            </h1>
            <div className="text-xl font-semibold flex flex-col gap-2 md:flex-row">
              <p>{formatDate(event.startDateTime)}</p>
              <p>
                {event.location.country.name}, {event.location.city}
              </p>
            </div>
          </div>
          <div className="bg-black px-6 py-4 w-full h-1/3 md:h-1/5">
            <h3 className="text-2xl md:text-3xl font-semibold text-white">
              Online Registration
            </h3>
          </div>
        </div>
        <div className="w-full md:w-1/2 h-full relative">
          <img
            src={event.introImage?.mediaUrl || "/mice-of-brussels.jpg"}
            alt="logo"
            className="object-cover h-full w-full"
          />
          <button
            onClick={() => navigate(`/events/${event.id}`)}
            className="rounded-md absolute top-4 md:top-8 right-4 md:right-8 bg-green-400 text-white font-semibold text-xl py-3 px-4 hover:bg-green-600"
          >
            view event page
          </button>
        </div>
      </header>
      <main className="w-full relative">
        <img
          src={"/running.svg"}
          width={380}
          height={480}
          alt="running group"
          className="absolute bottom-4 left-4 -z-10"
        />
        <div className="max-w-4xl bg-[#F3F3F3]/50 mx-4 lg:mx-auto my-8 px-4 py-4 lg:px-8 rounded-md shadow-md">
          <p className="text-center text-lg md:text-xl mb-6">
            Fill a small form and get free ticket for the event
          </p>
          <FormProvider {...form}>
            <form method="post" className="flex w-full flex-col">
              <div className="w-full flex flex-col lg:flex-row justify-between lg:gap-4">
                <div className="w-full lg:w-6/12">
                  <FormField
                    name="firstName"
                    label="First name"
                    placeholder="e.g John"
                  />
                </div>
                <div className="w-full lg:w-6/12">
                  <FormField
                    name="lastName"
                    label="Last name"
                    placeholder="e.g Smith"
                  />
                </div>
              </div>
              <div className="w-full">
                <FormField
                  name="email"
                  label="Email address"
                  placeholder="e.g smith@domain.com"
                />
              </div>
              <div className="w-full flex flex-col lg:flex-row justify-between lg:gap-4">
                <div className="w-full lg:w-6/12">
                  <FormSelect
                    name={"gender"}
                    label={"Your Gender"}
                    placeholder={"Choose your gender"}
                    values={Object.entries(genders)}
                    onChangeFilter={() => {}}
                  />
                </div>
                <div className="w-full lg:w-6/12">
                  <FormSelect
                    name={"discoveryMethod"}
                    label={"How did you hear about “Ace Battle Mile”?"}
                    placeholder={"Choose an option"}
                    values={Object.entries(genders)}
                    onChangeFilter={() => {}}
                  />
                </div>
              </div>
              <div className="w-full mt-4">
                <AgreeCheck
                  name="agreeToTerms"
                  message="I agree with rules and terms of “Ace Battle Event”"
                />
              </div>
              <div className="w-[240px] mx-auto">
                <FormButton
                  className="w-full"
                  title="Submit"
                  isLoading={false}
                />
              </div>
            </form>
          </FormProvider>
        </div>
      </main>
      <RegistrationPopup
        event={event}
        registration={data?.registration}
        handleClose={() => setDialogOpen(false)}
        open={dialogOpen}
      />
    </>
  );
};

export default RegisterAsViewer;
