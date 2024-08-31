"use client";

import { Bell } from "lucide-react";
import { format } from "date-fns";

import { TNotification } from "@/app/(protected)/dashboard/setting/page";

interface Props {
  notification: TNotification;
}

export default function NotificationComp({ notification }: Props) {
  if (!Array.isArray(notification)) return <p>Error fetching notification.</p>;

  if (notification.length < 1 || !notification) {
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

  return (
    <div className="min-h-[70vh]">
      <div className="flex flex-col justify-center items-center">
        <Bell size={50} className="fill-gray-500 text-gray-500" />
        <p className="text-3xl font-semibold text-gray-700 mb-2 mt-5">
          You have {notification.length} new notifications
        </p>
      </div>

      <div className="mt-12">
        {notification.map((item) => {
          const createAt = format(new Date(item.createdAt), "MMMM dd, yyyy");

          return (
            <div
              key={item.id}
              className="flex justify-between items-center p-3 border-b border-gray-200 last:border-b-0"
            >
              <p className="text-gray-700">{item.body}</p>
              <p className="text-gray-500">{createAt}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
