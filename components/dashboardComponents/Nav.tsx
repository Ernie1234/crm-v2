"use client";

import { Bell, LogOut, Settings, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { handleSignOut } from "@/actions/signOut";
import { UserAvatar } from "./UserAvatar";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/use-current-user";

interface IProps {
  header: string;
}

export default function Nav({ header }: IProps) {
  const user = useCurrentUser();
  const userId = user?.id;

  return (
    <div className="sticky top-0 p-4 bg-white shadow border-b border-gray-200 flex justify-between items-center min-w-full z-50">
      <h1 className="font-semibold text-xl">{header}</h1>

      <div className="flex items-center gap-12">
        <div className="relative">
          <Bell className="" size={28} />
          {user?.hasNotification && (
            <div className="bg-green-400 h-2 w-2 rounded-full absolute top-0 right-1" />
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <UserAvatar />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mr-6">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link
                  href={`/user-profile/${userId}`}
                  className="flex w-full h-full items-center"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hidden md:flex">
                <Bell className="mr-2 h-4 w-4" />
                <span>Notification</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="/dashboard/setting"
                  className="flex w-full h-full items-center"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={async () => {
                await handleSignOut();
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
