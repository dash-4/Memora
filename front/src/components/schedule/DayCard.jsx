export default function DayCard({ date, onClick }) {
  if (!date) {
    return <div className="aspect-square opacity-0" />;
  }

  const isToday = date.dateString === new Date().toISOString().split('T')[0];
  const hasCards = date.count > 0;

  return (
    <button
      onClick={onClick}
      type="button"
      className={`
        relative aspect-square w-full p-1 sm:p-2 rounded-2xl sm:rounded-[1.25rem] 
        transition-all duration-300 ease-[0.23,1,0.32,1]
        flex flex-col items-center justify-center overflow-hidden
        ${isToday 
          ? 'bg-slate-900 text-white shadow-xl shadow-slate-200 scale-105 z-10' 
          : hasCards 
            ? 'bg-blue-50/50 text-slate-900 hover:bg-blue-100/80 hover:-translate-y-1' 
            : 'bg-white border border-slate-50 text-slate-400 hover:bg-slate-50 hover:border-slate-100'
        }
        active:scale-90 focus:outline-none focus:ring-4 focus:ring-blue-100
      `}
    >
      <span className={`
        text-xs sm:text-base font-black tracking-tighter
        ${isToday ? 'text-white' : hasCards ? 'text-blue-700' : 'text-slate-400'}
      `}>
        {date.day}
      </span>

      {hasCards && (
        <div className={`
          mt-1 px-1.5 py-0.5 rounded-lg text-[9px] sm:text-[10px] font-black tracking-tight
          ${isToday ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-600'}
        `}>
          {date.count}
        </div>
      )}

      {isToday && hasCards && (
        <div className="absolute bottom-1.5 w-1 h-1 bg-blue-400 rounded-full animate-pulse" />
      )}
    </button>
  );
}