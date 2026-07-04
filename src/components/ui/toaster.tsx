"use client";

import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      position="top-right"
      toastOptions={{
        classNames: {
          toast: "bg-white border-border shadow-lg",
          title: "text-navy-800 font-semibold",
          description: "text-muted-foreground",
        },
      }}
    />
  );
}
