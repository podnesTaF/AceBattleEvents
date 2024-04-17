import { Button } from "@mui/material";
import { useNavigate } from "@remix-run/react";
import { Api } from "~/api/axiosInstance";
import { IUser } from "~/lib/types";

const ErrorPayments = ({
  user,
  sessionId,
}: {
  user: IUser;
  sessionId?: string;
}) => {
  const navigate = useNavigate();
  const handleTryAgain = async () => {
    try {
      console.log(user.roles);
      const roleIds = user.roles?.map((r) => r.role.id);
      if (!roleIds) throw new Error("User has no roles");
      const url = await Api().payments.createCheckoutSession(user.id, roleIds);

      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelRegistration = async () => {
    try {
      if (!sessionId) throw new Error("Session Id is missing");
      await Api().users.cancelRegistration(sessionId);

      // Redirect to home page
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col justify-between items-center h-full w-full py-[10%] px-5 gap-10">
      <div className="flex flex-col items-center gap-4">
        <img
          src="/error-icon.svg"
          className="w-20 h-20 md:w-40 md:h-40 object-contain object-center"
          alt="error"
        />
        <h2 className="text-2xl xl:text-3xl font-semibold">Payments Failed!</h2>
        <p className="text-center">
          It seems you canceled the payment process. <br /> Please try again
        </p>
      </div>
      <Button
        onClick={handleTryAgain}
        className="w-full"
        variant="contained"
        color="secondary"
      >
        Try Again
      </Button>
      <Button
        onClick={handleCancelRegistration}
        color="error"
        className="mt-8 w-full"
      >
        Cancel Registration
      </Button>
    </div>
  );
};

export default ErrorPayments;
