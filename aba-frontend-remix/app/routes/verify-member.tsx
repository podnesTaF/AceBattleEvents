import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, CircularProgress, Fade, Slide } from "@mui/material";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Api } from "~/api/axiosInstance";
import { FormButton, FormField } from "~/components";
import { setPasswordSchema } from "~/lib/auth/utils/join-schema";
import { IMedia, IUser } from "~/lib/types";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const token = new URL(request.url).searchParams.get("token");
  const ticket = new URL(request.url).searchParams.get("ticket");

  if (!token) {
    throw new Response("Invalid request");
  }

  const isValidToken = await Api().users.checkTokenToVerify(token);

  if (!isValidToken) {
    return json({
      user: null,
      token,
      generateTicket: false,
    });
  }

  const user = await Api().users.getUserToVerify(token);

  return json({
    user,
    token,
    generateTicket: !!ticket,
  });
};

const VerifyMember = () => {
  const { user, token, generateTicket } = useLoaderData<typeof loader>();
  const [ticketLoading, setTicketLoading] = useState<boolean>(false);
  const [ticket, setTicket] = useState<IMedia>();
  const [verifiedUser, setVerifiedUser] = useState<IUser | null>(null);

  const form = useForm<{
    password: string;
    confirmPassword: string;
  }>({
    mode: "onChange",
    resolver: yupResolver(setPasswordSchema),
  });

  const onChangePassword = async (data: {
    password: string;
    confirmPassword: string;
  }) => {
    try {
      const verified = await Api().users.verify({
        token,
        user,
        password: data.password,
      });

      if (verified) {
        setVerifiedUser(verified);
      }
    } catch (error: any) {
      console.log(error);
      form.setError("confirmPassword", {
        message: error.response?.data?.message?.[0],
      });
    }
  };

  return (
    <Fade in={true} timeout={300} easing={"ease-in"}>
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
        <Slide direction="up" timeout={300} in={true}>
          <div className="flex flex-col my-8 md:my-0 min-h-[560px] max-w-6xl mx-4 lg:mx-auto w-full bg-white shadow-xl rounded-md p-3 md:p-5 relative overflow-hidden text-an opacity-95">
            <div className="w-full flex justify-center gap-6 sm:justify-center items-center mb-6 sm:min-h-[150px]">
              <img
                src="/abm-logo-black.svg"
                alt="logo-black"
                className="w-[100px] md:w-[150px] h-auto sm:absolute top-4 left-4"
              />
              {verifiedUser ? (
                <div className="flex flex-col items-center justify-center gap-6">
                  <h2 className="font-semibold text-xl md:text-3xl text-center">
                    Congratulations!
                  </h2>
                  <h4 className="font-semibold text-lg md:text-xl text-center max-w-sm">
                    You successfully verified your email address
                  </h4>
                </div>
              ) : user ? (
                <div className="flex flex-col items-center justify-center gap-6">
                  <h2 className="font-semibold text-xl md:text-3xl text-center">
                    Please set new password to continue
                  </h2>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-6">
                  <h2 className="font-semibold text-xl md:text-3xl text-center">
                    Something went wrong while verifying you
                  </h2>
                  <h4 className="font-semibold text-lg md:text-xl text-center max-w-sm">
                    It is possible that you already verified your email address
                  </h4>
                </div>
              )}
            </div>
            {verifiedUser ? (
              <Fade in={true} easing={"ease-in-out"}>
                <div className="w-full">
                  <div className="flex flex-col gap-6 md:flex-row flex-1 justify-center items-center w-full max-w-4xl md:mx-auto mx-4 flex-nowrap">
                    <div
                      className={`max-w-md flex flex-col justify-center items-center gap-6 ${"border-b-2 pb-3 md:pb-0 md:pr-3 md:border-b-0 "} w-1/2`}
                    >
                      <img
                        src="/email-verified.svg"
                        width={200}
                        alt="confirm"
                        className="w-auto h-auto"
                      />
                      <p className="font-semibold text-center">
                        {user?.role === "runner"
                          ? "We are going to discuss possibility to participate in future events in near future."
                          : "Thanks for joining us. We will keep you updated with Ace Battle events and news"}
                      </p>
                    </div>
                    {generateTicket && (
                      <div className="flex flex-col justify-center items-center gap-6 w-1/2">
                        {ticketLoading ? (
                          <>
                            <Box
                              sx={{
                                display: "flex",
                                height: "150px",
                                alignItems: "center",
                              }}
                            >
                              <CircularProgress
                                size={"large"}
                                sx={{ width: 70, height: 70 }}
                              />
                            </Box>
                            <p className="font-semibold text-center">
                              Generating ticket...
                            </p>
                          </>
                        ) : (
                          <>
                            <img
                              src="/ticket-icon.png"
                              height={150}
                              alt="confirm"
                              className="w-auto h-[150px]"
                            />
                            <a
                              href={ticket?.mediaUrl}
                              download
                              target="_blank"
                              className="rounded-md text-white bg-green-400 px-4 py-2 font-semibold text-lg"
                            >
                              Download Ticket
                            </a>
                            <p className="font-semibold text-center">
                              {ticket
                                ? "Here is your ticket. You can download it and print it out"
                                : "You can download your ticket and print it out"}
                            </p>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="my-4 flex w-full justify-end">
                    <Button>
                      <Link
                        to="/auth/login"
                        className="underline text-blue-400"
                      >
                        Login
                      </Link>
                    </Button>
                  </div>
                </div>
              </Fade>
            ) : user ? (
              <div className="max-w-xl mx-4 sm:w-full sm:mx-auto">
                <FormProvider {...form}>
                  <form onSubmit={form.handleSubmit(onChangePassword)}>
                    <div className="w-full mb-4">
                      <FormField
                        name="password"
                        type="password"
                        placeholder="enter a new password"
                        label="Password"
                      />
                    </div>
                    <div className="w-full mb-4">
                      <FormField
                        name="confirmPassword"
                        type="password"
                        placeholder="confirm a password"
                        label="Confirm Password"
                      />
                    </div>
                    <FormButton
                      disabled={
                        !form.formState.isValid || form.formState.isSubmitting
                      }
                      isLoading={form.formState.isSubmitting}
                      title={"Confirm"}
                    />
                  </form>
                </FormProvider>
              </div>
            ) : null}
          </div>
        </Slide>
      </div>
    </Fade>
  );
};

export default VerifyMember;
