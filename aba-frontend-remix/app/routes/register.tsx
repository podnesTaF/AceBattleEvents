import { yupResolver } from "@hookform/resolvers/yup";
import { KeyboardArrowLeft } from "@mui/icons-material";
import { Link } from "@mui/material";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link as RemixLink, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Api } from "~/api/axiosInstance";
import ErrorPayments from "~/components/join/ErrorPayments";
import JoinStepper from "~/components/join/JoinStepper";
import StepLayout from "~/components/join/StepLayout";
import SuccessStep from "~/components/join/SuccessStep";
import {
  LoginInfo,
  PersonalInformation,
  RolePicker,
  RunnerInfo,
} from "~/components/join/steps";
import EmailConfirmationField from "~/components/join/steps/EmailConfirmationField";
import InfoOverview from "~/components/join/steps/InfoOverview";
import { JoinFormValues } from "~/lib/auth/utils/join-schema";
import { useOnRegister } from "~/lib/hooks";
import { useStepNavigation } from "~/lib/join/hooks/useStepNavigation";
import { IRole, IUser } from "~/lib/types";
import { getJoinSteps, joinSchema } from "~/lib/utils";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const urlParams = new URLSearchParams(request.url.split("?")[1]);
  const sessionId = urlParams.get("sessionId");
  const returnData: {
    roles: IRole[];
    user: IUser | null;
    status: string;
    sessionId?: string;
    countries: { id: number; name: string }[];
    genders: { id: number; name: string }[];
    distances: { id: number; name: string }[];
  } = {
    roles: [],
    user: null,
    status: "",
    countries: [],
    genders: [],
    distances: [],
  };

  const countries = await Api().dictionary.getCountries();
  const genders = await Api().dictionary.getGenders();
  const distances = await Api().dictionary.getDistances();

  returnData.countries = countries;
  returnData.genders = genders;
  returnData.distances = distances;

  try {
    const roles = await Api().roles.getRoles("type=product");
    returnData.roles = roles;
  } catch (error: any) {
    console.log(error.message);
  }

  if (sessionId) {
    try {
      const data = await Api().payments.handleSessionResult(sessionId);
      returnData.user = data.user;
      returnData.status = data.status;
      returnData.sessionId = sessionId;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  return json(returnData);
};

const JoinPage = () => {
  const { roles, user, status, sessionId, genders, countries, distances } =
    useLoaderData<typeof loader>();
  const { isLoading, onSubmit } = useOnRegister(roles);

  const form = useForm<JoinFormValues>({
    mode: "onChange",
    resolver: yupResolver(joinSchema),
  });

  const {
    activeStep,
    handleNext,
    handleBack,
    setActiveStep,
    errorSendingEmail,
    isVisible,
  } = useStepNavigation(0, roles, form, onSubmit);

  const joinSteps = getJoinSteps();

  useEffect(() => {
    if (user && status) {
      setActiveStep(6);
    }
  }, [status, user]);

  const { handleSubmit, control, getValues, watch } = form;

  return (
    <div className="w-full flex overflow-x-hidden min-h-screen">
      <div className="side-auth flex-1 h-auto relative hidden lg:block">
        <img
          src="/running.svg"
          className="w-36 2xl:w-64 absolute bottom-0 left-4 h-auto"
          alt="runners"
        />
      </div>
      <div className="flex-[3] bg-white min-h-screen flex flex-col justify-center items-center">
        <div className="w-full p-4 pt-10 lg:pt-4 flex flex-col">
          <Link
            component={RemixLink}
            to={"/"}
            className="flex items-center gap-2 text-red-400 absolute top-4 left-4"
          >
            <KeyboardArrowLeft className="text-red-400" />
            <h4 className="text-red-400 text-lg font-semibold">
              Back to Ace Battle Mile
            </h4>
          </Link>
          <div className="flex items-center mx-auto gap-6 sm:gap-8 max-w-xl">
            <img
              src={"/abm-logo-black.svg"}
              width={120}
              height={100}
              alt="Ace Battle Mile"
              className="w-20 md:w-24 h-auto lg:w-28"
            />
            <h4 className="font-semibold text-md md:text-xl">
              Welcome to Ace Battle Mile! Become a member of our sport
            </h4>
          </div>
        </div>
        <FormProvider {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex-1 flex flex-col w-full"
          >
            <JoinStepper
              steps={joinSteps}
              activeStep={activeStep}
              handleBack={handleBack}
              handleNext={handleNext}
              isSubmitting={isLoading}
            >
              <StepLayout step={joinSteps[activeStep]} isVisible={isVisible}>
                {activeStep === 0 && (
                  <PersonalInformation
                    countries={countries}
                    genders={genders}
                  />
                )}
                {activeStep === 1 && <RolePicker roles={roles} />}
                {activeStep === 2 && <RunnerInfo distances={distances} />}
                {activeStep === 3 && <LoginInfo />}
                {activeStep === 4 && (
                  <EmailConfirmationField
                    errorMessage={errorSendingEmail}
                    email={getValues("email")}
                  />
                )}
                {activeStep === 5 && (
                  <InfoOverview
                    countries={countries}
                    genders={genders}
                    distances={distances}
                    roles={roles}
                  />
                )}
                {activeStep === 6 &&
                  user &&
                  status &&
                  (status === "error" ? (
                    <ErrorPayments sessionId={sessionId} user={user} />
                  ) : (
                    <SuccessStep user={user} />
                  ))}
              </StepLayout>
            </JoinStepper>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default JoinPage;
