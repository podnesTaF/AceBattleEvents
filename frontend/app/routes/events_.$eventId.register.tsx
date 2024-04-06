import { ActionArgs, LoaderArgs, json } from "@remix-run/node";
import { useActionData, useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { Api } from "~/api/axiosInstance";
import {
  AgreeCheck,
  FormButton,
  FormField,
  FormSelect,
  RegistrationPopup,
} from "~/components";
import { genders } from "~/lib/teams";
import { authenticator, formatDate, registerAsViewerSchema } from "~/lib/utils";

export const loader = async ({ params, request }: LoaderArgs) => {
  const { eventId } = params;

  const event = await Api().events.getEvent(eventId || "");

  const user = await authenticator.isAuthenticated(request);

  if (!event) {
    throw new Response("Event not found.", {
      status: 404,
    });
  }

  return json({ event, user });
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

  const authedUser = await authenticator.isAuthenticated(request);

  try {
    const registration = await Api().events.registerViewer({
      firstName,
      lastName,
      gender,
      email,
    });

    if (registration) {
      return json({
        registration,
        authedUser: authedUser || null,
        error: null,
      });
    } else {
      return json({
        registration: null,
        authedUser: authedUser || null,
        error: "Error registering",
      });
    }
  } catch (error: any) {
    console.log(error);
    return json({
      registration: null,
      authedUser: authedUser || null,
      error: "Error registering: " + error.message,
    });
  }
};

const RegisterAsViewer = () => {
  const { event, user } = useLoaderData<typeof loader>();
  const data = useActionData<typeof action>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isFormShown, setIsFormShown] = useState(user ? false : true);
  const [formatedDate, setFormatedDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(registerAsViewerSchema),
  });

  useEffect(() => {
    setFormatedDate(formatDate(event.startDateTime));
  }, []);

  useEffect(() => {
    if (data) {
      setDialogOpen(true);
    }
  }, [data]);

  useEffect(() => {
    if (user && !isFormShown) {
      form.setValue("firstName", user.name);
      form.setValue("lastName", user.surname);
      form.setValue("email", user.email);
    }
  }, [user, isFormShown]);

  const handleClose = () => {
    setDialogOpen(false);
    if (!data?.error) {
      navigate(`/events/${event.eventCode}`);
    } else {
      navigate(`/events/${event.id}/register`);
    }
  };

  return (
    <>
      <header className="w-full flex flex-col-reverse md:flex-row md:h-96 xl:h-[450px] overflow-hidden">
        <div className="w-full md:w-1/2 h-64 md:h-96 xl:h-[450px]">
          <div className="p-6 md:p-8 bg-yellow-300 h-2/3 md:h-4/5 flex flex-col justify-start md:justify-center">
            <h1 className="text-2xl md:text-6xl font-semibold mb-4 md:mb-6">
              {event.title}
            </h1>
            <div className="text-xl font-semibold flex flex-col gap-2 md:flex-row">
              <p>{formatedDate}</p>
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
            onClick={() => navigate(`/events/${event.eventCode}`)}
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
              {user && (
                <div className="mb-4 mt-6 flex justify-between w-full gap-4">
                  <Button
                    variant={`${isFormShown ? "outlined" : "contained"}`}
                    className={`font-semibold text-xl`}
                    color="primary"
                    type="button"
                    onClick={() => setIsFormShown(false)}
                  >
                    register as a {user.email}
                  </Button>
                  <Button
                    variant={`${isFormShown ? "contained" : "outlined"}`}
                    className="font-semibold text-xl"
                    color="primary"
                    type="button"
                    onClick={() => setIsFormShown(true)}
                  >
                    register on another email
                  </Button>
                </div>
              )}
              <div className={`${isFormShown ? "block" : "hidden"}`}>
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
              </div>
              <div className="md:w-2/3 mx-4 md:mx-auto">
                <FormField
                  lines={6}
                  name="interest"
                  placeholder="write your answer here (optional)..."
                  label="How did you find out about this event?"
                />
              </div>
              <div className="w-full mt-4">
                <AgreeCheck
                  name="agreeToTerms"
                  message="I agree with rules and terms of “Ace Battle Event”"
                />
              </div>
              <div className="w-[240px] mx-auto">
                <FormButton title="Submit" isLoading={isLoading} />
              </div>
            </form>
          </FormProvider>
        </div>
      </main>
      <RegistrationPopup
        event={event}
        registration={data?.registration}
        error={data?.error}
        handleClose={handleClose}
        open={dialogOpen}
      />
    </>
  );
};

export default RegisterAsViewer;
