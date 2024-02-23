import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/common/components/ui/avatar";
import { getImageSrc } from "@/common/lib/utils/utils";
import { IUser } from "../_lib/types";

interface UserAvatarProps {
  user: IUser;
  avatar?: File | null;
  className?: string;
}

const UserAvatar = ({
  user,
  className,
  avatar,
}: UserAvatarProps): JSX.Element => {
  return avatar ? (
    <Avatar className={className}>
      <AvatarImage src={URL.createObjectURL(avatar)} alt={user.firstName} />
    </Avatar>
  ) : (
    <Avatar className={className}>
      <AvatarImage
        src={getImageSrc(user.avatarName, "avatars", user.id)}
        alt={user.firstName}
      />
      <AvatarFallback className="bg-orange-400 text-white">
        {(user.firstName[0] + user.secondName[0]).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;