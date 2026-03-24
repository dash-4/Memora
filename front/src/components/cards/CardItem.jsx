import { Edit2, Trash2, Calendar, Target } from 'lucide-react';

export default function CardItem({ card, onEdit, onDelete }) {
  const statusConfig = {
    blue: { bg: 'bg-blue-50/50', text: 'text-blue-600', dot: 'bg-blue-500', label: 'Новая' },
    yellow: { bg: 'bg-amber-50/50', text: 'text-amber-600', dot: 'bg-amber-500', label: 'В процессе' },
    green: { bg: 'bg-emerald-50/50', text: 'text-emerald-600', dot: 'bg-emerald-500', label: 'Выучена' }
  };

  const colorKey = 
    card.repetitions === 0 ? 'blue' : 
    card.repetitions < 3 ? 'yellow' : 'green';
  
  const s = statusConfig[colorKey];

  return (
    <div className="group relative p-5 sm:p-6 bg-white border border-slate-100 rounded-[2rem] hover:shadow-xl hover:shadow-slate-200/50 hover:border-transparent transition-all duration-500 ease-[0.23,1,0.32,1]">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        
        <div className="flex-1 space-y-3 w-full">
          <div className="space-y-1">
            <h4 className="font-black text-slate-900 text-lg leading-tight break-words">
              {card.front}
            </h4>
            <p className="text-slate-500 text-sm font-medium leading-relaxed break-words">
              {card.back}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-xl ${s.bg} ${s.text}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${s.dot} animate-pulse`} />
              <span className="text-[10px] font-black uppercase tracking-wider">{s.label}</span>
            </div>

            <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <Target size={12} strokeWidth={3} />
              <span>{card.repetitions} повторов</span>
            </div>

            {card.next_review && (
              <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded-lg">
                <Calendar size={12} strokeWidth={3} />
                <span>{new Date(card.next_review).toLocaleDateString('ru-RU')}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex sm:flex-col gap-2 w-full sm:w-auto pt-2 sm:pt-0 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <button
            onClick={() => onEdit(card)}
            className="flex-1 sm:flex-none p-3 bg-slate-50 text-slate-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all active:scale-90"
            title="Редактировать"
          >
            <Edit2 size={18} strokeWidth={2.5} />
          </button>
          <button
            onClick={() => onDelete(card.id)}
            className="flex-1 sm:flex-none p-3 bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all active:scale-90"
            title="Удалить"
          >
            <Trash2 size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-12 right-12 h-[2px] bg-slate-50 rounded-full overflow-hidden">
        <div 
          className={`h-full ${s.dot} transition-all duration-1000`} 
          style={{ width: `${Math.min((card.repetitions / 5) * 100, 100)}%` }}
        />
      </div>
    </div>
  );
}