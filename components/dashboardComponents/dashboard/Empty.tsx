import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface IProps {
  title: string;
  subtitle: string;
  showBtn?: boolean;
  btnTitle?: string;
}

export default function Empty({ title, subtitle, showBtn, btnTitle }: IProps) {
  return (
    <div className="flex flex-col justify-center items-center gap-1">
      <Image
        className="object-contain w-16"
        src="/emptySet.png"
        alt="Empty Transaction"
        width={200}
        height={200}
      />

      <h2 className="text-2xl font-semibold mt-4">{title}</h2>
      <p className="text-center w-10/12">{subtitle}</p>

      {showBtn && btnTitle && (
        <Link href="/dashboard/commodity" className="mt-8">
          <Button className="border-2 border-foreground text-foreground px-12 py-3 rounded-md bg-transparent hover:bg-muted">
            {btnTitle}
          </Button>
        </Link>
      )}
    </div>
  );
}
