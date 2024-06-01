import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Modal } from "@mui/material";
import { IEvent } from "~/lib/types";
import ParticipantRegistration from "./ParticipantRegistration";
import RegistrationHeader from "./RegistrationHeader";

interface RegistrationModalLayoutProps {
  event: IEvent;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const RegistrationModalLayout = ({
  event,
  open,
  setOpen,
}: RegistrationModalLayoutProps): JSX.Element => {
  const onClose = () => {
    setOpen(false);
  };

  return (
    <Modal open={open}>
      <div className="bg-white w-full sm:max-w-xl 2xl:max-w-2xl flex flex-col absolute right-0 bottom-0 top-0 md:top-6 md:right-6 md:bottom-6 md:rounded-xl">
        <div className="flex justify-between  items-center w-full gap-6 border-b-gray-300 border-b px-3 md:px-4 py-3 md:py-4">
          <h3 className="text-gray-600 text-lg md:text-xl font-semibold">
            Event Participation
          </h3>
          <IconButton onClick={onClose}>
            <CloseIcon className="text-gray-600" />
          </IconButton>
        </div>
        <div className="flex-1 h-full overflow-auto flex flex-col">
          <RegistrationHeader event={event} />
          <div className="flex-1 mx-4 pb-6  my-4">
            <ParticipantRegistration event={event} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RegistrationModalLayout;
