import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { fetchCreations, likeCreation, type Creation } from "@/lib/api";

const CARD_GRADIENTS = [
  "linear-gradient(135deg, #FFE0F0, #F0E6FF)",
  "linear-gradient(135deg, #FFF0E0, #FFE0F0)",
  "linear-gradient(135deg, #E0F0FF, #E0FFF0)",
  "linear-gradient(135deg, #F0E6FF, #E0F0FF)",
  "linear-gradient(135deg, #E0FFF0, #E0F0FF)",
  "linear-gradient(135deg, #FFF9E0, #FFE0F0)",
];

function timeAgo(iso: string | null): string {
  if (!iso) return "";
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86400000);
  if (days <= 0) return "Сегодня";
  if (days === 1) return "Вчера";
  if (days < 7) return `${days} дн.`;
  if (days < 30) return `${Math.floor(days / 7)} нед.`;
  return `${Math.floor(days / 30)} мес.`;
}

export default function Gallery() {
  const navigate = useNavigate();
  const [items, setItems] = useState<Creation[]>([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState<number[]>([]);

  useEffect(() => {
    fetchCreations()
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  const toggleLike = async (id: number) => {
    if (liked.includes(id)) return;
    setLiked((prev) => [...prev, id]);
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, likes: it.likes + 1 } : it))
    );
    try {
      await likeCreation(id);
    } catch {
      /* keep optimistic state */
    }
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
              {loading ? "Загружаю..." : `${items.length} волшебных работ 🌟`}
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

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <span className="text-6xl animate-star-spin">⭐</span>
          <p className="font-fredoka text-lg font-bold" style={{ color: "#A855F7" }}>
            Достаю твои рисунки...
          </p>
        </div>
      )}

      {/* Empty state */}
      {!loading && items.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 px-8 gap-4 text-center">
          <span className="text-7xl animate-bounce-soft">🎨</span>
          <h2 className="font-fredoka text-2xl font-bold" style={{ color: "#A855F7" }}>
            Пока пусто!
          </h2>
          <p className="font-fredoka text-base" style={{ color: "#9CA3AF" }}>
            Загрузи свой первый рисунок и оживи его магией ✨
          </p>
          <button
            onClick={() => navigate("/studio")}
            className="btn-magic mt-2"
            style={{
              background: "linear-gradient(135deg, #FF6B9D, #A855F7)",
              boxShadow: "0 6px 0 #9c27b0, 0 10px 20px rgba(168,85,247,0.4)",
              padding: "16px 36px",
              borderRadius: "100px",
            }}
          >
            <span className="font-fredoka text-xl font-bold text-white">🚀 Создать первое!</span>
          </button>
        </div>
      )}

      {/* Grid */}
      {!loading && items.length > 0 && (
        <div className="px-4 pt-5 grid grid-cols-2 gap-4 max-w-sm mx-auto">
          {items.map((item, i) => (
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
                className="h-36 flex items-center justify-center relative overflow-hidden"
                style={{ background: CARD_GRADIENTS[i % 6] }}
              >
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-6xl animate-float" style={{ animationDelay: `${i * 0.3}s` }}>
                    {item.emoji}
                  </span>
                )}

                {/* Effect badge */}
                {item.effect && (
                  <div className="absolute top-2 left-2 flex gap-1">
                    <span
                      className="px-2 h-7 rounded-full flex items-center justify-center text-sm font-fredoka font-bold"
                      style={{ background: "rgba(255,255,255,0.92)", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", color: "#A855F7" }}
                    >
                      {item.emoji} {item.effect}
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-3">
                <p className="font-fredoka text-sm font-bold leading-tight truncate" style={{ color: "#7C3AED" }}>
                  {item.title}
                </p>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="font-fredoka text-xs" style={{ color: "#9CA3AF" }}>
                    {timeAgo(item.created_at)}
                  </span>
                  <button
                    onClick={() => toggleLike(item.id)}
                    className="flex items-center gap-1 transition-transform hover:scale-110 active:scale-125"
                  >
                    <span className="text-sm">{liked.includes(item.id) ? "❤️" : "🤍"}</span>
                    <span className="font-fredoka text-xs font-bold" style={{ color: "#FF6B9D" }}>
                      {item.likes}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && items.length > 0 && (
        <div className="text-center mt-8 px-4">
          <button
            onClick={() => navigate("/studio")}
            className="font-fredoka text-base font-semibold transition-transform hover:scale-105"
            style={{ color: "#A855F7" }}
          >
            + Создать новое творение ✨
          </button>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
