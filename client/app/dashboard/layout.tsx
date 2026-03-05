"use client";

import { useAuth } from "@/src/context/auth-context";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#0f0f14" }}
      >
        <div
          className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: "#CCFF00", borderTopColor: "transparent" }}
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#0f0f14" }}>
      <DashboardSidebar />
      <main className="flex-1 min-h-screen overflow-y-auto md:pl-0 pt-14 md:pt-0">
        {children}
      </main>
    </div>
  );
}
