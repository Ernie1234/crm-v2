"use client";

import { IconType } from "react-icons";

interface IBtn {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  round?: "round" | "round-sm" | "round-full";
  icon?: IconType;
}

const Button = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  round = "round",
  icon: Icon,
}: IBtn) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        hover:opacity-80
        transition-all
        duration-500
        w-full
        ${round === "round" && "rounded-lg"}
        ${round === "round-sm" && "rounded-sm"}
        ${round === "round-full" && "rounded-full"}
        ${outline ? "bg-background" : "bg-green-700"}
        ${outline ? "border-black/0" : "border-green-700"}
        ${outline ? "hover:border-gray-400" : "border-green-700"}
        ${outline ? "text-gray-500" : "text-white"}
        ${small ? "text-sm" : "text-md"}
        ${small ? "py-1" : "py-3"}
        ${small ? "font-light" : "font-semibold"}
        ${small ? "border-[1px]" : "border-2"}
      `}
    >
      {Icon && (
        <Icon
          size={24}
          className="
            absolute
            left-4
            top-3
          "
        />
      )}
      {label}
    </button>
  );
};

export default Button;
