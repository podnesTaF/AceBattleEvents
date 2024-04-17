import { Logout, Settings } from "@mui/icons-material";
import GroupIcon from "@mui/icons-material/Group";
import Groups3OutlinedIcon from "@mui/icons-material/Groups3Outlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Avatar, Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { Link } from "@remix-run/react";
import React from "react";

interface ProfileMenuProps {
  handleClose: () => void;
  clubId?: number;
  role?: string;
  anchorEl: null | HTMLElement;
  userId?: number;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({
  anchorEl,
  clubId,
  role,
  userId,
  handleClose,
}) => {
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
      {/* User's account */}
      {renderMenuItem(
        `/profile/${userId}`,
        <Avatar sx={{ width: 40, height: 40 }} />,
        "My account"
      )}

      {/* User's club */}
      {clubId &&
        renderMenuItem(
          `/clubs/${clubId}`,
          <GroupIcon className="text-gray-400" />,
          "My Club"
        )}

      {/* Manager options */}
      {role === "manager" && clubId
        ? renderMenuItem(
            "/add-team",
            <Groups3OutlinedIcon className="text-gray-400" />,
            "Form a Team"
          )
        : // Other user roles and viewer
          role !== "viewer" &&
          !clubId &&
          renderMenuItem(
            role === "manager" ? "/create-club" : "/clubs",
            <Avatar sx={{ width: 40, height: 40 }} className="bg-yellow-300">
              <GroupIcon className="text-black" />
            </Avatar>,
            role === "manager" ? "Add Club" : "Find a Club"
          )}

      {role === "manager" &&
        clubId &&
        renderMenuItem(
          `/clubs/${clubId}/join-requests`,
          <PersonAddIcon className="text-gray-400" />,
          "Join Requests"
        )}

      {/* Settings */}
      <Divider />
      {renderMenuItem(
        "/user/settings",
        <ListItemIcon>
          <Settings />
        </ListItemIcon>,
        "Settings"
      )}

      {/* Logout */}
      {renderMenuItem(
        "/logout",
        <ListItemIcon>
          <Logout color="error" />
        </ListItemIcon>,
        "Logout"
      )}
    </Menu>
  );
};

export default ProfileMenu;

const renderMenuItem = (to: string, icon: React.ReactNode, text: string) => (
  <MenuItem>
    <Link to={to}>
      <div className="flex items-center gap-2">
        {icon}
        <p>{text}</p>
      </div>
    </Link>
  </MenuItem>
);
