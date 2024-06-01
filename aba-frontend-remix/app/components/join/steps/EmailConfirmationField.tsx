import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useFormContext } from "react-hook-form";
import { useMutation } from "react-query";
import { Api } from "~/api/axiosInstance";
import OtpField from "../../shared/forms/OtpField";

const EmailConfirmationField = ({
  email,
  errorMessage,
}: {
  email: string;
  errorMessage?: string;
}) => {
  const { setValue } = useFormContext();

  const {
    mutate: verifyEmailOtp,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useMutation(
    async (otp: string) => Api().users.verifyEmailOtp({ email, otp }),
    {
      onSuccess: (data) => {
        setValue("emailConfirmed", true);
      },
      onError: (error: any) => {},
    }
  );

  const handleComplete = (value: string) => {
    verifyEmailOtp(value);
  };

  return (
    <div className="flex my-[10%] items-center gap-3 flex-col">
      {errorMessage && (
        <div className="flex gap-2 items-center">
          <ErrorOutlineIcon color="error" />
          <h3 className="text-red-500">{errorMessage}</h3>
        </div>
      )}
      <h4>Enter the verification code</h4>
      <OtpField
        callback={handleComplete}
        reset={false}
        error={error.message || "Failed to verify email. Please try again."}
        isSuccess={isSuccess}
        isLoading={isLoading}
      />
    </div>
  );
};

export default EmailConfirmationField;
