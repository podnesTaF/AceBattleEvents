import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ErrorDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Function;
}) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      className="max-w-xl w-full px-4 mx-auto flex flex-col gap-4 min-h-[500px]"
    >
      <DialogTitle className="flex flex-col justify-center items-center py-6 mb-6">
        <img
          src={"/error-icon.svg"}
          className="w-20 h-20 object-contain object-center"
          alt={"error"}
        />
        <h2 className="text-2xl xl:text-3xl font-semibold">Payments Failed!</h2>
      </DialogTitle>
      <DialogContent className="flex-1">
        <DialogContentText className="text-center">
          It seems you canceled the payment process. <br /> Please try again
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          className="w-full sm:w-auto"
          color="secondary"
          variant="contained"
          onClick={handleClose}
        >
          Okay
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorDialog;
