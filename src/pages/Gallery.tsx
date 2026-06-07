import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";

const MOCK_CREATIONS = [
  { id: 1, emoji: "🦄", title: "Мой единорог", date: "Сегодня", likes: 12, effects: ["🎵", "✨"] },
  { id: 2, emoji: "🐉", title: "Дракон огонь", date: "Вчера", likes: 8, effects: ["🎭", "🌟"] },
  { id: 3, emoji: "🌈", title: "Радуга мечты", date: "3 дня", likes: 24, effects: ["🌈", "🗣️"] },
  { id: 4, emoji: "🚀", title: "Ракета в космос", date: "Неделя", likes: 16, effects: ["✨", "🎵"] },
  { id: 5, emoji: "🌊", title: "Морской кит", date: "Неделя", likes: 9, effects: ["🎭"] },
  { id: 6, emoji: "🏰", title: "Волшебный замок", date: "2 недели", likes: 31, effects: ["🌟", "🗣️", "🎵"] },
];

export default function Gallery() {
  const navigate = useNavigate();
  const [liked, setLiked] = useState<number[]>([]);

  const toggleLike = (id: number) => {
    setLiked((prev) => prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]);
  };

  return (
    <div
      className="min-h-screen pb-24"
      style={{ background: "linear-gradient(160deg, #E0F0FF 0%, #F0E6FF 50%, #FFE0F0 100%)" }}
    >
      {/* Header */}
      <div
        className="sticky top-0 z-40 px-4 py-4"
        style={{
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(20px)",
          borderBottom: "2px solid rgba(59,130,246,0.1)",
        }}
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl animate-float inline-block">🖼️</span>
          <div>
            <h1 className="font-fredoka text-2xl font-bold" style={{ color: "#3B82F6" }}>
              Мои творения
            </h1>
            <p className="font-fredoka text-sm" style={{ color: "#9CA3AF" }}>
              {MOCK_CREATIONS.length} волшебных работ 🌟
            </p>
          </div>
          <button
            onClick={() => navigate("/studio")}
            className="ml-auto font-fredoka text-sm font-bold px-4 py-2 rounded-full text-white"
            style={{ background: "linear-gradient(135deg, #3B82F6, #A855F7)", boxShadow: "0 4px 12px rgba(59,130,246,0.4)" }}
          >
            + Создать
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="px-4 pt-5 grid grid-cols-2 gap-4 max-w-sm mx-auto">
        {MOCK_CREATIONS.map((item, i) => (
          <div
            key={item.id}
            className="rounded-3xl overflow-hidden animate-fade-in-up"
            style={{
              background: "rgba(255,255,255,0.85)",
              boxShadow: "0 8px 24px rgba(168,85,247,0.15)",
              border: "2px solid rgba(255,255,255,0.9)",
              animationDelay: `${i * 0.08}s`,
              opacity: 0,
            }}
          >
            {/* Preview area */}
            <div
              className="h-36 flex items-center justify-center relative"
              style={{
                background: [
                  "linear-gradient(135deg, #FFE0F0, #F0E6FF)",
                  "linear-gradient(135deg, #FFF0E0, #FFE0F0)",
                  "linear-gradient(135deg, #E0F0FF, #E0FFF0)",
                  "linear-gradient(135deg, #F0E6FF, #E0F0FF)",
                  "linear-gradient(135deg, #E0FFF0, #E0F0FF)",
                  "linear-gradient(135deg, #FFF9E0, #FFE0F0)",
                ][i % 6],
              }}
            >
              <span
                className="text-6xl animate-float"
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                {item.emoji}
              </span>

              {/* Effects badges */}
              <div className="absolute top-2 left-2 flex gap-1">
                {item.effects.map((e, j) => (
                  <span
                    key={j}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-sm"
                    style={{ background: "rgba(255,255,255,0.9)", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
                  >
                    {e}
                  </span>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="p-3">
              <p className="font-fredoka text-sm font-bold leading-tight" style={{ color: "#7C3AED" }}>
                {item.title}
              </p>
              <div className="flex items-center justify-between mt-1.5">
                <span className="font-fredoka text-xs" style={{ color: "#9CA3AF" }}>
                  {item.date}
                </span>
                <button
                  onClick={() => toggleLike(item.id)}
                  className="flex items-center gap-1 transition-transform hover:scale-110 active:scale-125"
                >
                  <span className="text-sm">{liked.includes(item.id) ? "❤️" : "🤍"}</span>
                  <span className="font-fredoka text-xs font-bold" style={{ color: "#FF6B9D" }}>
                    {item.likes + (liked.includes(item.id) ? 1 : 0)}
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state helper */}
      <div className="text-center mt-8 px-4">
        <button
          onClick={() => navigate("/studio")}
          className="font-fredoka text-base font-semibold transition-transform hover:scale-105"
          style={{ color: "#A855F7" }}
        >
          + Создать новое творение ✨
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
