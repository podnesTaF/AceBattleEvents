import { Button } from "@mui/material";
import { Link } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { Api } from "~/api/axiosInstance";

import { IParticipant } from "~/lib/registrations/types/IParticipant";

const ConfirmEmail = ({
  participant,
  eventCode,
}: {
  participant: IParticipant & { ott: string };
  eventCode: string;
}) => {
  const isAlreadySending = useRef(false);
  const [timeBeforeResend, setTimeBeforeResend] = useState(60);
  const resendIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleInterval = () => {
    if (resendIntervalRef.current !== null) {
      clearInterval(resendIntervalRef.current);
    }
    resendIntervalRef.current = setInterval(() => {
      setTimeBeforeResend((time) => {
        if (time > 1) {
          return time - 1;
        } else {
          clearInterval(resendIntervalRef.current!);
          resendIntervalRef.current = null;
          return 0;
        }
      });
    }, 1000);
  };

  const {
    mutate: resendConfirmationEmail,
    isLoading,
    isError,
  } = useMutation(
    async (token: string) => {
      if (isAlreadySending.current) return;
      isAlreadySending.current = true;
      try {
        await Api().participant.resendConfirmationEmail(token);
      } finally {
        isAlreadySending.current = false;
      }
    },
    {
      onError: (error) => {
        console.error(error);
      },
      onSuccess: () => {
        if (timeBeforeResend <= 0) {
          setTimeBeforeResend(60);
          handleInterval();
        }
      },
      retry: false,
    }
  );

  useEffect(() => {
    handleInterval();

    return () => {
      if (resendIntervalRef.current !== null) {
        clearInterval(resendIntervalRef.current);
      }
    };
  }, []);

  const handleResend = async () => {
    if (timeBeforeResend > 0) return;

    resendConfirmationEmail(participant.ott);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-between gap-6 px-3 sm:px-5 h-full">
      <h4 className="text-lg xl:text-xl font-semibold max-w-xs text-center">
        Confirm Email and Grab your tickets
      </h4>
      <div className="flex flex-col flex-1 justify-center items-center gap-5 lg:gap-8">
        <img
          src="/confirm-email.svg"
          alt="mailbox"
          className="w-36 h-30 lg:h-40 lg:w-44"
        />
        <h5 className="font-semibold text-center text-sm md:text-base">
          We have sent an email to{" "}
          <span className="text-red-500">{participant.email}</span> to confirm
          the validity of your email address. After receiving the email follow
          the link provided to complete your registration and{" "}
          <span className="text-red-500">receive the ticket</span>.
        </h5>
        <Link to={`/`}>
          <Button
            className="!rounded-full !px-8 bg-[#1E1C1F] hover:bg-[#1E1C1F] text-white font-semibold gap-5 hover:opacity-80"
            variant="contained"
          >
            Home
          </Button>
        </Link>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex gap-3 items-center">
          <p className="text-gray-400 text-sm">Didn't receive an email?</p>
          <Button
            onClick={handleResend}
            variant="text"
            color="primary"
            className="text-sm"
            size="small"
            disabled={timeBeforeResend > 0 || isLoading}
          >
            {isLoading
              ? "sending"
              : timeBeforeResend > 0
              ? `Resend in ${timeBeforeResend}...`
              : "Resend"}
          </Button>
        </div>
        {isError && (
          <p className="text-sm text-red-500 mt-1">
            Error Sending Email, try again
          </p>
        )}
      </div>
    </div>
  );
};

export default ConfirmEmail;
