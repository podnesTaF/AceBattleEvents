import { Fade, Slide } from "@mui/material";

interface StepLayoutProps {
  isVisible: boolean;
  step: {
    label: string;
    subtitle?: string;
    remark?: string;
  };
  children?: React.ReactNode;
}

const StepLayout = ({ isVisible, step, children }: StepLayoutProps) => {
  return (
    <Fade in={isVisible} timeout={300} easing={"ease-in"}>
      <Slide direction="left" timeout={300} in={isVisible}>
        <div className="p-4 bg-white md:bg-inherit min-h-[400px] flex-1">
          <h4 className="text-lg lg:text-xl font-semibold mb-4">
            {step.subtitle}
          </h4>
          {children}
        </div>
      </Slide>
    </Fade>
  );
};

export default StepLayout;
