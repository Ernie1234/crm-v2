import { getUserNotification } from "@/actions/notification";

export const useNotification = () => {
  const notification = getUserNotification();

  if (!Array.isArray(notification)) return null;

  return notification;
};
