"use client";

import { Box, Modal, Typography } from "@mui/material";
import React from "react";

interface RegistrationCardProps {
  open: boolean;
  handleClose: () => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const RegistrationCard: React.FC<RegistrationCardProps> = ({
  open,
  handleClose,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 sm:w-3/5 md:w-[600px]">
        <Typography variant="h3" component="h2">
          Registraion details
        </Typography>
      </Box>
    </Modal>
  );
};

export default RegistrationCard;
