"use client";

import { FaUser } from "react-icons/fa6";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { ChevronDown } from "lucide-react";

export function UserAvatar() {
  const user = useCurrentUser();

  return (
    <>
      {user && (
        <div className="flex items-center gap-2">
          <p className="text-lg hidden md:block">{user.name}</p>
          <Avatar className="h-10 w-10 md:h-12 md:w-12 border border-gray-100">
            <AvatarImage
              src={user?.image || ""}
              alt="@shadcn"
              className="object-center object-cover"
            />
            <AvatarFallback className="bg-muted">
              <FaUser className="text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <ChevronDown />
        </div>
      )}
    </>
  );
}
