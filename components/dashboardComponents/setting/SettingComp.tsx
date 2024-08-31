"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import ProfileComp from "./ProfileComp";
import NotificationComp from "./NotificationComp";
import PreferenceComp from "./PreferenceComp";
import { TNotification } from "@/app/(protected)/dashboard/setting/page";

enum Tabs {
  BANKCARD,
  NOTIFICATION,
  PROFILE,
  PREFERENCE,
}

interface Props {
  notification: TNotification;
}

export default function SettingComp({ notification }: Props) {
  const [activeTab, setActiveTab] = useState(Tabs.PROFILE);

  return (
    <div className="flex flex-col bg-white rounded-xl border border-gray-300 overflow-hidden">
      <div className="flex justify-between items-center w-full transition-all duration-500">
        <p
          className={cn(
            "flex justify-center items-center p-4 w-full hover:cursor-pointer",
            activeTab === Tabs.PROFILE
              ? "rounded-none bg-white"
              : activeTab !== Tabs.NOTIFICATION
              ? "rounded-none bg-gray-200"
              : "bg-gray-200 rounded-br-2xl"
          )}
          onClick={() => setActiveTab(Tabs.PROFILE)}
        >
          Profile
        </p>
        <p
          className={cn(
            "flex justify-center items-center p-4 w-full hover:cursor-pointer",
            activeTab === Tabs.NOTIFICATION
              ? "rounded-none bg-white"
              : activeTab === Tabs.PREFERENCE
              ? "rounded-br-2xl bg-gray-200"
              : "bg-gray-200 rounded-bl-2xl"
          )}
          onClick={() => setActiveTab(Tabs.NOTIFICATION)}
        >
          Notification
        </p>
        <p
          className={cn(
            "flex justify-center items-center p-4 w-full hover:cursor-pointer",
            activeTab === Tabs.PREFERENCE
              ? "rounded-none bg-white"
              : activeTab !== Tabs.NOTIFICATION
              ? "bg-gray-200 rounded-bl-none"
              : "bg-gray-200 rounded-bl-2xl"
          )}
          onClick={() => setActiveTab(Tabs.PREFERENCE)}
        >
          Preference
        </p>
      </div>
      <div className="bg-white p-4">
        {activeTab === Tabs.PROFILE && <ProfileComp />}
        {activeTab === Tabs.NOTIFICATION && (
          <NotificationComp notification={notification} />
        )}
        {activeTab === Tabs.PREFERENCE && <PreferenceComp />}
      </div>
    </div>
  );
}
