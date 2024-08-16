import { hasNotification } from "@/actions/notification";

export const useHasNotification = () => {
  const notification = hasNotification();

  if (!Array.isArray(notification)) return null;

  return notification;
};
