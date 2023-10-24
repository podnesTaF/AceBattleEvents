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

interface Props {
  onSure: Function;
  onCancel: Function;
  open: boolean;
  handleClose:
    | ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void)
    | undefined;
  title: string;
  description: string;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmAlert: React.FC<Props> = ({
  onSure,
  onCancel,
  open,
  title,
  handleClose,
  description,
}) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="info" onClick={() => onCancel()}>
          Cancel
        </Button>
        <Button variant="contained" color="error" onClick={() => onSure()}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmAlert;
