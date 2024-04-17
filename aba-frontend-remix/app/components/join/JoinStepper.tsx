import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Button, MobileStepper } from "@mui/material";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

interface JoinStepperProps {
  activeStep: number;
  handleNext: () => void;
  handleBack: () => void;
  children?: React.ReactNode;
  steps: {
    label: string;
    fieldsToValidate?: string[];
  }[];
  isSubmitting?: boolean;
}

const JoinStepper = ({
  activeStep,
  handleBack,
  handleNext,
  steps,
  isSubmitting,
  children,
}: JoinStepperProps) => {
  const {
    trigger,
    watch,
    formState: { isValid },
  } = useFormContext();
  const [isStepValid, setIsStepValid] = useState(true);

  const fieldsToWatch = steps[activeStep]?.fieldsToValidate || [];

  const validatedHandleNext = async () => {
    const isValid = await trigger(fieldsToWatch);
    if (isValid) handleNext();
  };

  return (
    <div className="w-full flex-grow flex flex-col pb-3 max-w-6xl mx-auto px-2">
      <div className="flex items-center w-full px-4 py-2 gap-2">
        <div className="w-8 h-8 bg-gray-800 flex justify-center items-center rounded-full">
          <p className="text-lg text-white font-semibold">{activeStep + 1}</p>
        </div>
        <h4 className="font-semibold">{steps[activeStep].label}</h4>
      </div>
      {children}
      <MobileStepper
        steps={steps.length}
        position="static"
        className={`gap-6 mt-5 ${activeStep === 6 ? "!justify-center" : ""}`}
        activeStep={activeStep}
        nextButton={
          activeStep !== 6 && (
            <Button
              size="small"
              type={"button"}
              className="w-full max-w-xs"
              variant="contained"
              color="secondary"
              onClick={validatedHandleNext}
              disabled={
                !isStepValid || activeStep === steps.length - 1 || isSubmitting
              }
            >
              {activeStep === 5
                ? isSubmitting
                  ? "Creating session..."
                  : "Process Payment"
                : "Next"}
              <KeyboardArrowRight />
            </Button>
          )
        }
        backButton={
          activeStep !== 6 && (
            <Button
              variant="outlined"
              type="button"
              className="px-3"
              color="secondary"
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              <KeyboardArrowLeft />
              Back
            </Button>
          )
        }
      />
    </div>
  );
};

export default JoinStepper;
