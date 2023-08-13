import { Dialog, DialogTitle, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import { IEvent } from "~/lib/events/types";
import { formatDate } from "~/lib/events/utils/format-date";
import { IViewer } from "~/lib/registrations/types/ViewerRegister";

interface RegistrationPopupProps {
  open: boolean;
  handleClose: () => void;
  event: IEvent;
  registration?: IViewer | null;
}

const RegistrationPopup: React.FC<RegistrationPopupProps> = ({
  open,
  handleClose,
  event,
  registration,
}) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      maxWidth="lg"
    >
      <DialogTitle className="text-3xl text-green-400 font-semibold text-center">
        You successfully registered for event:
        <br />
        {event.title}
      </DialogTitle>
      <div className="px-4 pb-4 w-full flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2 p-4 rounded-md border-red-500 border-[1px] bg-white">
          <h3 className="text-xl font-semibold text-center mb-4">
            Thank you for registration!
          </h3>
          <div className="flex flex-col w-full gap-3 mb-5">
            <div>
              <p>Address:</p>
              <h4 className="text-xl font-semibold underline">
                {event.location.city},{event.location.address},
                {event.location.zipCode}
              </h4>
            </div>
            <div>
              <p>Start Date and Time:</p>
              <h4 className="text-xl font-semibold">
                {formatDate(event.startDateTime)}
              </h4>
            </div>
            <div>
              <p>Ticket Number:</p>
              <h4 className="text-xl font-semibold">#{registration?.id}</h4>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 w-full mb-6">
            <h2 className="text-2xl font-semibold">Download your ticket</h2>
            <button className="bg-red-400 rounded-md text-white font-semibold px-5 py-2 hover:bg-red-500">
              PDF
            </button>
          </div>
          <p className="text-center text-gray-500 text-sm">
            Read terms and policies of “Ace Battle Association”
          </p>
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div className="flex flex-col items-center gap-4 mb-10">
            <p className="text-xl text-center">
              Sign up to our platform to follow new events and store your
              registrations
            </p>
            <div className="flex gap-4">
              <button className="bg-green-400 rounded-md text-white font-semibold px-5 py-2 hover:bg-green-500">
                Sign Up
              </button>
              <button className="border-green-400 text-green-400 border-[1px] rounded-md font-semibold px-5 py-2 hover:border-green-500">
                Sign In
              </button>
            </div>
          </div>
          <div className="w-full">
            <div className="w-full mb-6">
              <p className="text-center mb-4">
                Have fun together with your friends! <br /> Share this link!
              </p>
              <div className="w-full rounded-md shadow-sm p-1">
                <input
                  disabled
                  className="text-gray-400 px-5 py-2 border-none w-4/5 outline-none disabled:bg-inherit disabled:cursor-text"
                  value="http://localhost:3000/events/26/register"
                />
                <button className="bg-green-400 w-1/5 rounded-md text-white font-semibold px-5 py-2 hover:bg-green-500">
                  Copy
                </button>
              </div>
            </div>
            <div className="w-full flex justify-end">
              <button
                onClick={handleClose}
                className="ml-auto px-4 py-2 text-white bg-black text-xl font-semibold rounded-md hover:opacity-90"
              >
                Thank You!
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default RegistrationPopup;

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
