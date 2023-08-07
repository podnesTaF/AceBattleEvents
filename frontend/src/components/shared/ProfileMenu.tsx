import { Logout, Settings } from "@mui/icons-material";
import GroupIcon from "@mui/icons-material/Group";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import Groups3OutlinedIcon from "@mui/icons-material/Groups3Outlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Avatar, Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface ProfileMenuProps {
  handleClose: () => void;
  clubId?: number;
  role?: string;
  anchorEl: null | HTMLElement;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({
  anchorEl,
  clubId,
  role,
  handleClose,
}) => {
  const router = useRouter();
  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={Boolean(anchorEl)}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem className="w-[200px]">
        <Link href="/profile">
          <div className="flex items-center gap-1">
            <Avatar sx={{ width: 40, height: 40 }} />
            <p>My account</p>
          </div>
        </Link>
      </MenuItem>
      {clubId && (
        <MenuItem>
          <Link href={`/clubs/${clubId}`}>
            <div className="flex items-center gap-2">
              <GroupIcon className="text-gray-400" />
              <p>My Club</p>
            </div>
          </Link>
        </MenuItem>
      )}
      {role === "manager" ? (
        clubId ? (
          <MenuItem>
            <Link href="/add-team">
              <div className="flex items-center gap-2">
                <Groups3OutlinedIcon className="text-gray-400" />
                <p>Form a Team</p>
              </div>
            </Link>
            <Link href={`/clubs/${clubId}/join-requests`}>
              <div className="flex items-center gap-2">
                <PersonAddIcon className="text-gray-400" />
                <p>Join Requests</p>
              </div>
            </Link>
          </MenuItem>
        ) : (
          <MenuItem>
            <Link href="/create-club">
              <div className="flex items-center gap-2">
                <Avatar
                  sx={{ width: 40, height: 40 }}
                  className="bg-yellow-400"
                >
                  <GroupAddIcon className="text-black" />
                </Avatar>
                <p>Add Club</p>
              </div>
            </Link>
          </MenuItem>
        )
      ) : (
        <MenuItem>
          <Link href="/clubs">
            <div className="flex items-center gap-2">
              <Avatar sx={{ width: 40, height: 40 }} className="bg-yellow-400">
                <GroupIcon className="text-black" />
              </Avatar>
              <p>Find a Club</p>
            </div>
          </Link>
        </MenuItem>
      )}
      <Divider />
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <Settings />
        </ListItemIcon>
        Settings
      </MenuItem>
      <MenuItem
        onClick={() => {
          signOut().then(() => router.push("/"));
          handleClose();
        }}
        className="text-red-500"
      >
        <ListItemIcon>
          <Logout color="error" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );
};

export default ProfileMenu;
