"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  BookOpen,
  Flame,
  TrendingUp,
  Plus,
  Pencil,
  Trash2,
  X,
  Clock,
  User,
  Save,
  UserCheck,
} from "lucide-react";
import { useAuth } from "@/src/context/auth-context";
import { lessonsAPI, usersAPI, registerForLessonAPI } from "@/src/services/api";
import { toast } from "sonner";
import { AnimatedCounter } from "@/components/animated-counter";

interface Lesson {
  id?: number;
  lessonName: string;
  teacherName: string;
  dTime: string;
  maxUsers: number;
  sumUsers?: number;
}

interface UserData {
  id?: number;
  name: string;
  email: string;
  phone?: string;
  sumLessons?: number;
}

// Mock data
const MOCK_LESSONS: Lesson[] = [
  { id: 1, lessonName: "Power Yoga", teacherName: "Sarah Chen", dTime: new Date(Date.now() + 2 * 3600000).toISOString(), maxUsers: 20, sumUsers: 15 },
  { id: 2, lessonName: "HIIT Burn", teacherName: "Mike Torres", dTime: new Date(Date.now() + 4 * 3600000).toISOString(), maxUsers: 15, sumUsers: 14 },
  { id: 3, lessonName: "Spin Class", teacherName: "Emma Wilson", dTime: new Date(Date.now() + 6 * 3600000).toISOString(), maxUsers: 25, sumUsers: 10 },
  { id: 4, lessonName: "Pilates Core", teacherName: "Lisa Park", dTime: new Date(Date.now() + 24 * 3600000).toISOString(), maxUsers: 18, sumUsers: 18 },
  { id: 5, lessonName: "Boxing Fit", teacherName: "Jake Adams", dTime: new Date(Date.now() + 48 * 3600000).toISOString(), maxUsers: 12, sumUsers: 5 },
];

const MOCK_USERS: UserData[] = [
  { id: 1, name: "Alex Johnson", email: "alex@email.com", phone: "050-111-2222", sumLessons: 12 },
  { id: 2, name: "Maria Garcia", email: "maria@email.com", phone: "050-333-4444", sumLessons: 8 },
  { id: 3, name: "James Kim", email: "james@email.com", phone: "050-555-6666", sumLessons: 15 },
  { id: 4, name: "Sofia Müller", email: "sofia@email.com", phone: "050-777-8888", sumLessons: 6 },
  { id: 5, name: "Omar Hassan", email: "omar@email.com", phone: "050-999-0000", sumLessons: 20 },
];

