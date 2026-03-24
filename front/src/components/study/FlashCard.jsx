import { useState, useEffect } from "react";
import { ChevronDown, RefreshCw } from "lucide-react";

export default function FlashCard({
  card,
  isFlipped = false,
  onFlip,
  className = "",
  disabled = false,
  reverse = false,
}) {
  const [flipped, setFlipped] = useState(isFlipped);
  const question = reverse ? (card?.back ?? "") : (card?.front ?? "");
  const answer = reverse ? (card?.front ?? "") : (card?.back ?? "");

  useEffect(() => {
    setFlipped(isFlipped);
  }, [isFlipped]);

  const handleClick = () => {
    if (disabled) return;
    const newFlipped = !flipped;
    setFlipped(newFlipped);
    onFlip?.(newFlipped);
  };

  return (
    <div
      className={`
        perspective-[2000px] w-full max-w-3xl mx-auto px-4
        ${className}
      `}
    >
      <div
        className={`
          relative w-full min-h-[400px] sm:min-h-[460px] lg:min-h-[520px]
          transition-all duration-[800ms] cubic-bezier[0.34,1.56,0.64,1]
          preserve-3d cursor-pointer group
          ${flipped ? "rotate-y-180" : "hover:rotate-x-2"}
          ${disabled ? "pointer-events-none opacity-90" : ""}
        `}
        onClick={handleClick}
        role="button"
        tabIndex={disabled ? -1 : 0}
      >
        <div
          className="
            absolute inset-0 backface-hidden
            bg-white rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] 
            border border-slate-100 p-8 sm:p-12 lg:p-16
            flex flex-col items-center justify-center text-center
            group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)] transition-shadow duration-500
          "
        >
          <div className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <div className="px-4 py-1.5 bg-slate-50 border border-slate-100 rounded-full">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                {reverse ? "Реверс: Ответ" : "Вопрос"}
              </span>
            </div>
          </div>

          <div className="w-full max-h-full overflow-y-auto custom-scrollbar flex flex-col items-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.15] tracking-tight break-words py-4">
              {question || "Нет вопроса"}
            </h2>

            {!flipped && !disabled && (
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-blue-500/60 transition-all group-hover:text-blue-500">
                <span className="text-[10px] font-black uppercase tracking-widest">Нажми, чтобы узнать</span>
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center animate-bounce shadow-sm">
                   <RefreshCw size={18} strokeWidth={3} />
                </div>
              </div>
            )}
          </div>
        </div>

        <div
          className="
            absolute inset-0 backface-hidden rotate-y-180
            bg-gradient-to-br from-slate-900 to-slate-800 rounded-[3rem] 
            p-8 sm:p-12 lg:p-16 flex flex-col items-center justify-center text-center
            shadow-2xl shadow-slate-900/30 border border-slate-800
          "
        >
          <div className="absolute top-8 left-1/2 -translate-x-1/2">
            <div className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                Правильный ответ
              </span>
            </div>
          </div>

          <div className="w-full max-h-full overflow-y-auto custom-scrollbar flex flex-col items-center">
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-relaxed tracking-tight">
              {answer || "Нет ответа"}
            </p>
          </div>
          
          <div className="absolute inset-0 opacity-10 pointer-events-none rounded-[3rem] overflow-hidden">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}