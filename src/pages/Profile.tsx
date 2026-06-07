import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";

const ACHIEVEMENTS = [
  { emoji: "🥇", label: "Первый рисунок", done: true },
  { emoji: "🎨", label: "5 рисунков", done: true },
  { emoji: "🌈", label: "Все цвета", done: true },
  { emoji: "⭐", label: "10 лайков", done: false },
  { emoji: "🏆", label: "Мастер", done: false },
  { emoji: "🦄", label: "Волшебник", done: false },
];

const STATS = [
  { emoji: "🎨", value: "6", label: "Рисунков" },
  { emoji: "❤️", value: "100", label: "Лайков" },
  { emoji: "✨", value: "18", label: "Эффектов" },
];

export default function Profile() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen pb-24"
      style={{ background: "linear-gradient(160deg, #FFF9E0 0%, #F0E6FF 50%, #FFE0F0 100%)" }}
    >
      {/* Header area */}
      <div
        className="px-4 pt-8 pb-6 text-center relative"
        style={{
          background: "linear-gradient(160deg, rgba(255,255,255,0.9), rgba(255,224,240,0.5))",
          borderBottom: "2px solid rgba(168,85,247,0.1)",
        }}
      >
        {/* Floating emoji */}
        {["⭐", "✨"].map((e, i) => (
          <div key={i} className={`absolute text-2xl animate-float pointer-events-none ${i === 0 ? "left-8 top-6" : "right-8 top-8"}`}
            style={{ animationDelay: `${i * 0.8}s` }}>
            {e}
          </div>
        ))}

        {/* Avatar */}
        <div
          className="w-28 h-28 rounded-full mx-auto flex items-center justify-center animate-bounce-soft text-6xl"
          style={{
            background: "linear-gradient(135deg, #FFE0F0, #F0E6FF)",
            boxShadow: "0 12px 36px rgba(168,85,247,0.3), inset 0 2px 0 rgba(255,255,255,0.8)",
            border: "4px solid rgba(255,255,255,0.9)",
          }}
        >
          🦄
        </div>

        <h2 className="font-fredoka text-3xl font-bold mt-4" style={{ color: "#7C3AED" }}>
          Маша
        </h2>
        <div className="flex items-center justify-center gap-2 mt-1">
          <span
            className="font-fredoka text-sm font-bold px-3 py-1 rounded-full text-white"
            style={{ background: "linear-gradient(135deg, #FF6B9D, #A855F7)" }}
          >
            ⭐ Начинающий маг
          </span>
        </div>

        {/* Stats row */}
        <div className="flex justify-center gap-6 mt-5">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-fredoka text-2xl font-bold" style={{ color: "#A855F7" }}>
                {s.emoji} {s.value}
              </div>
              <div className="font-fredoka text-xs" style={{ color: "#9CA3AF" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 pt-5 max-w-sm mx-auto space-y-5">
        {/* Premium banner */}
        <button
          onClick={() => navigate("/premium")}
          className="btn-magic w-full rounded-3xl p-4 flex items-center gap-4"
          style={{
            background: "linear-gradient(135deg, #F59E0B, #F97316)",
            boxShadow: "0 8px 24px rgba(245,158,11,0.4)",
          }}
        >
          <span className="text-4xl animate-wiggle inline-block">👑</span>
          <div className="text-left">
            <div className="font-fredoka text-lg font-bold text-white">Стать Магом Премиум!</div>
            <div className="font-fredoka text-sm text-white/80">Разблокируй все эффекты 🌟</div>
          </div>
          <span className="text-2xl ml-auto">→</span>
        </button>

        {/* Achievements */}
        <div>
          <h3 className="font-fredoka text-xl font-bold mb-3" style={{ color: "#7C3AED" }}>
            🏆 Достижения
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {ACHIEVEMENTS.map((a, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 py-4 rounded-3xl animate-fade-in-up"
                style={{
                  background: a.done ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.4)",
                  boxShadow: a.done ? "0 6px 20px rgba(168,85,247,0.15)" : "none",
                  border: a.done ? "2px solid rgba(168,85,247,0.2)" : "2px dashed rgba(168,85,247,0.2)",
                  opacity: a.done ? undefined : 0.5,
                  animationDelay: `${i * 0.06}s`,
                  animationFillMode: "backwards",
                }}
              >
                <span className="text-3xl" style={{ filter: a.done ? "none" : "grayscale(100%)" }}>
                  {a.emoji}
                </span>
                <span
                  className="font-fredoka text-xs font-semibold text-center leading-tight px-1"
                  style={{ color: a.done ? "#7C3AED" : "#9CA3AF" }}
                >
                  {a.label}
                </span>
                {a.done && (
                  <span className="text-xs">✅</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="space-y-3">
          {[
            { emoji: "🖼️", label: "Мои рисунки", path: "/gallery", color: "#3B82F6" },
            { emoji: "⚙️", label: "Настройки", path: "/settings", color: "#6B7280" },
          ].map((action) => (
            <button
              key={action.path}
              onClick={() => navigate(action.path)}
              className="w-full flex items-center gap-4 px-5 py-4 rounded-3xl transition-all duration-200 hover:scale-[1.02]"
              style={{
                background: "rgba(255,255,255,0.85)",
                boxShadow: "0 4px 16px rgba(168,85,247,0.1)",
                border: "2px solid rgba(255,255,255,0.9)",
              }}
            >
              <span className="text-3xl">{action.emoji}</span>
              <span className="font-fredoka text-lg font-semibold" style={{ color: action.color }}>
                {action.label}
              </span>
              <span className="ml-auto" style={{ color: "#D1D5DB" }}>→</span>
            </button>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
