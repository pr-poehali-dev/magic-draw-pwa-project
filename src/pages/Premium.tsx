import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";

const PLANS = [
  {
    id: "month",
    label: "1 месяц",
    price: "149₽",
    per: "в месяц",
    emoji: "🌟",
    color: "#A855F7",
    bg: "linear-gradient(135deg, #F0E6FF, #FFE0F0)",
    border: "#D8B4FE",
  },
  {
    id: "year",
    label: "1 год",
    price: "999₽",
    per: "в год • выгода 40%",
    emoji: "👑",
    color: "#F59E0B",
    bg: "linear-gradient(135deg, #FFF9E0, #FFF0E0)",
    border: "#FCD34D",
    badge: "🔥 Выгодно!",
  },
];

const PERKS = [
  { emoji: "🎭", label: "Все анимации", desc: "50+ эффектов оживления" },
  { emoji: "🗣️", label: "AI-голос", desc: "Рисунок расскажет историю" },
  { emoji: "🎵", label: "Музыка", desc: "10 волшебных саундтреков" },
  { emoji: "🌈", label: "Радужные эффекты", desc: "Спецэффекты и блёстки" },
  { emoji: "☁️", label: "Облако", desc: "Сохраняй неограниченно" },
  { emoji: "🚫", label: "Без рекламы", desc: "Чистый мир магии" },
];

export default function Premium() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("year");

  return (
    <div
      className="min-h-screen pb-24 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #FFF9E0 0%, #F0E6FF 40%, #FFE0F0 100%)" }}
    >
      {/* Floating stars */}
      {["⭐", "👑", "✨", "🌟", "💫"].map((e, i) => (
        <div
          key={i}
          className="absolute text-2xl animate-float pointer-events-none select-none"
          style={{
            left: `${[5, 85, 12, 78, 50][i]}%`,
            top: `${[15, 10, 70, 65, 5][i]}%`,
            animationDelay: `${i * 0.6}s`,
          }}
        >
          {e}
        </div>
      ))}

      {/* Header */}
      <div className="px-4 pt-8 pb-4 text-center">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 top-6 font-fredoka text-lg font-semibold transition-transform hover:scale-105"
          style={{ color: "#A855F7" }}
        >
          ← Назад
        </button>
        <div className="text-6xl animate-bounce-soft inline-block">👑</div>
        <h1 className="font-fredoka text-4xl font-bold mt-2" style={{ color: "#7C3AED" }}>
          Премиум Маг!
        </h1>
        <p className="font-fredoka text-base mt-1" style={{ color: "#9CA3AF" }}>
          Разблокируй всю магию MagicDraw
        </p>
      </div>

      <div className="px-4 max-w-sm mx-auto space-y-5">
        {/* Perks grid */}
        <div className="grid grid-cols-2 gap-3">
          {PERKS.map((perk, i) => (
            <div
              key={i}
              className="flex flex-col gap-1.5 p-4 rounded-3xl animate-fade-in-up"
              style={{
                background: "rgba(255,255,255,0.8)",
                boxShadow: "0 4px 16px rgba(168,85,247,0.1)",
                border: "2px solid rgba(255,255,255,0.9)",
                animationDelay: `${i * 0.07}s`,
                opacity: 0,
              }}
            >
              <span className="text-3xl">{perk.emoji}</span>
              <span className="font-fredoka text-sm font-bold" style={{ color: "#7C3AED" }}>
                {perk.label}
              </span>
              <span className="font-fredoka text-xs" style={{ color: "#9CA3AF" }}>
                {perk.desc}
              </span>
            </div>
          ))}
        </div>

        {/* Plan selector */}
        <div className="space-y-3">
          <h3 className="font-fredoka text-xl font-bold text-center" style={{ color: "#7C3AED" }}>
            Выбери план:
          </h3>
          {PLANS.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setSelected(plan.id)}
              className="w-full flex items-center gap-4 p-4 rounded-3xl transition-all duration-200 hover:scale-[1.02] relative"
              style={{
                background: plan.bg,
                border: `3px solid ${selected === plan.id ? plan.color : plan.border}`,
                boxShadow: selected === plan.id ? `0 8px 24px ${plan.color}44` : "0 4px 12px rgba(0,0,0,0.06)",
                transform: selected === plan.id ? "scale(1.02)" : undefined,
              }}
            >
              {plan.badge && (
                <div
                  className="absolute -top-3 right-4 font-fredoka text-xs font-bold px-3 py-1 rounded-full text-white"
                  style={{ background: "linear-gradient(135deg, #F97316, #EF4444)", boxShadow: "0 4px 12px rgba(249,115,22,0.4)" }}
                >
                  {plan.badge}
                </div>
              )}
              <span className="text-4xl">{plan.emoji}</span>
              <div className="text-left flex-1">
                <div className="font-fredoka text-lg font-bold" style={{ color: plan.color }}>
                  {plan.label}
                </div>
                <div className="font-fredoka text-xs" style={{ color: "#9CA3AF" }}>
                  {plan.per}
                </div>
              </div>
              <div className="text-right">
                <div className="font-fredoka text-2xl font-bold" style={{ color: plan.color }}>
                  {plan.price}
                </div>
              </div>
              <div
                className="w-6 h-6 rounded-full border-2 flex items-center justify-center"
                style={{
                  borderColor: plan.color,
                  background: selected === plan.id ? plan.color : "transparent",
                }}
              >
                {selected === plan.id && <span className="text-white text-xs">✓</span>}
              </div>
            </button>
          ))}
        </div>

        {/* CTA button */}
        <button
          className="btn-magic w-full"
          style={{
            background: "linear-gradient(135deg, #F59E0B, #F97316, #EF4444)",
            backgroundSize: "200% 200%",
            animation: "rainbow-bg 3s ease infinite",
            boxShadow: "0 8px 0 #d97706, 0 12px 32px rgba(245,158,11,0.5)",
            padding: "20px",
            borderRadius: "100px",
          }}
        >
          <span className="font-fredoka text-2xl font-bold text-white">
            👑 Стать Магом Премиум!
          </span>
        </button>

        <p className="font-fredoka text-xs text-center" style={{ color: "#9CA3AF" }}>
          Управляется родителями • Отмена в любое время
        </p>
      </div>

      <BottomNav />
    </div>
  );
}
