import { ArrowForward } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

interface RegistrationLayoutProps {
  activeStep: number;
  handleNext: () => void;
  handleBack: () => void;
  children?: React.ReactNode;
  steps: {
    title: string;
    fieldsToValidate?: string[];
    submit?: boolean;
    navigation?: boolean;
  }[];
  isSubmitting?: boolean;
}

const RegistrationLayout = ({
  activeStep,
  handleBack,
  handleNext,
  children,
  steps,
  isSubmitting,
}: RegistrationLayoutProps): JSX.Element => {
  const {
    trigger,
    watch,
    formState: { isValid },
  } = useFormContext();
  const [isStepValid, setIsStepValid] = useState(true);

  const fieldsToWatch = steps[activeStep]?.fieldsToValidate || [];

  const validatedHandleNext = async () => {
    const isValid = await trigger(fieldsToWatch);

    setIsStepValid(isValid);
    if (isValid) handleNext();
  };

  return (
    <div className="flex-1 bg-[#1E1C1F] rounded-2xl flex flex-col shadow-md">
      <div className="py-2  md:py-3 flex justify-center rounded-t-xl">
        <h4 className="text-white font-semibold text-md sm:text-lg 2xl:text-xl">
          {steps[activeStep].title}
        </h4>
      </div>
      <div className="bg-[#FFF9FF] rounded-xl w-full flex-1 flex flex-col">
        <div className="flex-1 p-2 sm:p-3 lg:p-4">{children}</div>
        {steps[activeStep]?.navigation && (
          <div className="flex justify-end border-t border-t-gray-400 py-2 md:py-3 px-2">
            <Button
              onClick={validatedHandleNext}
              type={"button"}
              variant="contained"
              className="!rounded-full !px-2 font-semibold gap-5 md:!px-3 min-w-48"
              color="error"
              disabled={activeStep === steps.length - 1 || isSubmitting}
            >
              {!!steps[activeStep].submit ? (
                <>
                  <p className="font-semibold">Confirm And Register</p>
                  {isSubmitting ? (
                    <CircularProgress size={20} />
                  ) : (
                    <ArrowForward />
                  )}
                </>
              ) : (
                <>
                  <p className="font-semibold">Next</p>
                  <ArrowForward fontSize={"medium"} />
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationLayout;
