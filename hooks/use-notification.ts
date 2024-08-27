import { hasNotification } from "@/actions/notification";

export const useHasNotification = async () => {
  const notification = await hasNotification();

  if (!Array.isArray(notification)) return null;

  return notification;
};
