import { useState, useEffect, useRef, useMemo } from "react";
import { petAPI } from "@/services/api";
import { Sparkles, Trophy, Zap } from "lucide-react";

const XP_PER_LEVEL = 100;

function getPetTypeByLevel(level) {
  if (level >= 31) return "robot";
  if (level >= 11) return "dragon";
  return "cat";
}

export default function StudyPet({ compact = false }) {
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [blink, setBlink] = useState(false);
  const [isHappy, setIsHappy] = useState(false);
  const [evolving, setEvolving] = useState(false);
  const prevType = useRef(null);

  useEffect(() => {
    petAPI.get()
      .then(res => setPet(res.data))
      .catch(() => {
        setPet({ level: 1, xp: 0, name: "Мемори" });
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!pet) return;
    setIsHappy(true);
    const t = setTimeout(() => setIsHappy(false), 1200);
    return () => clearTimeout(t);
  }, [pet?.xp, pet?.level]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 200);
    }, 5000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!pet) return;
    const newType = getPetTypeByLevel(pet.level);
    if (prevType.current && prevType.current !== newType) {
      setEvolving(true);
      setTimeout(() => setEvolving(false), 2000);
    }
    prevType.current = newType;
  }, [pet?.level]);

  const traits = useMemo(() => {
    if (!pet) return null;
    const petType = getPetTypeByLevel(pet.level);
    
    const config = {
      cat: {
        emoji: blink ? "😸" : "🐱",
        color: "from-orange-400 to-rose-500",
        label: "Кот-ученик",
        anim: "animate-bounce" 
      },
      dragon: {
        emoji: "🐉",
        color: "from-emerald-400 to-teal-600",
        label: "Мудрый Дракон",
        anim: "animate-pulse"
      },
      robot: {
        emoji: "🤖",
        color: "from-blue-500 to-indigo-600",
        label: "Кибер-Разум",
        anim: "animate-spin-slow" 
      }
    };
    return config[petType];
  }, [pet?.level, blink]);

  if (loading) {
    return (
      <div className="w-full aspect-square max-h-[400px] rounded-[2.5rem] bg-slate-100 animate-pulse flex items-center justify-center">
        <Zap className="text-slate-300" size={48} />
      </div>
    );
  }

  const xpInLevel = pet.xp % XP_PER_LEVEL;
  const progress = (xpInLevel / XP_PER_LEVEL) * 100;

  return (
    <div className={`
      relative w-full overflow-hidden transition-all duration-500
      ${compact 
        ? "p-4 rounded-2xl bg-white border border-slate-100 shadow-sm" 
        : "p-8 rounded-[2.5rem] bg-slate-900 text-white shadow-2xl shadow-blue-900/20"}
    `}>
      {!compact && (
        <>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl" />
        </>
      )}

      <div className={`flex ${compact ? "flex-row items-center gap-4" : "flex-col items-center text-center"} relative z-10`}>
        
        <div className="relative">
          {evolving && (
            <div className="absolute inset-0 scale-150 bg-white/20 blur-xl rounded-full animate-ping" />
          )}
          
          <div className={`
            transition-all duration-700 leading-none select-none
            ${compact ? "text-5xl" : "text-[9rem] my-4"}
            ${isHappy ? "scale-110 rotate-3" : "scale-100 rotate-0"}
            ${evolving ? "opacity-50 blur-sm scale-150" : "opacity-100"}
            ${traits.anim}
          `}>
            {traits.emoji}
          </div>

          {!compact && isHappy && (
            <Sparkles className="absolute -top-2 -right-2 text-yellow-400 animate-pulse" size={32} />
          )}
        </div>

        <div className={`flex-1 ${compact ? "" : "w-full mt-4"}`}>
          <div className={`flex items-center ${compact ? "justify-start" : "justify-center"} gap-2 mb-1`}>
            <h2 className={`font-black tracking-tight ${compact ? "text-lg text-slate-900" : "text-3xl text-white"}`}>
              {pet.name}
            </h2>
            {!compact && (
              <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest bg-white/10 text-white/60 border border-white/5`}>
                {traits.label}
              </span>
            )}
          </div>

          <div className={`flex items-center ${compact ? "justify-start text-slate-500" : "justify-center text-blue-300"} gap-1.5 font-bold text-sm mb-4`}>
            <Trophy size={14} className={compact ? "text-orange-400" : "text-yellow-400"} />
            Уровень {pet.level}
          </div>

          <div className="relative group">
            <div className={`w-full ${compact ? "h-2" : "h-6"} bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/5 shadow-inner`}>
              <div
                className={`h-full bg-gradient-to-r ${traits.color} transition-all duration-1000 ease-out relative`}
                style={{ width: `${progress}%` }}
              >
                {!compact && (
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:20px_20px] animate-[slide_1s_linear_infinite]" />
                )}
              </div>
            </div>
            
            {!compact && (
              <div className="mt-2 flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-blue-400 transition-colors">
                <span>{xpInLevel} XP</span>
                <span>{XP_PER_LEVEL} XP</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {evolving && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-4xl animate-bounce">✨</div>
          <div className="text-4xl animate-bounce delay-150">⭐</div>
          <div className="text-4xl animate-bounce delay-300">⚡</div>
        </div>
      )}
    </div>
  );
}