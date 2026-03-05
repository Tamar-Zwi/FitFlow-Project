"use client";

import { useAuth } from "@/src/context/auth-context";
import { LandingPage } from "@/components/landing-page";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { isAuthenticated, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      if (isAdmin) {
        router.push("/dashboard/admin");
      } else {
        router.push("/dashboard/user");
      }
    }
  }, [isAuthenticated, isAdmin, router]);

  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#0f0f14" }}>
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "#CCFF00", borderTopColor: "transparent" }} />
      </div>
    );
  }

  return <LandingPage />;
}
