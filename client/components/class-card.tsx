"use client";

import { motion } from "framer-motion";
import { Clock, User, Users as UsersIcon } from "lucide-react";

interface Lesson {
  id?: number;
  lessonName: string;
  teacherName: string;
  dTime: string;
  maxUsers: number;
  sumUsers?: number;
}

interface ClassCardProps {
  lesson: Lesson;
  onRegister?: (lesson: Lesson) => void;
  isRegistered?: boolean;
  registering?: boolean;
  showCapacity?: boolean;
}

export function ClassCard({
  lesson,
  onRegister,
  isRegistered = false,
  registering = false,
  showCapacity = true,
}: ClassCardProps) {
  const currentUsers = lesson.sumUsers ?? Math.floor(Math.random() * lesson.maxUsers);
  const spotsLeft = lesson.maxUsers - currentUsers;
  const isFull = spotsLeft <= 0;
  const isAlmostFull = spotsLeft > 0 && spotsLeft <= 3;
  const fillPercentage = (currentUsers / lesson.maxUsers) * 100;

  // Check if class starts within 30 min (mock)
  const classTime = new Date(lesson.dTime);
  const now = new Date();
  const diffMin = (classTime.getTime() - now.getTime()) / (1000 * 60);
  const isStartingSoon = diffMin > 0 && diffMin <= 30;

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`glass rounded-2xl p-5 flex flex-col gap-4 transition-all duration-300 ${isStartingSoon ? "pulse-lime" : ""} ${isFull ? "opacity-60 grayscale-[30%]" : ""}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold" style={{ color: "#f5f5f5" }}>
            {lesson.lessonName}
          </h3>
          <div className="flex items-center gap-1.5 mt-1">
            <User className="h-3 w-3" style={{ color: "#808080" }} />
            <span className="text-xs" style={{ color: "#808080" }}>
              {lesson.teacherName}
            </span>
          </div>
        </div>
        {isStartingSoon && (
          <span
            className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider pulse-orange"
            style={{ backgroundColor: "rgba(255, 140, 0, 0.15)", color: "#FF8C00" }}
          >
            Starting Soon
          </span>
        )}
      </div>

      {/* Time */}
      <div className="flex items-center gap-2">
        <Clock className="h-3.5 w-3.5" style={{ color: "#CCFF00" }} />
        <span className="text-xs font-medium" style={{ color: "#b0b0b0" }}>
          {new Date(lesson.dTime).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
          {" at "}
          {new Date(lesson.dTime).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>

      {/* Capacity Progress Bar */}
      {showCapacity && (
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <UsersIcon className="h-3 w-3" style={{ color: "#808080" }} />
              <span className="text-xs font-medium" style={{ color: "#808080" }}>
                {currentUsers}/{lesson.maxUsers} spots filled
              </span>
            </div>
            {isAlmostFull && !isFull && (
              <span
                className="text-[10px] font-bold pulse-orange"
                style={{ color: "#FF8C00" }}
              >
                Only {spotsLeft} left!
              </span>
            )}
          </div>
          <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
            <motion.div
              className="h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${fillPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{
                background: isFull
                  ? "#666"
                  : isAlmostFull
                  ? "linear-gradient(90deg, #FF8C00, #ff6600)"
                  : "linear-gradient(90deg, #CCFF00, #99cc00)",
              }}
            />
          </div>
        </div>
      )}

      {/* Action Button */}
      {onRegister && (
        <motion.button
          whileHover={!isFull && !isRegistered ? { scale: 1.03 } : {}}
          whileTap={!isFull && !isRegistered ? { scale: 0.97 } : {}}
          onClick={() => !isFull && !isRegistered && onRegister(lesson)}
          disabled={isFull || isRegistered || registering}
          className="w-full py-2.5 rounded-xl text-sm font-bold transition-all duration-300 disabled:cursor-not-allowed"
          style={
            isRegistered
              ? { backgroundColor: "rgba(204, 255, 0, 0.15)", color: "#CCFF00", border: "1px solid rgba(204, 255, 0, 0.3)" }
              : isFull
              ? { backgroundColor: "rgba(255,255,255,0.05)", color: "#666", border: "1px solid rgba(255,255,255,0.1)" }
              : { backgroundColor: "#CCFF00", color: "#0f0f14" }
          }
        >
          {registering ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "#0f0f14", borderTopColor: "transparent" }} />
              Registering...
            </div>
          ) : isRegistered ? (
            "Registered"
          ) : isFull ? (
            "Fully Booked"
          ) : (
            "Register Now"
          )}
        </motion.button>
      )}
    </motion.div>
  );
}
