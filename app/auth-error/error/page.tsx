import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BsExclamationTriangleFill } from "react-icons/bs";

export default function page() {
  return (
    <div className="flex flex-col justify-center items-center min-h-dvh bg-zinc-100">
      <div className="w-5/6 sm:w-4/6 md:w-3/6 lg:w-5/12 my-8 flex flex-col bg-zinc-50 p-8 rounded-md shadow-xl border-2 border-gray-200">
        {/* <h4 className="text-base md:text-2xl lg:text-3xl text-center font-semibold text-green-600 mb-5">
          A<span className="text-orange-400 text-center">C</span>M
        </h4> */}
        <div className="flex flex-col justify-center items-center gap-2">
          <BsExclamationTriangleFill
            className="text-center fill-destructive"
            size={30}
          />
        </div>
        {/* <h1 className="text-base md:text-xl lg:text-2xl text-center font-semibold text-green-600">
          Forgot Password
        </h1> */}
        <p className="text-xs sm:text-sm md:text-base text-center text-muted-foreground">
          Oops! Something went wrong!
        </p>
        <Link href="/auth/login" className="text-center mt-5">
          <Button variant="ghost">Back to login</Button>
        </Link>
      </div>
    </div>
  );
}
