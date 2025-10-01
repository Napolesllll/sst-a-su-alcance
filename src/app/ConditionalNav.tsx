"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "../components/Navbar";

export function ConditionalNav() {
  const pathname = usePathname();

  // Ocultar navbar en las páginas de productos (lista y detalle)
  const shouldHideNav =
    pathname === "/productos" || pathname?.startsWith("/productos/");

  if (shouldHideNav) {
    return null;
  }

  return <Navbar />;
}
