import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Api } from "~/api/axiosInstance";
import { JoinFormValues } from "~/lib/auth/utils/join-schema";
import { IRole } from "~/lib/types";

export function useStepNavigation(
  initialStep: number = 0,
  roles: IRole[],
  form: UseFormReturn<JoinFormValues>,
  onSubmit: (data: any) => void
) {
  const [activeStep, setActiveStep] = useState(initialStep);
  const [errorSendingEmail, setErrorSendingEmail] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const { getValues, handleSubmit } = form;

  const checkAndSendEmailConfirmation = async (email: string) => {
    const data = await Api().users.createEmailConfirmation(email);
    if (!data.sent) {
      setErrorSendingEmail(data.message);
      return false;
    }
    return true;
  };

  const shouldSkipStep = (currentStep: number, role?: IRole) => {
    return currentStep === 1 && role?.name !== "runner";
  };

  const triggerVisibilityToggle = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  };

  const handleNext = async () => {
    if (activeStep === 5) {
      await handleSubmit(onSubmit)();
      return;
    }

    if (activeStep === 3) {
      const email = getValues("email");
      const emailSent = await checkAndSendEmailConfirmation(email);
      if (!emailSent) return;
    }

    const role = roles.find((r) => getValues("roles")?.includes(r.id));
    const skipStep = shouldSkipStep(activeStep, role);

    setActiveStep(skipStep ? activeStep + 2 : activeStep + 1);
    triggerVisibilityToggle();
  };

  const handleBack = () => {
    const role = roles.find((r) => getValues("roles")?.includes(r.id));
    const skipStep = shouldSkipStep(activeStep - 1, role);

    setActiveStep(skipStep ? activeStep - 2 : activeStep - 1);
    triggerVisibilityToggle();
  };

  return {
    activeStep,
    handleNext,
    handleBack,
    setActiveStep,
    errorSendingEmail,
    isVisible,
  };
}
