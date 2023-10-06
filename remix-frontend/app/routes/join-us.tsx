import { yupResolver } from "@hookform/resolvers/yup";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { Fade, IconButton, Slide, Snackbar } from "@mui/material";
import { useRef, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { Api } from "~/api/axiosInstance";
import {
  CustomCheck,
  CustomRadioGroup,
  FormButton,
  FormField,
  ResultsInputs,
  SlideLayout,
  UserDataFields,
} from "~/components";
import { JoinFormValues } from "~/lib/user/types/IMember";
import {
  getResultIsMs,
  isValidToGoNext,
  joinOptions,
  joinSchema,
} from "~/lib/utils";

const JoinUs = () => {
  const [step, setStep] = useState(1);

  const [isVisible, setIsVisible] = useState(true);

  const [role, setRole] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [distanceRunner, setDistanceRunner] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [email, setEmail] = useState("");

  const nodeRef = useRef(null);

  const form = useForm<JoinFormValues>({
    mode: "onBlur",
    resolver: yupResolver(joinSchema),
  });

  const { formState, handleSubmit, control, getValues, watch } = form;

  const onSubmit = async (dto: JoinFormValues) => {
    let runner: any = null;
    let spectator: any = null;

    if (dto.role === "runner") {
      runner = {
        dateOfBirth: dto.dateOfBirth,
        gender: dto.gender,
        category: dto.category,
      };
      runner.personalBests = dto.personalBests.map((pb) => ({
        distanceInCm: +pb.distanceInCm,
        timeInMs: getResultIsMs(pb.result),
      }));

      runner.seasonBests = dto.seasonBests.map((sb) => ({
        distanceInCm: +sb.distanceInCm,
        timeInMs: +getResultIsMs(sb.result),
      }));
    } else if (dto.role === "spectator") {
      spectator = {
        ageRange: dto.ageRange,
      };
    }

    try {
      const res = await Api().users.registerUser({
        ...dto,
        runner,
        spectator,
      });
      if (res) {
        setEmail(dto.email);
        setStep((prev) => prev + 1);
      }
    } catch (error: any) {
      setErrorMessage(error?.message);
    }
  };

  const handleNext = () => {
    if (!isValidToGoNext(step, getValues())) return;
    setIsVisible(false);
    setTimeout(() => {
      if (step === 1 && role === "spectator") {
        setStep(6);
      } else if (step === 3 && distanceRunner === "no") {
        setStep(6);
      } else {
        setStep(step + 1);
      }
      setIsVisible(true);
    }, 300); // Adjust the timeout duration as needed
  };

  const handlePrev = () => {
    if (step === 1) return;
    setIsVisible(false);
    setTimeout(() => {
      if (step === 6 && (role === "spectator" || distanceRunner === "no")) {
        setStep(1);
      } else {
        setStep(step - 1);
      }
      setIsVisible(true);
    }, 300); // Adjust the timeout duration as needed
  };

  const { append: appendPb, remove: removePb } = useFieldArray({
    control,
    name: "personalBests",
  });

  const { append: appendSb, remove: removeSb } = useFieldArray({
    control,
    name: "seasonBests",
  });

  return (
    <>
      <Fade in={isVisible} timeout={300} easing={"ease-in"}>
        <div className="h-screen-join flex justify-center items-center pb-8 relative w-full overflow-hidden">
          <img
            src="/join-us-bg-img.jpg"
            className="absolute w-full h-full left-0 top-0 auto-approximation object-cover"
          />
          <img
            src="/acebattlemile.svg"
            alt="logo"
            className="top-4 right-4 absolute max-w-[400px]"
          />
          <div className="bg-red-500 absolute left-0 top-0 hidden md:block md:w-1/2 lg:w-1/3 h-[90%] z-0"></div>
          <Slide direction="up" timeout={300} in={isVisible}>
            <div
              className="flex flex-col my-8 md:my-0 min-h-[560px] max-w-6xl mx-4 lg:mx-auto w-full bg-white shadow-xl rounded-md p-3 md:p-5 relative overflow-hidden text-an opacity-95"
              ref={nodeRef}
            >
              <div className="w-full flex gap-6 items-center justify-center mb-6 h-[100px] md:h-[150px]">
                <img
                  src="/abm-logo-black.svg"
                  alt="logo-black"
                  className="w-[100px] md:w-[150px] h-auto sm:absolute top-4 left-4"
                />
                {step !== 10 ? (
                  <h2 className="font-semibold text-xl md:text-3xl text-center">
                    Welcome to Ace Battle Mile!
                    <br />
                    Become a member of our sport
                  </h2>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-6">
                    <h2 className="font-semibold text-xl md:text-3xl text-center">
                      Congratulations!
                    </h2>
                    <h4 className="font-semibold text-lg md:text-xl text-center max-w-sm">
                      You are about to be a part of Ace Battle. Confirm your
                      email to finish the registation
                    </h4>
                  </div>
                )}
              </div>
              <FormProvider {...form}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex-1 flex flex-col w-full"
                >
                  {step === 1 && (
                    <SlideLayout
                      fadeIn={step === 1}
                      question={joinOptions[step].title}
                    >
                      <CustomRadioGroup
                        name={joinOptions[step].name}
                        radioOptions={joinOptions[step].options}
                        onChange={(value) => setRole(value)}
                      />
                    </SlideLayout>
                  )}
                  {step === 2 && (
                    <SlideLayout
                      fadeIn={step === 2}
                      question={joinOptions[step].title}
                    >
                      <CustomRadioGroup
                        name={joinOptions[step].name}
                        radioOptions={joinOptions[step].options}
                        onChange={(value) => setCategory(value)}
                      />
                    </SlideLayout>
                  )}
                  {step === 3 && (
                    <SlideLayout
                      fadeIn={step === 3}
                      extraInfo={joinOptions[step].extraInfo}
                      question={joinOptions[step].title}
                    >
                      <CustomRadioGroup
                        name={joinOptions[step].name}
                        radioOptions={joinOptions[step].options}
                        onChange={(value) => setDistanceRunner(value)}
                      />
                    </SlideLayout>
                  )}
                  {step === 4 && distanceRunner === "yes" && (
                    <SlideLayout
                      fadeIn={step === 4}
                      question={
                        "What is your personal best for those distances?"
                      }
                    >
                      <div className="flex gap-5 flex-wrap w-full">
                        {watch("personalBests").map(
                          (
                            field: {
                              distanceInCm: number;
                              result: string;
                            },
                            i: number
                          ) => (
                            <ResultsInputs
                              key={i}
                              field={field}
                              name={`personalBests`}
                              remove={() => removePb(i)}
                              i={i}
                            />
                          )
                        )}
                        <div className="w-full flex items-center sm:w-auto">
                          <div className="h-[1px] flex-1 sm:hidden bg-black" />
                          <IconButton
                            onClick={() =>
                              appendPb({
                                distanceInCm: 0,
                                result: "",
                              })
                            }
                          >
                            <ControlPointIcon fontSize="large" />
                          </IconButton>
                          <div className="h-[1px] flex-1 sm:hidden bg-black" />
                        </div>
                      </div>
                    </SlideLayout>
                  )}
                  {step === 5 && distanceRunner === "yes" && (
                    <SlideLayout
                      fadeIn={step === 5}
                      question={"What is your season best for those distances?"}
                    >
                      <div className="flex gap-5 flex-wrap w-full">
                        {watch("seasonBests").map(
                          (
                            field: {
                              distanceInCm: number;
                              result: string;
                            },
                            i: number
                          ) => (
                            <ResultsInputs
                              key={i}
                              field={field}
                              name={`seasonBests`}
                              remove={() => removeSb(i)}
                              i={i}
                            />
                          )
                        )}
                        <div className="w-full flex items-center sm:w-auto">
                          <div className="h-[1px] flex-1 sm:hidden bg-black" />
                          <IconButton
                            onClick={() =>
                              appendSb({
                                distanceInCm: 0,
                                result: "",
                              })
                            }
                          >
                            <ControlPointIcon fontSize="large" />
                          </IconButton>
                          <div className="h-[1px] flex-1 sm:hidden bg-black" />
                        </div>
                      </div>
                    </SlideLayout>
                  )}
                  {step === 6 && (
                    <SlideLayout
                      fadeIn={step === 6}
                      question={
                        "Please provide us some additional information about you"
                      }
                    >
                      <UserDataFields role={role} />
                    </SlideLayout>
                  )}
                  {step === 7 && (
                    <SlideLayout
                      fadeIn={step === 7}
                      question="What interests you about Ace Battle Mile?"
                    >
                      <div className="md:w-2/3 mx-4 md:mx-auto ">
                        <FormField
                          lines={6}
                          name="interest"
                          placeholder="write your answer here (optional)..."
                          label=""
                        />
                      </div>
                    </SlideLayout>
                  )}
                  {step === 8 && (
                    <SlideLayout
                      fadeIn={step === 8}
                      question={`
                      Add your email and accept terms and conditions.
                    `}
                    >
                      <div className="flex flex-col gap-2">
                        <div className="w-full md:w-2/3 mb-3">
                          <FormField
                            name={"email"}
                            label="Email"
                            placeholder="e.g example@example.com"
                          />
                        </div>
                        <div className="w-full md:w-2/3">
                          <CustomCheck
                            name={"acceptTerms"}
                            label={
                              "I agree with terms and conditions of 'Ace Battle Mile'"
                            }
                          />
                        </div>
                        <div className="w-full md:w-2/3">
                          <CustomCheck
                            name={"acceptNews"}
                            label={
                              "I want to stay updated with upcoming events and news"
                            }
                          />
                        </div>
                      </div>
                    </SlideLayout>
                  )}
                  {step === 9 && (
                    <Fade in={step === 9} easing={"ease-in-out"}>
                      <div className="flex-1 sm:mx-auto mx-4 max-w-md flex flex-col justify-center items-center gap-6">
                        <img
                          src="/confirm-email.svg"
                          width={200}
                          alt="confirm"
                          className="w-auto h-auto"
                        />
                        <p className="font-semibold text-center">
                          We have sent an email to{" "}
                          <span className="text-blue-400">{email}</span> to
                          confirm the validity of your email address. After
                          receiving the email follow the link provided to
                          complete your registratons.
                        </p>
                      </div>
                    </Fade>
                  )}
                  <div className="w-full flex justify-end mt-6 max-w-5xl mx-auto gap-6">
                    {step < 9 ? (
                      <Slide
                        direction="up"
                        container={nodeRef.current}
                        timeout={700}
                        in={isVisible}
                      >
                        <div>
                          <button
                            type={"button"}
                            className="bg-[#1E1C1F] text-white hover:text-gray-300 text-xl font-semibold p-3 disabled:cursor-not-allowed rounded-l-md shadow-md"
                            onClick={handlePrev}
                            disabled={step === 1}
                          >
                            Back
                          </button>
                          {step === 8 ? (
                            <FormButton
                              disabled={
                                !formState.isValid || formState.isSubmitting
                              }
                              isLoading={
                                formState.isLoading || formState.isSubmitting
                              }
                              title={"Connect Ace Battle Mile"}
                              className="rounded-l-none rounded-r-md w-auto px-6 py-3 text-xl font-semibold bg-green-400 text-white hover:text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                            />
                          ) : (
                            <button
                              disabled={
                                step !== 6 &&
                                !isValidToGoNext(step, getValues())
                              }
                              className="bg-green-400 text-white text-xl font-semibold hover:text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-r-md shadow-md"
                              type="button"
                              onClick={handleNext}
                            >
                              Next Step
                            </button>
                          )}
                        </div>
                      </Slide>
                    ) : null}
                  </div>
                </form>
              </FormProvider>
            </div>
          </Slide>
        </div>
      </Fade>
      <Snackbar
        message={errorMessage}
        open={!!errorMessage}
        onClose={() => setErrorMessage("")}
        autoHideDuration={2000}
      />
    </>
  );
};

export default JoinUs;