export default function AdminDashboard() {
  const { user } = useAuth();
  const [lessons, setLessons] = useState<Lesson[]>(MOCK_LESSONS);
  const [users, setUsers] = useState<UserData[]>(MOCK_USERS);
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [activeTab, setActiveTab] = useState<"lessons" | "users">("lessons");

  // Form state
  const [formName, setFormName] = useState("");
  const [formTeacher, setFormTeacher] = useState("");
  const [formDate, setFormDate] = useState("");
  const [formMaxUsers, setFormMaxUsers] = useState(20);

  // Try to load from API
  useEffect(() => {
    async function fetchData() {
      try {
        const [lessonsRes, usersRes] = await Promise.all([
          lessonsAPI.getAll(),
          usersAPI.getAll(),
        ]);
        if (lessonsRes.data?.length > 0) setLessons(lessonsRes.data);
        if (usersRes.data?.length > 0) setUsers(usersRes.data);
      } catch {
        // Use mock data
      }
    }
    fetchData();
  }, []);

  const openNewLesson = () => {
    setEditingLesson(null);
    setFormName("");
    setFormTeacher("");
    setFormDate("");
    setFormMaxUsers(20);
    setShowLessonModal(true);
  };

  const openEditLesson = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setFormName(lesson.lessonName);
    setFormTeacher(lesson.teacherName);
    setFormDate(lesson.dTime.slice(0, 16));
    setFormMaxUsers(lesson.maxUsers);
    setShowLessonModal(true);
  };

  const handleSaveLesson = async () => {
    const data = {
      lessonName: formName,
      teacherName: formTeacher,
      dTime: new Date(formDate).toISOString(),
      maxUsers: formMaxUsers,
    };

    try {
      if (editingLesson) {
        await lessonsAPI.update(editingLesson.id!, data);
        setLessons((prev) =>
          prev.map((l) => (l.id === editingLesson.id ? { ...l, ...data } : l))
        );
        toast.success("Lesson updated!");
      } else {
        const res = await lessonsAPI.create(data);
        setLessons((prev) => [...prev, res.data]);
        toast.success("Lesson created!");
      }
    } catch {
      // Mock action
      if (editingLesson) {
        setLessons((prev) =>
          prev.map((l) =>
            l.id === editingLesson.id ? { ...l, ...data } : l
          )
        );
        toast.success("Lesson updated!");
      } else {
        setLessons((prev) => [
          ...prev,
          { ...data, id: Date.now(), sumUsers: 0 },
        ]);
        toast.success("Lesson created!");
      }
    }
    setShowLessonModal(false);
  };

  const handleDeleteLesson = async (lesson: Lesson) => {
    try {
      await lessonsAPI.delete(lesson.id!);
    } catch {
      // Mock
    }
    setLessons((prev) => prev.filter((l) => l.id !== lesson.id));
    toast.success("Lesson deleted");
  };

  // Stats
  const totalCalories = 47850;
  const todayClasses = lessons.filter((l) => {
    const d = new Date(l.dTime);
    const now = new Date();
    return d.toDateString() === now.toDateString();
  }).length;

  return (
    <div className="flex flex-col gap-6 p-6 relative">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold" style={{ color: "#f5f5f5" }}>
          Admin Dashboard
        </h1>
        <p className="text-sm mt-1" style={{ color: "#808080" }}>
          Welcome back, {user?.name || "Admin"}. Here is your studio overview.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            icon: Users,
            label: "Active Members",
            value: users.length,
            color: "#CCFF00",
            suffix: "",
          },
          {
            icon: BookOpen,
            label: "Total Classes",
            value: lessons.length,
            color: "#CCFF00",
            suffix: "",
          },
          {
            icon: Clock,
            label: "Classes Today",
            value: todayClasses || 3,
            color: "#FF8C00",
            suffix: "",
          },
          {
            icon: Flame,
            label: "Calories This Week",
            value: totalCalories,
            color: "#FF8C00",
            suffix: "",
          },
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass rounded-2xl p-5 flex flex-col items-center gap-3"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${stat.color}15` }}
            >
              <stat.icon className="h-5 w-5" style={{ color: stat.color }} />
            </div>
            <AnimatedCounter
              end={stat.value}
              label={stat.label}
              color={stat.color}
              suffix={stat.suffix}
            />
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2">
        {(["lessons", "users"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
            style={
              activeTab === tab
                ? { backgroundColor: "#CCFF00", color: "#0f0f14", boxShadow: "0 0 20px rgba(204,255,0,0.3)" }
                : { backgroundColor: "rgba(255,255,255,0.05)", color: "#808080" }
            }
          >
            {tab === "lessons" ? "Manage Classes" : "View Members"}
          </button>
        ))}
      </div>

      {/* Lessons Tab */}
      {activeTab === "lessons" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass rounded-2xl overflow-hidden"
        >
          <div className="p-5 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <h3 className="text-base font-bold" style={{ color: "#f5f5f5" }}>
              All Classes ({lessons.length})
            </h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openNewLesson}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300"
              style={{ backgroundColor: "#CCFF00", color: "#0f0f14" }}
            >
              <Plus className="h-4 w-4" />
              Add Class
            </motion.button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  {["Class Name", "Instructor", "Date & Time", "Capacity", "Actions"].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      style={{ color: "#606060" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {lessons.map((lesson, idx) => (
                  <motion.tr
                    key={lesson.id || idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="transition-colors duration-200"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.02)")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    <td className="px-5 py-4">
                      <span className="text-sm font-semibold" style={{ color: "#f5f5f5" }}>
                        {lesson.lessonName}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm" style={{ color: "#b0b0b0" }}>
                        {lesson.teacherName}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm" style={{ color: "#b0b0b0" }}>
                        {new Date(lesson.dTime).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}{" "}
                        {new Date(lesson.dTime).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${((lesson.sumUsers || 0) / lesson.maxUsers) * 100}%`,
                              background: (lesson.sumUsers || 0) >= lesson.maxUsers ? "#666" : "linear-gradient(90deg, #CCFF00, #99cc00)",
                            }}
                          />
                        </div>
                        <span className="text-xs" style={{ color: "#808080" }}>
                          {lesson.sumUsers || 0}/{lesson.maxUsers}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditLesson(lesson)}
                          className="p-2 rounded-lg transition-all duration-200 hover:scale-110"
                          style={{ backgroundColor: "rgba(204, 255, 0, 0.1)" }}
                        >
                          <Pencil className="h-3.5 w-3.5" style={{ color: "#CCFF00" }} />
                        </button>
                        <button
                          onClick={() => handleDeleteLesson(lesson)}
                          className="p-2 rounded-lg transition-all duration-200 hover:scale-110"
                          style={{ backgroundColor: "rgba(255, 80, 80, 0.1)" }}
                        >
                          <Trash2 className="h-3.5 w-3.5" style={{ color: "#ff5050" }} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Users Tab */}
      {activeTab === "users" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass rounded-2xl overflow-hidden"
        >
          <div className="p-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <h3 className="text-base font-bold" style={{ color: "#f5f5f5" }}>
              All Members ({users.length})
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  {["Name", "Email", "Phone", "Classes Attended"].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      style={{ color: "#606060" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((u, idx) => (
                  <motion.tr
                    key={u.id || idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="transition-colors duration-200"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.02)")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                          style={{ backgroundColor: "rgba(204, 255, 0, 0.1)", color: "#CCFF00" }}
                        >
                          {u.name.charAt(0)}
                        </div>
                        <span className="text-sm font-semibold" style={{ color: "#f5f5f5" }}>
                          {u.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm" style={{ color: "#b0b0b0" }}>{u.email}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm" style={{ color: "#b0b0b0" }}>{u.phone || "N/A"}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm font-medium" style={{ color: "#CCFF00" }}>
                        {u.sumLessons || 0}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        onClick={openNewLesson}
        className="fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl neon-lime transition-all duration-300"
        style={{ backgroundColor: "#CCFF00" }}
      >
        <Plus className="h-6 w-6" style={{ color: "#0f0f14" }} />
      </motion.button>

      {/* Lesson Modal */}
      <AnimatePresence>
        {showLessonModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
            onClick={() => setShowLessonModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="glass-strong rounded-2xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold" style={{ color: "#f5f5f5" }}>
                  {editingLesson ? "Edit Class" : "Add New Class"}
                </h3>
                <button
                  onClick={() => setShowLessonModal(false)}
                  className="p-2 rounded-lg transition-all duration-200"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                >
                  <X className="h-4 w-4" style={{ color: "#808080" }} />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#b0b0b0" }}>Class Name</label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g., Power Yoga"
                    className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 placeholder:opacity-40"
                    style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(204,255,0,0.1)", color: "#f5f5f5" }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#b0b0b0" }}>Instructor</label>
                  <input
                    type="text"
                    value={formTeacher}
                    onChange={(e) => setFormTeacher(e.target.value)}
                    placeholder="Instructor name"
                    className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 placeholder:opacity-40"
                    style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(204,255,0,0.1)", color: "#f5f5f5" }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#b0b0b0" }}>Date & Time</label>
                  <input
                    type="datetime-local"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2"
                    style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(204,255,0,0.1)", color: "#f5f5f5", colorScheme: "dark" }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#b0b0b0" }}>Max Capacity</label>
                  <input
                    type="number"
                    value={formMaxUsers}
                    onChange={(e) => setFormMaxUsers(Number(e.target.value))}
                    min={1}
                    className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2"
                    style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(204,255,0,0.1)", color: "#f5f5f5" }}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSaveLesson}
                  disabled={!formName || !formTeacher || !formDate}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm mt-2 transition-all duration-300 disabled:opacity-50"
                  style={{ backgroundColor: "#CCFF00", color: "#0f0f14" }}
                >
                  <Save className="h-4 w-4" />
                  {editingLesson ? "Update Class" : "Create Class"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
