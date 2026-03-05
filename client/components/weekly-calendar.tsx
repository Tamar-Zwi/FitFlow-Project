"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, User } from "lucide-react";
import { useState, useMemo } from "react";

interface Lesson {
  id?: number;
  lessonName: string;
  teacherName: string;
  dTime: string;
  maxUsers: number;
  sumUsers?: number;
}

interface WeeklyCalendarProps {
  lessons: Lesson[];
  onSelectLesson?: (lesson: Lesson) => void;
  registeredLessons?: string[];
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const FULL_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function getWeekDates(offset: number) {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay() + offset * 7);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return d;
  });
}

export function WeeklyCalendar({ lessons, onSelectLesson, registeredLessons = [] }: WeeklyCalendarProps) {
  const [weekOffset, setWeekOffset] = useState(0);
  const weekDates = useMemo(() => getWeekDates(weekOffset), [weekOffset]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Group lessons by day
  const lessonsByDay = useMemo(() => {
    const map = new Map<number, Lesson[]>();
    for (let i = 0; i < 7; i++) map.set(i, []);
    lessons.forEach((l) => {
      const ld = new Date(l.dTime);
      weekDates.forEach((wd, idx) => {
        if (
          ld.getFullYear() === wd.getFullYear() &&
          ld.getMonth() === wd.getMonth() &&
          ld.getDate() === wd.getDate()
        ) {
          map.get(idx)?.push(l);
        }
      });
    });
    return map;
  }, [lessons, weekDates]);

  const monthLabel = weekDates[0].toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <div className="glass rounded-2xl p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-bold" style={{ color: "#f5f5f5" }}>
          {monthLabel}
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setWeekOffset((w) => w - 1)}
            className="p-2 rounded-lg transition-all duration-200 hover:scale-110"
            style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
          >
            <ChevronLeft className="h-4 w-4" style={{ color: "#b0b0b0" }} />
          </button>
          <button
            onClick={() => setWeekOffset(0)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
            style={{ backgroundColor: "rgba(204, 255, 0, 0.1)", color: "#CCFF00" }}
          >
            Today
          </button>
          <button
            onClick={() => setWeekOffset((w) => w + 1)}
            className="p-2 rounded-lg transition-all duration-200 hover:scale-110"
            style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
          >
            <ChevronRight className="h-4 w-4" style={{ color: "#b0b0b0" }} />
          </button>
        </div>
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-2">
        {weekDates.map((date, idx) => {
          const isToday = date.getTime() === today.getTime();
          const dayLessons = lessonsByDay.get(idx) || [];

          return (
            <div key={idx} className="flex flex-col items-center">
              {/* Day header */}
              <span className="text-[10px] font-medium mb-1 uppercase" style={{ color: "#606060" }}>
                {DAYS[idx]}
              </span>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-2 ${isToday ? "neon-lime" : ""}`}
                style={
                  isToday
                    ? { backgroundColor: "#CCFF00", color: "#0f0f14" }
                    : { color: "#b0b0b0" }
                }
              >
                {date.getDate()}
              </div>
              {/* Lesson dots */}
              <div className="flex flex-col gap-1 w-full min-h-[60px]">
                {dayLessons.slice(0, 3).map((lesson, li) => {
                  const classTime = new Date(lesson.dTime);
                  const now2 = new Date();
                  const diffMin = (classTime.getTime() - now2.getTime()) / (1000 * 60);
                  const isStartingSoon = diffMin > 0 && diffMin <= 30;
                  const isRegistered = registeredLessons.includes(lesson.lessonName);

                  return (
                    <motion.button
                      key={li}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onSelectLesson?.(lesson)}
                      className={`w-full py-1 px-1 rounded text-[8px] font-medium leading-tight truncate text-center ${isStartingSoon ? "pulse-lime" : ""}`}
                      style={
                        isRegistered
                          ? { backgroundColor: "rgba(204, 255, 0, 0.2)", color: "#CCFF00" }
                          : { backgroundColor: "rgba(255,255,255,0.06)", color: "#b0b0b0" }
                      }
                      title={`${lesson.lessonName} - ${FULL_DAYS[idx]} at ${classTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`}
                    >
                      {lesson.lessonName.slice(0, 6)}
                    </motion.button>
                  );
                })}
                {dayLessons.length > 3 && (
                  <span className="text-[8px] text-center" style={{ color: "#606060" }}>
                    +{dayLessons.length - 3}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#CCFF00" }} />
          <span className="text-[10px]" style={{ color: "#808080" }}>Registered</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.2)" }} />
          <span className="text-[10px]" style={{ color: "#808080" }}>Available</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full pulse-lime" style={{ backgroundColor: "#CCFF00" }} />
          <span className="text-[10px]" style={{ color: "#808080" }}>Starting Soon</span>
        </div>
      </div>
    </div>
  );
}
