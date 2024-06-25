import Link from "next/link";
import Wrapper from "../Wrapper";

export default function Footer() {
  return (
    <footer className="bg-green-50">
      <Wrapper className="w-full flex flex-col py-8 lg:py-16">
        <div className="flex justify-between items-center">
          <small className="text-base">
            © Copyright 2024. All rights reserved
          </small>
          <div className="flex gap-6 text-base">
            <Link href="/">Privacy Policy</Link>
            <Link href="/">Terms & Conditions</Link>
          </div>
        </div>
      </Wrapper>
    </footer>
  );
}
