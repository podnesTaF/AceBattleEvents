import { Logout, Settings } from "@mui/icons-material";
import GroupIcon from "@mui/icons-material/Group";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { Avatar, Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface ProfileMenuProps {
  handleClose: () => void;
  isMember?: boolean;
  role?: string;
  anchorEl: null | HTMLElement;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({
  anchorEl,
  isMember,
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
          <div className="flex items-center gap-2">
            <Avatar sx={{ width: 40, height: 40 }} />
            <p>My account</p>
          </div>
        </Link>
      </MenuItem>
      {isMember && (
        <MenuItem>
          <Link href="/profile">
            <div className="flex items-center gap-2">
              <Avatar sx={{ width: 40, height: 40 }} className="bg-yellow-400">
                <GroupIcon className="text-black" />
              </Avatar>
              <p>My Club</p>
            </div>
          </Link>
        </MenuItem>
      )}
      {role === "manager" ? (
        isMember ? (
          <MenuItem>
            <Link href="/add-team">
              <div className="flex items-center gap-2">
                <Avatar sx={{ height: 40 }} className="bg-yellow-400">
                  <Image
                    src={"/add-team.svg"}
                    width={60}
                    height={40}
                    alt="image"
                  />
                </Avatar>
                <p>Form a Team</p>
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
