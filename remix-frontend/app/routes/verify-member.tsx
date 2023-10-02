import { Box, CircularProgress, Fade, Slide } from "@mui/material";
import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Api } from "~/api/axiosInstance";
import { IMedia } from "~/lib/types";

export const loader = async ({ request }: LoaderArgs) => {
  const token = new URL(request.url).searchParams.get("token");
  const ticket = new URL(request.url).searchParams.get("ticket");

  if (!token) {
    throw new Response("Invalid request");
  }

  const isValidToken = await Api().member.checkToken(token);

  if (!isValidToken) {
    return json({
      member: null,
      token,
      generateTicket: false,
    });
  }

  const member = await Api().member.getMemberToVerify(token);

  const verifiedMember = await Api().member.verify({
    member,
    token,
    ticket: !!ticket,
  });

  return json({
    member: verifiedMember,
    token,
    generateTicket: !!ticket,
  });
};

const VerifyMember = () => {
  const { member, generateTicket } = useLoaderData<typeof loader>();
  const [ticketLoading, setTicketLoading] = useState<boolean>(false);
  const [ticket, setTicket] = useState<IMedia>();

  useEffect(() => {
    if (generateTicket && !ticket && member) {
      (async () => {
        setTicketLoading(true);
        const registration = await Api().events.registerViewer({
          firstName: member.firstName,
          lastName: member.lastName,
          gender: member.gender,
          email: member.email,
        });

        setTicket(registration?.ticket);
        setTicketLoading(false);
      })();
    }
  }, []);
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
            <div className="w-full flex justify-center gap-6 sm:justify-center items-center mb-6">
              <img
                src="/abm-logo-black.svg"
                alt="logo-black"
                className="w-[100px] md:w-[150px] h-auto sm:absolute top-4 left-4"
              />
              {member ? (
                <div className="flex flex-col items-center justify-center gap-6">
                  <h2 className="font-semibold text-xl md:text-3xl text-center">
                    Congratulations!
                  </h2>
                  <h4 className="font-semibold text-lg md:text-xl text-center max-w-sm">
                    You successfully verified your email address
                  </h4>
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
            {member && (
              <Fade in={true} easing={"ease-in-out"}>
                <div className="flex flex-col gap-6 md:flex-row flex-1 justify-center items-center w-full max-w-4xl md:mx-auto mx-4 flex-nowrap">
                  <div
                    className={`max-w-md flex flex-col justify-center items-center gap-6 ${"border-b-2 pb-3 md:pb-0 md:pr-3 md:border-b-0 md:border-r-2 border-gray-200"} w-1/2`}
                  >
                    <img
                      src="/email-verified.svg"
                      width={200}
                      alt="confirm"
                      className="w-auto h-auto"
                    />
                    <p className="font-semibold text-center">
                      {member?.role === "runner"
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
              </Fade>
            )}
          </div>
        </Slide>
      </div>
    </Fade>
  );
};

export default VerifyMember;
