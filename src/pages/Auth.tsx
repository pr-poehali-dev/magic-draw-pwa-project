import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "@/lib/api";
import { toast } from "sonner";

const AVATARS = ["🦄", "🐸", "🐼", "🦊", "🐨", "🐯", "🦁", "🐙"];

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").replace(/^8/, "7").slice(0, 11);
  if (!digits) return "";
  let out = "+7";
  if (digits.length > 1) out += " (" + digits.slice(1, 4);
  if (digits.length >= 4) out += ") " + digits.slice(4, 7);
  if (digits.length >= 7) out += "-" + digits.slice(7, 9);
  if (digits.length >= 9) out += "-" + digits.slice(9, 11);
  return out;
}

export default function Auth() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("🦄");
  const [loading, setLoading] = useState(false);

  const phoneDigits = phone.replace(/\D/g, "");
  const canSubmit = name.trim().length > 0 && phoneDigits.length >= 11;

  const handleStart = async () => {
    if (!canSubmit || loading) return;
    setLoading(true);
    try {
      await login({ phone, child_name: name.trim(), avatar });
      toast.success("Добро пожаловать! 🎉");
      navigate("/studio");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Не удалось войти 🙏");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #F0E6FF 0%, #FFE0F0 50%, #E0F0FF 100%)" }}
    >
      {/* Floating deco */}
      {["⭐", "🌟", "✨", "💫"].map((e, i) => (
        <div
          key={i}
          className="absolute text-3xl animate-float pointer-events-none select-none"
          style={{
            left: `${[10, 80, 20, 75][i]}%`,
            top: `${[15, 10, 80, 75][i]}%`,
            animationDelay: `${i * 0.7}s`,
          }}
        >
          {e}
        </div>
      ))}

      <div className="w-full max-w-sm animate-page-in">
        {/* Back */}
        <button
          onClick={() => navigate("/")}
          className="font-fredoka text-lg font-semibold mb-6 flex items-center gap-2 transition-transform hover:scale-105"
          style={{ color: "#A855F7" }}
        >
          ← Назад
        </button>

        {/* Card */}
        <div
          className="rounded-4xl p-8"
          style={{
            background: "rgba(255,255,255,0.85)",
            boxShadow: "0 16px 48px rgba(168,85,247,0.2), inset 0 2px 0 rgba(255,255,255,0.9)",
            backdropFilter: "blur(20px)",
            border: "3px solid rgba(255,255,255,0.8)",
          }}
        >
          {/* Header */}
          <div className="text-center mb-6">
            <div className="text-6xl mb-3 animate-bounce-soft inline-block">{avatar}</div>
            <h2 className="font-fredoka text-3xl font-bold" style={{ color: "#A855F7" }}>
              Привет! 👋
            </h2>
            <p className="font-fredoka text-base mt-1" style={{ color: "#9CA3AF" }}>
              Создай свой волшебный профиль
            </p>
          </div>

          {/* Avatar picker */}
          <div className="mb-5">
            <p className="font-fredoka text-base font-semibold mb-2" style={{ color: "#6B21A8" }}>
              Выбери аватар:
            </p>
            <div className="grid grid-cols-4 gap-2">
              {AVATARS.map((a) => (
                <button
                  key={a}
                  onClick={() => setAvatar(a)}
                  className="text-3xl h-14 rounded-2xl transition-all duration-200 hover:scale-110"
                  style={{
                    background: avatar === a
                      ? "linear-gradient(135deg, #FF6B9D, #A855F7)"
                      : "rgba(168,85,247,0.1)",
                    border: avatar === a ? "3px solid #FF6B9D" : "3px solid transparent",
                    boxShadow: avatar === a ? "0 4px 12px rgba(255,107,157,0.5)" : "none",
                  }}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          {/* Name field */}
          <div className="mb-4">
            <label className="font-fredoka text-base font-semibold block mb-1.5" style={{ color: "#6B21A8" }}>
              👤 Имя ребёнка:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Например: Маша"
              className="w-full font-fredoka text-lg px-4 py-3 rounded-2xl outline-none transition-all duration-200"
              style={{ background: "#F9F0FF", border: "3px solid #E9D5FF", color: "#6B21A8" }}
              onFocus={(e) => { e.target.style.border = "3px solid #A855F7"; e.target.style.boxShadow = "0 0 0 4px rgba(168,85,247,0.15)"; }}
              onBlur={(e) => { e.target.style.border = "3px solid #E9D5FF"; e.target.style.boxShadow = "none"; }}
            />
          </div>

          {/* Phone field */}
          <div className="mb-4">
            <label className="font-fredoka text-base font-semibold block mb-1.5" style={{ color: "#6B21A8" }}>
              📱 Телефон родителя:
            </label>
            <input
              type="tel"
              inputMode="numeric"
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              placeholder="+7 (___) ___-__-__"
              className="w-full font-fredoka text-lg px-4 py-3 rounded-2xl outline-none transition-all duration-200"
              style={{ background: "#F9F0FF", border: "3px solid #E9D5FF", color: "#6B21A8" }}
              onFocus={(e) => { e.target.style.border = "3px solid #A855F7"; e.target.style.boxShadow = "0 0 0 4px rgba(168,85,247,0.15)"; }}
              onBlur={(e) => { e.target.style.border = "3px solid #E9D5FF"; e.target.style.boxShadow = "none"; }}
            />
          </div>

          {/* Main button */}
          <button
            onClick={handleStart}
            disabled={!canSubmit || loading}
            className="btn-magic w-full mt-6"
            style={{
              background: canSubmit
                ? "linear-gradient(135deg, #FF6B9D, #A855F7)"
                : "#E9D5FF",
              boxShadow: canSubmit ? "0 6px 0 #9c27b0, 0 10px 20px rgba(168,85,247,0.4)" : "none",
              padding: "18px",
              borderRadius: "100px",
              cursor: canSubmit && !loading ? "pointer" : "not-allowed",
            }}
          >
            <span
              className="font-fredoka text-2xl font-bold"
              style={{ color: canSubmit ? "white" : "#C4B5FD" }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-star-spin inline-block">⭐</span> Заходим...
                </span>
              ) : (
                "🚀 Вперёд!"
              )}
            </span>
          </button>
        </div>

        {/* Hint */}
        <p className="font-fredoka text-center text-sm mt-6 px-4" style={{ color: "#9CA3AF" }}>
          📱 Номер нужен родителям для входа.<br />Если профиль уже есть — просто введите тот же номер 😊
        </p>
      </div>
    </div>
  );
}
