"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const AUTH_ROUTES = ["/login", "/register"];

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuth = AUTH_ROUTES.some((r) => pathname.startsWith(r));

  return (
    <>
      {!isAuth && <Navbar />}
      <main className="flex-1">{children}</main>
      {!isAuth && <Footer />}
    </>
  );
}
