"use client";

import Footer from "./footer/Footer";
import Navbar from "./nav/Navbar";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Layout({ children, className }: Props) {
  return (
    <>
      <Navbar />
      <main className={`${className}`}>{children}</main>
      <Footer />
    </>
  );
}
