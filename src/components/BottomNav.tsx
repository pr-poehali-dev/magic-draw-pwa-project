import { useNavigate, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { path: "/studio", emoji: "🎨", label: "Студия" },
  { path: "/gallery", emoji: "🖼️", label: "Галерея" },
  { path: "/profile", emoji: "🦄", label: "Профиль" },
  { path: "/settings", emoji: "⚙️", label: "Настройки" },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex items-end justify-around pb-safe"
      style={{
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(20px)",
        borderTop: "3px solid rgba(168,85,247,0.15)",
        boxShadow: "0 -8px 32px rgba(168,85,247,0.12)",
        paddingBottom: "max(env(safe-area-inset-bottom), 8px)",
        paddingTop: "8px",
      }}
    >
      {NAV_ITEMS.map((item) => {
        const active = location.pathname === item.path;
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="flex flex-col items-center gap-1 px-4 py-1 rounded-2xl transition-all duration-200"
            style={{
              transform: active ? "scale(1.15) translateY(-4px)" : "scale(1)",
            }}
          >
            <span
              className="text-3xl transition-all duration-200"
              style={{ filter: active ? "drop-shadow(0 4px 8px rgba(168,85,247,0.5))" : "none" }}
            >
              {item.emoji}
            </span>
            <span
              className="font-fredoka text-xs font-semibold transition-all duration-200"
              style={{ color: active ? "#A855F7" : "#9CA3AF" }}
            >
              {item.label}
            </span>
            {active && (
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "linear-gradient(135deg, #FF6B9D, #A855F7)" }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}
