import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FLOATING_ITEMS = [
  { emoji: "⭐", x: 8, y: 12, size: 2.5, delay: 0, duration: 4 },
  { emoji: "🌈", x: 85, y: 8, size: 3, delay: 0.5, duration: 5 },
  { emoji: "✨", x: 15, y: 75, size: 2, delay: 1, duration: 3.5 },
  { emoji: "🎨", x: 78, y: 70, size: 2.8, delay: 0.3, duration: 4.5 },
  { emoji: "💫", x: 50, y: 5, size: 2, delay: 0.8, duration: 4 },
  { emoji: "🌟", x: 3, y: 45, size: 2.2, delay: 1.2, duration: 5.5 },
  { emoji: "🦋", x: 90, y: 38, size: 2.5, delay: 0.6, duration: 4.2 },
  { emoji: "🎭", x: 65, y: 90, size: 2, delay: 1.5, duration: 3.8 },
  { emoji: "🌸", x: 30, y: 88, size: 2.3, delay: 0.2, duration: 5 },
  { emoji: "🎪", x: 92, y: 18, size: 1.8, delay: 1.8, duration: 4.8 },
];

const CLOUD_BUBBLES = [
  { color: "bg-magic-pink/20", x: 5, y: 20, size: 80 },
  { color: "bg-magic-purple/15", x: 70, y: 60, size: 120 },
  { color: "bg-magic-cyan/20", x: 40, y: 80, size: 90 },
  { color: "bg-magic-yellow/15", x: 80, y: 10, size: 70 },
];

export default function Splash() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [btnReady, setBtnReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
    setTimeout(() => setBtnReady(true), 800);
  }, []);

  return (
    <div
      className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center"
      style={{
        background: "linear-gradient(135deg, #FFE0F0 0%, #F0E6FF 30%, #E0F0FF 60%, #E0FFF0 100%)",
      }}
    >
      {/* Ambient blobs */}
      {CLOUD_BUBBLES.map((b, i) => (
        <div
          key={i}
          className={`absolute rounded-full ${b.color} animate-cloud-drift`}
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            width: b.size,
            height: b.size,
            animationDelay: `${i * 0.7}s`,
            animationDirection: i % 2 === 0 ? "normal" : "reverse",
            filter: "blur(30px)",
          }}
        />
      ))}

      {/* Floating decorative elements */}
      {FLOATING_ITEMS.map((item, i) => (
        <div
          key={i}
          className="absolute select-none pointer-events-none animate-float"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            fontSize: `${item.size}rem`,
            animationDelay: `${item.delay}s`,
            animationDuration: `${item.duration}s`,
            filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
          }}
        >
          {item.emoji}
        </div>
      ))}

      {/* Rainbow strip at top */}
      <div
        className="absolute top-0 left-0 right-0 h-3 rounded-b-full"
        style={{
          background: "linear-gradient(90deg, #FF6B9D, #F97316, #F59E0B, #10B981, #3B82F6, #A855F7, #FF6B9D)",
          backgroundSize: "200% 100%",
          animation: "rainbow-bg 3s linear infinite",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center px-6 py-8 max-w-sm mx-auto">

        {/* Logo character */}
        <div
          className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="relative">
            {/* Glow behind character */}
            <div
              className="absolute inset-0 rounded-full animate-pulse-glow"
              style={{
                background: "radial-gradient(circle, rgba(255,107,157,0.4) 0%, transparent 70%)",
                transform: "scale(1.5)",
              }}
            />

            {/* Main character bubble */}
            <div
              className="relative w-48 h-48 rounded-full flex items-center justify-center animate-bounce-soft"
              style={{
                background: "linear-gradient(135deg, #FFE0F0, #F0E6FF)",
                boxShadow: "0 16px 48px rgba(168, 85, 247, 0.3), inset 0 2px 0 rgba(255,255,255,0.8)",
                border: "4px solid rgba(255,255,255,0.8)",
              }}
            >
              <span className="text-8xl" style={{ filter: "drop-shadow(0 4px 12px rgba(168,85,247,0.4))" }}>
                🎨
              </span>

              {/* Sparkle stars around character */}
              {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                <div
                  key={i}
                  className="absolute animate-sparkle"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: `rotate(${deg}deg) translateX(70px) translateY(-50%)`,
                    animationDelay: `${i * 0.25}s`,
                    fontSize: "1.2rem",
                  }}
                >
                  ✨
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Title */}
        <div
          className={`mt-6 text-center transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h1
            className="font-fredoka text-6xl font-bold leading-none rainbow-text"
            style={{ letterSpacing: "-1px" }}
          >
            MagicDraw
          </h1>
          <p
            className="font-fredoka text-2xl font-medium mt-1"
            style={{ color: "#A855F7" }}
          >
            Оживи свой рисунок! 🌟
          </p>
        </div>

        {/* Fun tagline bubbles */}
        <div
          className={`flex flex-wrap gap-2 justify-center mt-5 transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {["🎭 Анимация", "🎵 Музыка", "🗣️ Голос", "🌈 Магия"].map((tag, i) => (
            <span
              key={i}
              className="font-fredoka text-sm font-semibold px-3 py-1.5 rounded-full text-white animate-fade-in-up"
              style={{
                background: ["#FF6B9D", "#A855F7", "#3B82F6", "#10B981"][i],
                boxShadow: `0 4px 12px ${["rgba(255,107,157,0.4)", "rgba(168,85,247,0.4)", "rgba(59,130,246,0.4)", "rgba(16,185,129,0.4)"][i]}`,
                animationDelay: `${0.4 + i * 0.1}s`,
                opacity: 0,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* START BUTTON */}
        <div
          className={`mt-10 transition-all duration-500 ${btnReady ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-90"}`}
        >
          <button
            onClick={() => navigate("/auth")}
            className="btn-magic relative group"
            style={{
              background: "linear-gradient(135deg, #FF6B9D, #A855F7)",
              boxShadow: "0 8px 0 #c2185b, 0 12px 24px rgba(255,107,157,0.5)",
              padding: "20px 48px",
              borderRadius: "100px",
            }}
          >
            <span className="font-fredoka text-3xl font-bold text-white flex items-center gap-3">
              <span className="text-3xl animate-wiggle inline-block">🚀</span>
              Играть!
            </span>

            {/* Shine effect */}
            <div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%)",
              }}
            />
          </button>

          {/* Button bounce hint */}
          <p className="font-fredoka text-center text-base mt-4 animate-bounce-soft" style={{ color: "#A855F7" }}>
            👆 Нажми и начнём!
          </p>
        </div>

        {/* Bottom decorative row */}
        <div
          className={`mt-8 flex gap-4 text-4xl transition-all duration-700 delay-700 ${visible ? "opacity-100" : "opacity-0"}`}
        >
          {["🦄", "🌈", "⭐", "🎪", "🦋"].map((e, i) => (
            <span
              key={i}
              className="animate-float select-none"
              style={{ animationDelay: `${i * 0.3}s`, animationDuration: `${3 + i * 0.5}s` }}
            >
              {e}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom rainbow strip */}
      <div
        className="absolute bottom-0 left-0 right-0 h-3 rounded-t-full"
        style={{
          background: "linear-gradient(90deg, #A855F7, #3B82F6, #06B6D4, #10B981, #F59E0B, #F97316, #FF6B9D)",
          backgroundSize: "200% 100%",
          animation: "rainbow-bg 3s linear infinite reverse",
        }}
      />
    </div>
  );
}
