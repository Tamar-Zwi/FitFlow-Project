"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dumbbell,
  LayoutDashboard,
  Calendar,
  Users,
  BookOpen,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/src/context/auth-context";

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAdmin, logout } = useAuth();

  const navItems: NavItem[] = isAdmin
    ? [
        { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/admin" },
        { icon: BookOpen, label: "Classes", href: "/dashboard/admin" },
        { icon: Users, label: "Members", href: "/dashboard/admin" },
      ]
    : [
        { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/user" },
        { icon: Calendar, label: "Schedule", href: "/dashboard/user" },
        { icon: BookOpen, label: "My Classes", href: "/dashboard/user" },
      ];

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const SidebarContent = ({ mobile = false }: { mobile?: boolean }) => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-6" style={{ borderBottom: "1px solid rgba(204, 255, 0, 0.08)" }}>
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: "rgba(204, 255, 0, 0.15)" }}
        >
          <Dumbbell className="h-5 w-5" style={{ color: "#CCFF00" }} />
        </div>
        <AnimatePresence>
          {(!collapsed || mobile) && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="text-lg font-bold whitespace-nowrap overflow-hidden"
              style={{ color: "#f5f5f5" }}
            >
              FIT<span style={{ color: "#CCFF00" }}>FLOW</span>
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Role Badge */}
      <div className="px-4 py-3">
        <AnimatePresence>
          {(!collapsed || mobile) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 px-3 py-2 rounded-xl"
              style={{ backgroundColor: "rgba(204, 255, 0, 0.08)" }}
            >
              {isAdmin ? (
                <Shield className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "#FF8C00" }} />
              ) : (
                <Users className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "#CCFF00" }} />
              )}
              <div className="overflow-hidden">
                <p className="text-xs font-semibold truncate" style={{ color: "#f5f5f5" }}>
                  {user?.name || "User"}
                </p>
                <p className="text-[10px] truncate" style={{ color: isAdmin ? "#FF8C00" : "#CCFF00" }}>
                  {isAdmin ? "Administrator" : "Member"}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2">
        <div className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => mobile && setMobileOpen(false)}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${isActive ? "glow-active" : ""}`}
                style={
                  isActive
                    ? {
                        backgroundColor: "rgba(204, 255, 0, 0.12)",
                        color: "#CCFF00",
                      }
                    : {
                        color: "#707070",
                      }
                }
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)";
                    e.currentTarget.style.color = "#b0b0b0";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#707070";
                  }
                }}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <AnimatePresence>
                  {(!collapsed || mobile) && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      className="text-sm font-medium whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: "#CCFF00" }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Logout */}
      <div className="px-3 py-4" style={{ borderTop: "1px solid rgba(204, 255, 0, 0.08)" }}>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300"
          style={{ color: "#707070" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255, 80, 80, 0.1)";
            e.currentTarget.style.color = "#ff5050";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#707070";
          }}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          <AnimatePresence>
            {(!collapsed || mobile) && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="text-sm font-medium whitespace-nowrap overflow-hidden"
              >
                Sign Out
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 240 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="hidden md:flex flex-col h-screen sticky top-0 glass-strong z-30"
        style={{ borderRight: "1px solid rgba(204, 255, 0, 0.08)" }}
      >
        <SidebarContent />

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 z-50"
          style={{ backgroundColor: "#1a1a24", border: "1px solid rgba(204, 255, 0, 0.15)" }}
        >
          {collapsed ? (
            <ChevronRight className="h-3 w-3" style={{ color: "#CCFF00" }} />
          ) : (
            <ChevronLeft className="h-3 w-3" style={{ color: "#CCFF00" }} />
          )}
        </button>
      </motion.aside>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 p-2.5 rounded-xl glass"
      >
        <Menu className="h-5 w-5" style={{ color: "#CCFF00" }} />
      </button>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="md:hidden fixed inset-0 z-40"
              style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="md:hidden fixed left-0 top-0 h-screen w-[260px] z-50 glass-strong"
              style={{ borderRight: "1px solid rgba(204, 255, 0, 0.08)" }}
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg"
                style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              >
                <X className="h-4 w-4" style={{ color: "#808080" }} />
              </button>
              <SidebarContent mobile />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
