import { Bell } from "lucide-react";
import Image from "next/image";

export default function NotificationComp() {
  const notification = false;

  if (!notification) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[70dvh]">
        <Bell size={50} className="fill-gray-500 text-gray-500" />
        <p className="text-3xl font-semibold text-gray-700 mb-2 mt-5">
          You{"'"}re all caught up
        </p>
        <p className="text-2xl text-muted-foreground">
          You have no visible notifications.
        </p>
      </div>
    );
  }
  return <div>NotificationComp</div>;
}
