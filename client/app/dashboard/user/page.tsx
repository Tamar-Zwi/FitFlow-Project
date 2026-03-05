"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Calendar, BookOpen, Target } from "lucide-react";
import { useAuth } from "@/src/context/auth-context";
import { lessonsAPI, registerForLessonAPI } from "@/src/services/api";
import { toast } from "sonner";
import { ClassCard } from "@/components/class-card";
import { WeeklyCalendar } from "@/components/weekly-calendar";
import { ProgressRing } from "@/components/progress-ring";
import { MotivationCard } from "@/components/motivation-card";
import { SuccessAnimation, useConfetti } from "@/components/success-animation";

interface Lesson {
  id?: number;
  lessonName: string;
  teacherName: string;
  dTime: string;
  maxUsers: number;
  sumUsers?: number;
}

// Mock data for demo
const MOCK_LESSONS: Lesson[] = [
  { id: 1, lessonName: "Power Yoga", teacherName: "Sarah Chen", dTime: new Date(Date.now() + 20 * 60000).toISOString(), maxUsers: 20, sumUsers: 15 },
  { id: 2, lessonName: "HIIT Burn", teacherName: "Mike Torres", dTime: new Date(Date.now() + 2 * 3600000).toISOString(), maxUsers: 15, sumUsers: 14 },
  { id: 3, lessonName: "Spin Class", teacherName: "Emma Wilson", dTime: new Date(Date.now() + 4 * 3600000).toISOString(), maxUsers: 25, sumUsers: 10 },
  { id: 4, lessonName: "Pilates Core", teacherName: "Lisa Park", dTime: new Date(Date.now() + 24 * 3600000).toISOString(), maxUsers: 18, sumUsers: 18 },
  { id: 5, lessonName: "Boxing Fit", teacherName: "Jake Adams", dTime: new Date(Date.now() + 26 * 3600000).toISOString(), maxUsers: 12, sumUsers: 5 },
  { id: 6, lessonName: "Stretch Flow", teacherName: "Sarah Chen", dTime: new Date(Date.now() + 48 * 3600000).toISOString(), maxUsers: 20, sumUsers: 8 },
  { id: 7, lessonName: "CrossFit", teacherName: "Mike Torres", dTime: new Date(Date.now() + 72 * 3600000).toISOString(), maxUsers: 16, sumUsers: 12 },
  { id: 8, lessonName: "Zen Meditation", teacherName: "Lisa Park", dTime: new Date(Date.now() + 96 * 3600000).toISOString(), maxUsers: 30, sumUsers: 4 },
];

export default function UserDashboard() {
  const { user } = useAuth();
  const [lessons, setLessons] = useState<Lesson[]>(MOCK_LESSONS);
  const [registeredLessons, setRegisteredLessons] = useState<string[]>([]);
  const [registeringLesson, setRegisteringLesson] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const fireConfetti = useConfetti();

  // Try to fetch from API, fall back to mock
  useEffect(() => {
    async function fetchLessons() {
      try {
        const res = await lessonsAPI.getAll();
        if (res.data && res.data.length > 0) {
          setLessons(res.data);
        }
      } catch {
        // Keep mock data
      }
    }
    fetchLessons();
  }, []);

  const handleRegister = useCallback(
    async (lesson: Lesson) => {
      if (!user) return;
      setRegisteringLesson(lesson.lessonName);

      try {
        await registerForLessonAPI.register({
          userPostModelToRegister: {
            email: user.email,
            name: user.name,
            password: "",
          },
          lessonPostModelToRegister: {
            lessonName: lesson.lessonName,
            teacherName: lesson.teacherName,
            dTime: lesson.dTime,
            maxUsers: lesson.maxUsers,
          },
          dTimeRegister: new Date().toISOString(),
        });
        setRegisteredLessons((prev) => [...prev, lesson.lessonName]);
        setShowSuccess(true);
        fireConfetti();
        toast.success(`Registered for ${lesson.lessonName}!`);
      } catch {
        // Mock success for demo
        setRegisteredLessons((prev) => [...prev, lesson.lessonName]);
        setShowSuccess(true);
        fireConfetti();
        toast.success(`Registered for ${lesson.lessonName}!`);
      } finally {
        setRegisteringLesson(null);
      }
    },
    [user, fireConfetti]
  );

  const classesAttended = 3;
  const weeklyGoal = 5;

  return (
    <div className="flex flex-col gap-6 p-6">
      <SuccessAnimation show={showSuccess} onComplete={() => setShowSuccess(false)} />

      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold" style={{ color: "#f5f5f5" }}>
          Welcome back, <span style={{ color: "#CCFF00" }}>{user?.name || "Athlete"}</span>
        </h1>
        <p className="text-sm mt-1" style={{ color: "#808080" }}>
          {"Here's"} your fitness overview for this week
        </p>
      </motion.div>

      {/* Top Row: Progress Ring + Motivation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-6 flex flex-col items-center justify-center gap-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-5 w-5" style={{ color: "#CCFF00" }} />
            <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: "#CCFF00" }}>
              Weekly Goal
            </h3>
          </div>
          <ProgressRing
            progress={classesAttended / weeklyGoal}
            label={`${classesAttended}/${weeklyGoal} classes`}
            sublabel="this week"
          />
        </motion.div>

        {/* Motivation Card */}
        <div className="lg:col-span-2">
          <MotivationCard />
        </div>
      </div>

      {/* Weekly Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="h-5 w-5" style={{ color: "#CCFF00" }} />
          <h2 className="text-lg font-bold" style={{ color: "#f5f5f5" }}>
            Weekly Schedule
          </h2>
        </div>
        <WeeklyCalendar
          lessons={lessons}
          registeredLessons={registeredLessons}
        />
      </motion.div>

      {/* Available Classes Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="h-5 w-5" style={{ color: "#CCFF00" }} />
          <h2 className="text-lg font-bold" style={{ color: "#f5f5f5" }}>
            Available Classes
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {lessons.map((lesson, i) => (
            <ClassCard
              key={lesson.id || i}
              lesson={lesson}
              onRegister={handleRegister}
              isRegistered={registeredLessons.includes(lesson.lessonName)}
              registering={registeringLesson === lesson.lessonName}
            />
          ))}
        </div>
      </motion.div>

      {/* My Classes */}
      {registeredLessons.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-lg font-bold mb-4" style={{ color: "#f5f5f5" }}>
            My Classes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {lessons
              .filter((l) => registeredLessons.includes(l.lessonName))
              .map((lesson, i) => (
                <ClassCard key={i} lesson={lesson} isRegistered showCapacity={false} />
              ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
