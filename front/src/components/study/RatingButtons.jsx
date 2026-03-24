import { useState } from 'react';

const ratings = [
  { value: 1, label: 'Снова', emoji: '🤯', desc: '< 10 мин', bg: 'bg-red-50', text: 'text-red-600', shadow: 'shadow-red-200/50' },
  { value: 2, label: 'Тяжело', emoji: '😖', desc: '1 день', bg: 'bg-orange-50', text: 'text-orange-600', shadow: 'shadow-orange-200/50' },
  { value: 3, label: 'Хорошо', emoji: '🧐', desc: '3–5 дней', bg: 'bg-blue-50', text: 'text-blue-600', shadow: 'shadow-blue-200/50' },
  { value: 4, label: 'Легко', emoji: '🤓', desc: '6+ дней', bg: 'bg-green-50', text: 'text-green-600', shadow: 'shadow-green-200/50' },
];

export default function RatingButtons({ onRate, disabled = false }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="space-y-6 sm:space-y-10 py-2 max-w-2xl mx-auto">
      <div className="text-center space-y-2 px-4">
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
          Как ощущения?
        </h3>
        <p className="text-sm sm:text-base font-medium text-slate-400 leading-relaxed">
          Твоя оценка поможет Memora настроить идеальный момент для повторения
        </p>
      </div>

      <div className="flex flex-col sm:grid sm:grid-cols-4 gap-3 sm:gap-6 px-4">
        {ratings.map((r) => (
          <button
            key={r.value}
            type="button"
            disabled={disabled}
            onClick={() => onRate(r.value)}
            onMouseEnter={() => setHovered(r.value)}
            onMouseLeave={() => setHovered(null)}
            className={`
              group relative flex flex-row sm:flex-col items-center justify-start sm:justify-center 
              p-4 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] 
              transition-all duration-500 ease-[0.23,1,0.32,1]
              ${r.bg} border-2 border-transparent
              ${disabled ? 'opacity-40 cursor-not-allowed' : `
                cursor-pointer 
                hover:sm:-translate-y-3 hover:shadow-2xl ${r.shadow}
                active:scale-[0.97] sm:active:scale-90
              `}
            `}
          >
            <span className={`
              text-4xl sm:text-6xl mr-4 sm:mr-0 sm:mb-4 
              transition-all duration-700 ease-[0.34,1.56,0.64,1]
              ${hovered === r.value ? 'scale-110 sm:scale-125 -rotate-6' : 'scale-100'}
              filter drop-shadow-md
            `}>
              {r.emoji}
            </span>

            <div className="flex flex-col items-start sm:items-center">
              <span className={`
                font-black text-lg sm:text-xl tracking-tight
                ${r.text} leading-none mb-1
              `}>
                {r.label}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest font-black text-slate-400/80">
                {r.desc}
              </span>
            </div>

            <div className="ml-auto sm:hidden opacity-20 group-active:opacity-100 transition-opacity">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}