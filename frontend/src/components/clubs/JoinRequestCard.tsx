import { JoinRequest } from "@/models/IClub";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Avatar, IconButton } from "@mui/material";
import React from "react";

interface Props {
  request: JoinRequest;
  onStatusChange: (status: string, userId: number) => void;
}

const JoinRequestCard: React.FC<Props> = ({ request, onStatusChange }) => {
  return (
    <div className="border-b-[1px] border-x-[1px] border-gray-200 px-4 py-2 flex flex-col md:flex-row justify-between items-center gap-10">
      <div className="flex gap-6 w-full md:w-1/2 lg:1/3 items-center">
        <Avatar
          src={request.user.image?.mediaUrl}
          alt={request.user.name}
          sx={{ width: 70, height: 70 }}
        >
          {request.user.name[0]}
        </Avatar>
        <div className="flex flex-col justify-between gap-1">
          <p>{request.user.role}</p>
          <h3 className="text-2xl font-semibold">
            {request.user.name} {request.user.surname}
          </h3>
          <p>
            {request.user?.gender}, {request.user.dateOfBirth}
          </p>
        </div>
      </div>
      <div className="flex gap-6 md:items-center items-end">
        <div className="flex flex-col gap-3">
          <p>Wants to join your club</p>
          <div className="flex gap-1 cursor-pointer">
            <InfoOutlinedIcon color="info" />
            <p className="underline">read motivation</p>
          </div>
        </div>
        <div className="flex gap-4">
          <IconButton
            onClick={onStatusChange.bind(null, "accept", request.user.id)}
            color="success"
            size={"large"}
          >
            <CheckCircleOutlineOutlinedIcon fontSize={"large"} />
          </IconButton>
          <IconButton
            onClick={onStatusChange.bind(null, "reject", request.user.id)}
            color="error"
            size={"large"}
          >
            <CancelOutlinedIcon fontSize={"large"} />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default JoinRequestCard;
