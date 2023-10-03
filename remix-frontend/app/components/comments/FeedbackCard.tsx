import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { Fade, IconButton } from "@mui/material";
import React from "react";
import { Api } from "~/api/axiosInstance";
import { IAdmin, IFeedback } from "~/lib/types";

interface Props {
  feedback: IFeedback;
  index: number;
  editable?: boolean;
  admin?: IAdmin;
}

const FeedbackCard: React.FC<Props> = ({
  feedback,
  index,
  editable,
  admin,
}) => {
  const [editMode, setEditMode] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>(feedback.message);
  const [aboutCommentator, setAboutCommentator] = React.useState<string>(
    feedback.aboutCommentator || ""
  );

  const cancelChnages = () => {
    setMessage(feedback.message);
    setAboutCommentator(feedback.aboutCommentator || "");
    setEditMode(false);
  };

  const submitChanges = async () => {
    setEditMode(false);
    if (!admin) return;
    const updated = await Api(admin.token).feedback.updateFeedback(
      {
        message,
        aboutCommentator,
      },
      feedback.id
    );
  };

  const approve = async () => {
    if (!admin) return;
    const res = await Api(admin.token).feedback.approveFeedback(feedback.id);

    if (res) {
      window.location.reload();
    }
  };

  const disapprove = async () => {
    if (!admin) return;
    const res = await Api(admin.token).feedback.disapproveFeedback(feedback.id);

    if (res) {
      window.location.reload();
    }
  };

  return (
    <Fade in={true} timeout={200} easing={"ease-in"}>
      <div className="w-full sm:w-4/5 md:w-2/5">
        <div
          className={`shadow-md border-y-2 w-full p-6 mb-2 ${
            index % 2 ? "border-red-500" : "border-black"
          }`}
        >
          {editable && editMode ? (
            <div className="flex flex-col gap-4">
              <textarea
                rows={7}
                className="w-full h-32 border-2 border-gray-300 rounded-md p-2"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          ) : (
            <p className="italic text-lg text-center">{message}</p>
          )}
        </div>
        <div className="w-full flex gap-4">
          <img
            src={feedback.user.image?.mediaUrl || "/abm-logo-black.svg"}
            className="w-[150px] h-[150px] object-cover rounded-full"
          />
          <div className="flex w-full flex-col justify-between items-center gap-6">
            <h3 className="text-lg lg:text-xl font-semibold capitalize">
              {feedback.user.name} {feedback.user.surname}
            </h3>
            <div className="flex gap-2">
              <div className="w-[10px] h-[10px] rounded-full border-[1px] border-black"></div>
              <div className="w-[10px] h-[10px] rounded-full bg-red-500"></div>
              <div className="w-[10px] h-[10px] rounded-full bg-black"></div>
            </div>
            {editable && editMode ? (
              <div className="flex flex-col gap-4">
                <textarea
                  rows={2}
                  className="w-full h-32 border-2 border-gray-300 rounded-md p-2"
                  value={aboutCommentator}
                  onChange={(e) => setAboutCommentator(e.target.value)}
                />
              </div>
            ) : (
              <p className="italic text-lg text-center">{aboutCommentator}</p>
            )}
          </div>
        </div>
        <div className="flex justify-around gap-6">
          {editMode ? (
            <>
              <IconButton onClick={cancelChnages}>
                <CloseIcon />
              </IconButton>
              <IconButton onClick={submitChanges}>
                <CheckIcon />
              </IconButton>
            </>
          ) : (
            <div className="flex w-full justify-between my-2">
              {!feedback.approved ? (
                <div
                  onClick={approve}
                  className="bg-green-500 px-4 py-2 cursor-pointer hover:opacity-80"
                >
                  <h5 className="text-lg md:text-xl font-semibold text-white">
                    Approve
                  </h5>
                </div>
              ) : (
                <div
                  onClick={disapprove}
                  className="bg-red-500 px-4 py-2 hover:opacity-80"
                >
                  <h5 className="text-lg md:text-xl font-semibold text-white">
                    Disapprove
                  </h5>
                </div>
              )}
              <IconButton onClick={() => setEditMode(true)}>
                <EditIcon />
              </IconButton>
            </div>
          )}
        </div>
      </div>
    </Fade>
  );
};

export default FeedbackCard;
