import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const AVATARS = ["🦄", "🐸", "🐼", "🦊", "🐨", "🐯", "🦁", "🐙"];
  const [avatar, setAvatar] = useState("🦄");

  const handleStart = () => {
    navigate("/studio");
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
              {mode === "login" ? "Добро пожаловать! 👋" : "Создай профиль! 🎉"}
            </h2>
          </div>

          {/* Avatar picker (register only) */}
          {mode === "register" && (
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
          )}

          {/* Name field */}
          <div className="mb-4">
            <label className="font-fredoka text-base font-semibold block mb-1.5" style={{ color: "#6B21A8" }}>
              {mode === "register" ? "👤 Твоё имя:" : "👤 Имя:"}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Например: Маша"
              className="w-full font-fredoka text-lg px-4 py-3 rounded-2xl outline-none transition-all duration-200"
              style={{
                background: "#F9F0FF",
                border: "3px solid #E9D5FF",
                color: "#6B21A8",
              }}
              onFocus={(e) => { e.target.style.border = "3px solid #A855F7"; e.target.style.boxShadow = "0 0 0 4px rgba(168,85,247,0.15)"; }}
              onBlur={(e) => { e.target.style.border = "3px solid #E9D5FF"; e.target.style.boxShadow = "none"; }}
            />
          </div>

          {/* Age field (register only) */}
          {mode === "register" && (
            <div className="mb-4">
              <label className="font-fredoka text-base font-semibold block mb-1.5" style={{ color: "#6B21A8" }}>
                🎂 Сколько лет?
              </label>
              <div className="flex gap-2">
                {[4, 5, 6, 7, 8, 9, 10].map((a) => (
                  <button
                    key={a}
                    onClick={() => setAge(String(a))}
                    className="flex-1 font-fredoka text-lg font-bold h-12 rounded-2xl transition-all duration-200 hover:scale-105"
                    style={{
                      background: age === String(a)
                        ? "linear-gradient(135deg, #FF6B9D, #A855F7)"
                        : "#F9F0FF",
                      color: age === String(a) ? "white" : "#A855F7",
                      border: age === String(a) ? "3px solid #FF6B9D" : "3px solid #E9D5FF",
                    }}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Main button */}
          <button
            onClick={handleStart}
            className="btn-magic w-full mt-6"
            style={{
              background: "linear-gradient(135deg, #FF6B9D, #A855F7)",
              boxShadow: "0 6px 0 #9c27b0, 0 10px 20px rgba(168,85,247,0.4)",
              padding: "18px",
              borderRadius: "100px",
            }}
          >
            <span className="font-fredoka text-2xl font-bold text-white">
              {mode === "login" ? "🚀 Вперёд!" : "🎉 Создать!"}
            </span>
          </button>

          {/* Toggle mode */}
          <div className="text-center mt-5">
            <button
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="font-fredoka text-base font-semibold transition-all hover:scale-105"
              style={{ color: "#A855F7" }}
            >
              {mode === "login"
                ? "Первый раз? Создай профиль 🌟"
                : "Уже есть? Войти 👋"}
            </button>
          </div>
        </div>

        {/* Divider hint */}
        <p className="font-fredoka text-center text-base mt-6 animate-bounce-soft" style={{ color: "#9CA3AF" }}>
          Родителям не нужна почта — просто имя! 😊
        </p>
      </div>
    </div>
  );
}
