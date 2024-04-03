import { Session } from "next-auth";
import { useState } from "react";
import { updateUserField } from "../update-user-field.api";

export const useEmailNotifications = (
  session: Session,
  initialEnabled?: boolean
) => {
  const [emailNotifications, setEmailNotifications] = useState(initialEnabled);
  const [isLoading, setIsLoading] = useState(false);

  const toggleEmailNotifications = async (enabled: boolean) => {
    setEmailNotifications(enabled);
    setIsLoading(true);
    await updateUserField(session, ["notificationsEnabled"], [enabled]);
    setIsLoading(false);
  };

  return { emailNotifications, isLoading, toggleEmailNotifications };
};
