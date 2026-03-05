"use client";

import { AuthProvider } from "@/src/context/auth-context";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <Toaster
        theme="dark"
        position="top-right"
        toastOptions={{
          style: {
            background: "rgba(26, 26, 36, 0.9)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(204, 255, 0, 0.15)",
            color: "#f5f5f5",
          },
        }}
      />
    </AuthProvider>
  );
}
