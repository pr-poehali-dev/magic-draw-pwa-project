import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { saveCreation } from "@/lib/api";
import { toast } from "sonner";

const MAGIC_EFFECTS = [
  { emoji: "🎭", label: "Анимация", color: "#FF6B9D", bg: "#FFE0F0" },
  { emoji: "🎵", label: "Музыка", color: "#A855F7", bg: "#F0E6FF" },
  { emoji: "🗣️", label: "Голос", color: "#3B82F6", bg: "#E0F0FF" },
  { emoji: "✨", label: "Спецэффекты", color: "#10B981", bg: "#E0FFF0" },
  { emoji: "🌟", label: "Блёстки", color: "#F59E0B", bg: "#FFF9E0" },
  { emoji: "🌈", label: "Радуга", color: "#F97316", bg: "#FFF0E0" },
];

export default function Studio() {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploaded, setUploaded] = useState<string | null>(null);
  const [selectedEffect, setSelectedEffect] = useState<string | null>(null);
  const [isMagicking, setIsMagicking] = useState(false);
  const [magicApplied, setMagicApplied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [done, setDone] = useState(false);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setUploaded(ev.target?.result as string);
    reader.readAsDataURL(file);
    setMagicApplied(false);
    setDone(false);
  };

  const handleMagic = () => {
    if (!uploaded || !selectedEffect) return;
    setIsMagicking(true);
    setTimeout(() => {
      setIsMagicking(false);
      setMagicApplied(true);
      toast.success("Магия применена! Теперь сохрани рисунок 🌟");
    }, 2500);
  };

  const handleSave = async () => {
    if (!uploaded || !selectedEffect || isSaving) return;
    setIsSaving(true);
    const effectData = MAGIC_EFFECTS.find((e) => e.label === selectedEffect);
    try {
      await saveCreation({
        image_base64: uploaded,
        title: "Мой рисунок",
        effect: selectedEffect,
        emoji: effectData?.emoji || "🎨",
      });
      setIsSaving(false);
      setDone(true);
      toast.success("Рисунок сохранён в галерею! 🎉");
    } catch (err) {
      setIsSaving(false);
      toast.error("Ой! Не получилось сохранить. Попробуй ещё раз 🙏");
    }
  };

  return (
    <div
      className="min-h-screen pb-24 relative"
      style={{ background: "linear-gradient(160deg, #F0E6FF 0%, #FFE0F0 60%, #E0F0FF 100%)" }}
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
        <span className="text-3xl animate-wiggle inline-block">🎨</span>
        <div>
          <h1 className="font-fredoka text-2xl font-bold" style={{ color: "#A855F7" }}>
            Студия Магии
          </h1>
          <p className="font-fredoka text-sm" style={{ color: "#9CA3AF" }}>
            Загрузи рисунок и оживи его!
          </p>
        </div>
        <button
          onClick={() => navigate("/premium")}
          className="ml-auto font-fredoka text-sm font-bold px-3 py-1.5 rounded-full text-white"
          style={{ background: "linear-gradient(135deg, #F59E0B, #F97316)" }}
        >
          ⭐ Премиум
        </button>
      </div>

      <div className="px-4 pt-6 space-y-6 max-w-sm mx-auto">

        {/* Upload zone */}
        <div
          className="relative rounded-4xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02]"
          onClick={() => fileRef.current?.click()}
          style={{
            background: uploaded ? "transparent" : "rgba(255,255,255,0.7)",
            border: `3px dashed ${uploaded ? "#A855F7" : "#D8B4FE"}`,
            minHeight: 220,
            boxShadow: "0 8px 32px rgba(168,85,247,0.15)",
          }}
        >
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
          />

          {uploaded ? (
            <div className="relative">
              <img
                src={uploaded}
                alt="Рисунок"
                className="w-full rounded-4xl object-cover"
                style={{ maxHeight: 280 }}
              />
              {done && (
                <div className="absolute inset-0 flex items-center justify-center rounded-4xl"
                  style={{ background: "rgba(168,85,247,0.1)", backdropFilter: "blur(2px)" }}>
                  <span className="text-7xl animate-tada">🎉</span>
                </div>
              )}
              <button
                className="absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg"
                style={{ background: "rgba(255,107,157,0.9)", boxShadow: "0 4px 12px rgba(255,107,157,0.4)" }}
                onClick={(e) => { e.stopPropagation(); setUploaded(null); setDone(false); }}
              >
                ×
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-12 gap-4">
              <div className="text-7xl animate-bounce-soft">📸</div>
              <div className="text-center">
                <p className="font-fredoka text-xl font-bold" style={{ color: "#A855F7" }}>
                  Загрузи рисунок!
                </p>
                <p className="font-fredoka text-base mt-1" style={{ color: "#9CA3AF" }}>
                  Нарисуй и сфотографируй
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Effect selector */}
        <div>
          <h3 className="font-fredoka text-lg font-bold mb-3" style={{ color: "#7C3AED" }}>
            ✨ Выбери магию:
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {MAGIC_EFFECTS.map((effect) => (
              <button
                key={effect.label}
                onClick={() => setSelectedEffect(effect.label)}
                className="flex flex-col items-center gap-2 py-4 px-2 rounded-3xl transition-all duration-200 hover:scale-105"
                style={{
                  background: selectedEffect === effect.label
                    ? `linear-gradient(135deg, ${effect.color}, ${effect.color}99)`
                    : effect.bg,
                  border: selectedEffect === effect.label
                    ? `3px solid ${effect.color}`
                    : "3px solid transparent",
                  boxShadow: selectedEffect === effect.label
                    ? `0 6px 20px ${effect.color}44`
                    : "0 2px 8px rgba(0,0,0,0.06)",
                  transform: selectedEffect === effect.label ? "scale(1.05) translateY(-2px)" : undefined,
                }}
              >
                <span className="text-3xl">{effect.emoji}</span>
                <span
                  className="font-fredoka text-xs font-bold leading-tight text-center"
                  style={{ color: selectedEffect === effect.label ? "white" : effect.color }}
                >
                  {effect.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Magic button */}
        <button
          onClick={handleMagic}
          disabled={!uploaded || !selectedEffect || isMagicking}
          className="btn-magic w-full relative overflow-hidden"
          style={{
            background: uploaded && selectedEffect
              ? "linear-gradient(135deg, #FF6B9D, #A855F7, #3B82F6)"
              : "#E9D5FF",
            backgroundSize: "200% 200%",
            animation: uploaded && selectedEffect ? "rainbow-bg 3s ease infinite" : "none",
            boxShadow: uploaded && selectedEffect
              ? "0 8px 0 #9c27b0, 0 12px 32px rgba(168,85,247,0.5)"
              : "none",
            padding: "20px",
            borderRadius: "100px",
            cursor: uploaded && selectedEffect ? "pointer" : "not-allowed",
          }}
        >
          <span
            className="font-fredoka text-2xl font-bold"
            style={{ color: uploaded && selectedEffect ? "white" : "#C4B5FD" }}
          >
            {isMagicking ? (
              <span className="flex items-center justify-center gap-3">
                <span className="animate-star-spin inline-block">⭐</span>
                Колдую...
                <span className="animate-star-spin inline-block" style={{ animationDirection: "reverse" }}>⭐</span>
              </span>
            ) : magicApplied ? (
              "✨ Магия применена!"
            ) : (
              "🪄 Применить магию!"
            )}
          </span>
        </button>

        {/* Save button */}
        <button
          onClick={handleSave}
          disabled={!magicApplied || isSaving || done}
          className="btn-magic w-full"
          style={{
            background: magicApplied && !done
              ? "linear-gradient(135deg, #10B981, #06B6D4)"
              : "#D1FAE5",
            boxShadow: magicApplied && !done
              ? "0 8px 0 #047857, 0 12px 24px rgba(16,185,129,0.4)"
              : "none",
            padding: "20px",
            borderRadius: "100px",
            cursor: magicApplied && !done && !isSaving ? "pointer" : "not-allowed",
          }}
        >
          <span
            className="font-fredoka text-2xl font-bold"
            style={{ color: magicApplied && !done ? "white" : "#6EE7B7" }}
          >
            {isSaving ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-star-spin inline-block">⭐</span> Сохраняю...
              </span>
            ) : done ? (
              "✅ Сохранено!"
            ) : (
              "💾 Сохранить"
            )}
          </span>
        </button>

        {done && (
          <button
            onClick={() => navigate("/gallery")}
            className="btn-magic w-full"
            style={{
              background: "linear-gradient(135deg, #3B82F6, #A855F7)",
              boxShadow: "0 6px 0 #6d28d9, 0 10px 24px rgba(59,130,246,0.4)",
              padding: "16px",
              borderRadius: "100px",
            }}
          >
            <span className="font-fredoka text-xl font-bold text-white">
              🖼️ В галерею!
            </span>
          </button>
        )}
      </div>

      <BottomNav />
    </div>
  );
}