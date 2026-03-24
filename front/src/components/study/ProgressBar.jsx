export default function ProgressBar({ current, total, className = '' }) {
  const progress = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className={`w-full ${className}`}>
      <div className="relative h-4 sm:h-5 bg-slate-100 rounded-[2rem] p-1 shadow-inner border border-slate-200/50 overflow-hidden">
        
        <div className="absolute inset-0 bg-gradient-to-b from-slate-200/20 to-transparent" />

        <div
          className="relative h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-full transition-all duration-700 ease-[0.23,1,0.32,1] shadow-[0_0_15px_rgba(79,70,229,0.3)]"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute top-0.5 left-2 right-2 h-[20%] bg-white/20 rounded-full blur-[0.5px]" />
        </div>
      </div>

      <div className="flex justify-between items-center mt-3 px-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">
            Прогресс
          </span>
          <span className="text-sm font-bold text-slate-900 tabular-nums">
            {current} <span className="text-slate-300 font-medium">/</span> {total}
          </span>
        </div>
        
        <div className="px-2 py-0.5 bg-slate-900 text-white text-[10px] font-black rounded-lg shadow-lg shadow-slate-200 tracking-tighter tabular-nums">
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
}