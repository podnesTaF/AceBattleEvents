import { yupResolver } from "@hookform/resolvers/yup";
import { Snackbar } from "@mui/material";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Api } from "~/api/axiosInstance";
import { IUser } from "~/lib/types";
import { FeedbackSchema } from "~/lib/utils";
import { FormButton, FormField } from "../shared";

const FeedbackForm = ({ user }: { user: IUser | null }) => {
  const [statusAlert, setStatusAlert] = useState({
    message: "",
    isOpen: false,
  });
  const form = useForm<{
    message: string;
    aboutCommnetator: string;
  }>({
    resolver: yupResolver(FeedbackSchema),
  });

  const onSubmit = async (data: {
    message: string;
    aboutCommnetator: string;
  }) => {
    if (!user) return;

    const feedback = await Api(user.token).feedback.createFeedback(data);

    if (feedback) {
      setStatusAlert({
        message: "Feedback was sent successfully!",
        isOpen: true,
      });
    } else {
      setStatusAlert({
        message: "Something went wrong!",
        isOpen: true,
      });
    }
  };

  return (
    <div className="flex w-full flex-col gap-5">
      <h3 className="text-xl md:text-2xl font-semibold text-white">
        We will be glad if you share your feedback!
      </h3>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="w-full">
            <h3 className="text-lg md:text-xl font-semibold text-white">
              Feedback
            </h3>
            <FormField
              name={"message"}
              label={""}
              placeholder={"Write feedback here... (min 80 characters)"}
              lines={8}
            ></FormField>
          </div>
          <div className="w-full">
            <h3 className="text-lg md:text-xl font-semibold text-white">
              How can you characterise yourself?
            </h3>
            <FormField
              name={"aboutCommentator"}
              label={""}
              placeholder={
                "e.g a young athlete from Ukraine... (optional) (max. 120 characters)"
              }
              lines={2}
            ></FormField>
          </div>
          {user ? (
            <div className="w-full flex justify-end">
              <FormButton title="Send feedback!" isLoading={false} />
            </div>
          ) : (
            <div>
              <h3 className="text-xl font-semibold text-white">
                Join Ace Battle Mile to be able to leave feedback
              </h3>
            </div>
          )}
        </form>
      </FormProvider>
      <Snackbar
        open={statusAlert.isOpen}
        autoHideDuration={2000}
        onClose={() => setStatusAlert({ message: "", isOpen: false })}
        message={statusAlert.message}
      />
    </div>
  );
};

export default FeedbackForm;
