import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";

export default function Settings() {
  const navigate = useNavigate();
  const [sound, setSound] = useState(true);
  const [music, setMusic] = useState(true);
  const [voice, setVoice] = useState(true);
  const [lang, setLang] = useState("ru");
  const [safeMode, setSafeMode] = useState(true);

  const Toggle = ({ value, onChange, color = "#A855F7" }: { value: boolean; onChange: () => void; color?: string }) => (
    <button
      onClick={onChange}
      className="relative w-14 h-8 rounded-full transition-all duration-300"
      style={{
        background: value ? `linear-gradient(135deg, ${color}, ${color}99)` : "#E5E7EB",
        boxShadow: value ? `0 4px 12px ${color}55` : "none",
      }}
    >
      <div
        className="absolute top-1 w-6 h-6 rounded-full bg-white transition-all duration-300"
        style={{
          left: value ? "calc(100% - 28px)" : "4px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        }}
      />
    </button>
  );

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div>
      <h3 className="font-fredoka text-base font-bold mb-3 px-1" style={{ color: "#9CA3AF" }}>
        {title}
      </h3>
      <div
        className="rounded-3xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.85)",
          boxShadow: "0 4px 16px rgba(168,85,247,0.1)",
          border: "2px solid rgba(255,255,255,0.9)",
        }}
      >
        {children}
      </div>
    </div>
  );

  const Row = ({
    emoji, label, right, border = true,
  }: { emoji: string; label: string; right: React.ReactNode; border?: boolean }) => (
    <div
      className="flex items-center gap-4 px-5 py-4"
      style={{ borderBottom: border ? "1.5px solid rgba(168,85,247,0.07)" : "none" }}
    >
      <span className="text-2xl">{emoji}</span>
      <span className="font-fredoka text-base font-semibold flex-1" style={{ color: "#7C3AED" }}>
        {label}
      </span>
      {right}
    </div>
  );

  return (
    <div
      className="min-h-screen pb-24"
      style={{ background: "linear-gradient(160deg, #F0E6FF 0%, #E0F0FF 50%, #E0FFF0 100%)" }}
    >
      {/* Header */}
      <div
        className="sticky top-0 z-40 px-4 py-4 flex items-center gap-3"
        style={{
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(20px)",
          borderBottom: "2px solid rgba(168,85,247,0.1)",
        }}
      >
        <span className="text-3xl">⚙️</span>
        <h1 className="font-fredoka text-2xl font-bold" style={{ color: "#7C3AED" }}>
          Настройки
        </h1>
      </div>

      <div className="px-4 pt-5 max-w-sm mx-auto space-y-5">

        {/* Sound */}
        <Section title="🔊 ЗВУК">
          <Row emoji="🔊" label="Звуки кнопок" right={<Toggle value={sound} onChange={() => setSound(!sound)} />} />
          <Row emoji="🎵" label="Фоновая музыка" right={<Toggle value={music} onChange={() => setMusic(!music)} color="#3B82F6" />} />
          <Row emoji="🗣️" label="Голосовые подсказки" right={<Toggle value={voice} onChange={() => setVoice(!voice)} color="#10B981" />} border={false} />
        </Section>

        {/* Language */}
        <Section title="🌍 ЯЗЫК">
          <Row
            emoji="🌍"
            label="Язык приложения"
            border={false}
            right={
              <div className="flex gap-2">
                {[
                  { code: "ru", flag: "🇷🇺", label: "РУС" },
                  { code: "en", flag: "🇬🇧", label: "ENG" },
                ].map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className="font-fredoka text-xs font-bold px-3 py-2 rounded-xl transition-all duration-200"
                    style={{
                      background: lang === l.code ? "linear-gradient(135deg, #FF6B9D, #A855F7)" : "#F3E8FF",
                      color: lang === l.code ? "white" : "#A855F7",
                      boxShadow: lang === l.code ? "0 4px 12px rgba(168,85,247,0.4)" : "none",
                    }}
                  >
                    {l.flag} {l.label}
                  </button>
                ))}
              </div>
            }
          />
        </Section>

        {/* Safety */}
        <Section title="🔒 БЕЗОПАСНОСТЬ">
          <Row
            emoji="🛡️"
            label="Безопасный режим"
            right={<Toggle value={safeMode} onChange={() => setSafeMode(!safeMode)} color="#EF4444" />}
          />
          <Row
            emoji="👨‍👩‍👧"
            label="Родительский контроль"
            border={false}
            right={
              <span className="font-fredoka text-sm font-bold" style={{ color: "#9CA3AF" }}>
                →
              </span>
            }
          />
        </Section>

        {/* About */}
        <Section title="ℹ️ О ПРИЛОЖЕНИИ">
          <Row emoji="🎨" label="MagicDraw v1.0" right={<span className="font-fredoka text-sm" style={{ color: "#9CA3AF" }}>1.0.0</span>} />
          <Row emoji="📧" label="Связаться с нами" right={<span style={{ color: "#9CA3AF" }}>→</span>} />
          <Row emoji="⭐" label="Оценить приложение" right={<span style={{ color: "#9CA3AF" }}>→</span>} />
          <Row
            emoji="🔒"
            label="Политика конфиденциальности"
            border={false}
            right={<span style={{ color: "#9CA3AF" }}>→</span>}
          />
        </Section>

        {/* Logout */}
        <button
          onClick={() => navigate("/")}
          className="btn-magic w-full"
          style={{
            background: "linear-gradient(135deg, #FF6B9D, #EF4444)",
            boxShadow: "0 6px 0 #b91c1c, 0 10px 20px rgba(239,68,68,0.3)",
            padding: "16px",
            borderRadius: "100px",
          }}
        >
          <span className="font-fredoka text-xl font-bold text-white">
            👋 Выйти
          </span>
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
