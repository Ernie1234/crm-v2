"use client";

import { useState, useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

import { useChangePasswordModalStore } from "@/hooks/use-change-password-store";
import { ChangePasswordSchema } from "@/utils/schema";
import { Button } from "@/components/ui/button";
import { changePasswordAction } from "@/actions/change-password";
import FormError from "@/components/authComponents/FormError";
import FormSuccess from "@/components/authComponents/FormSuccess";

type FormData = z.infer<typeof ChangePasswordSchema>;
const inputClassName = `flex w-full rounded-md border border-input bg-background px-3 py-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`;

export default function ChangePasswordModal() {
  const changePasswordStore = useChangePasswordModalStore();
  const showModal = changePasswordStore;

  const [isPending, startTransition] = useTransition();
  const [error, setErrors] = useState<string | undefined>("");
  const [successs, setSuccesss] = useState<string | undefined>("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(ChangePasswordSchema),
  });

  const onSubmit = (values: FormData) => {
    startTransition(() => {
      changePasswordAction(values).then((data) => {
        setErrors(data?.error);
        setSuccesss(data?.success);
      });
    });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div>
          <label htmlFor="oldPassword" className="text-lg font-medium pb-2">
            Current Password
          </label>
          <div style={{ position: "relative" }}>
            <Controller
              name="oldPassword"
              control={control}
              render={({ field }) => (
                <input
                  disabled={isPending}
                  className={inputClassName}
                  placeholder="Enter old password"
                  type={showOldPassword ? "text" : "password"}
                  {...field}
                />
              )}
            />
            <button
              type="button"
              onClick={() => setShowOldPassword(!showOldPassword)}
              style={{ position: "absolute", right: 10, top: 10 }}
            >
              {showOldPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
          {errors.oldPassword && <p>{errors.oldPassword.message}</p>}
        </div>
        <div>
          <label htmlFor="newPassword" className="text-lg font-medium pb-2">
            New Password
          </label>
          <div style={{ position: "relative" }}>
            <Controller
              name="newPassword"
              control={control}
              render={({ field }) => (
                <input
                  disabled={isPending}
                  className={inputClassName}
                  placeholder="Enter new password"
                  type={showNewPassword ? "text" : "password"}
                  {...field}
                />
              )}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              style={{ position: "absolute", right: 10, top: 10 }}
            >
              {showNewPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
          {errors.newPassword && <p>{errors.newPassword.message}</p>}
        </div>
        <div>
          <label htmlFor="confirmPassword" className="text-lg font-medium pb-2">
            Confirm New Password
          </label>
          <div style={{ position: "relative" }}>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <input
                  disabled={isPending}
                  className={inputClassName}
                  placeholder="Enter new password again"
                  type={showConfirmPassword ? "text" : "password"}
                  {...field}
                />
              )}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={{ position: "absolute", right: 10, top: 10 }}
            >
              {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>
        <FormError message={error} />
        <FormSuccess message={successs} />
        <div className="flex w-full gap-3">
          <Button
            onClick={showModal.onClose}
            size="lg"
            variant="ghost"
            disabled={isPending}
            className="px-12 text-green-600 hover:text-green-500 transition-all duration-500 w-full"
          >
            Cancel
          </Button>
          <Button
            size="lg"
            className="px-12 bg-green-700 hover:bg-green-600 transition-all duration-500 w-full"
            type="submit"
            disabled={isPending}
          >
            Change Password
          </Button>
        </div>
      </form>
    </div>
  );

  return (
    <div className={cn(showModal.isOpen ? "flex" : "hidden")}>
      <div className="justify-center flex items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-[70] outline-none focus:outline-none bg-neutral-800/70 max-h-screen">
        <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full md:h-auto lg:h-auto">
          {/*content*/}
          <div
            className={`translate duration-300 h-full ${
              showModal.isOpen ? "translate-y-0" : "translate-y-full"
            } ${showModal.isOpen ? "opacity-100" : "opacity-0"}`}
          >
            <div
              className="
              translate h-auto border-0 rounded-2xl overflow-hidden shadow-lg relative flex flex-col 
              w-full bg-white outline-none focus:outline-none"
            >
              {/*header*/}
              <div className="flex w-full justify-between p-4">
                <h5 className="text-2xl font-medium">Change Password</h5>
                <X onClick={showModal.onClose} />
              </div>

              <div className="relative p-4 flex-auto">{bodyContent}</div>
              {/* {footer} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
