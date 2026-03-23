import { BookOpen, Calendar, PlusCircle, TrendingUp } from "lucide-react";
import Card from "../cards/Card";

export default function DeckStats({ total, dueToday, newCount }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
      <Card className="group relative p-6 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-widest font-bold text-slate-400">Библиотека</p>
            <p className="text-4xl font-black text-slate-900 leading-none">{total}</p>
            <p className="text-sm font-medium text-slate-500">Всего карточек</p>
          </div>
          <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center transition-colors group-hover:bg-slate-900 group-hover:text-white">
            <BookOpen size={24} className="transition-transform group-hover:scale-110" />
          </div>
        </div>
      </Card>

      <Card
        className={`
          group p-6 border rounded-[2rem] transition-all duration-300
          ${dueToday > 0 
            ? "border-blue-100 bg-gradient-to-br from-white to-blue-50/30 shadow-blue-100/20 shadow-lg hover:shadow-blue-200/40" 
            : "border-slate-100 bg-white shadow-sm hover:shadow-xl hover:shadow-slate-200/50"}
        `}
      >
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className={`text-xs uppercase tracking-widest font-bold ${dueToday > 0 ? "text-blue-400" : "text-slate-400"}`}>
              Фокус
            </p>
            <p className={`text-4xl font-black leading-none ${dueToday > 0 ? "text-blue-700" : "text-slate-300"}`}>
              {dueToday}
            </p>
            <p className="text-sm font-medium text-slate-500">На повторение</p>
          </div>
          <div className={`
            w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300
            ${dueToday > 0 ? "bg-blue-600 text-white shadow-lg shadow-blue-200 rotate-3 group-hover:rotate-0" : "bg-slate-50 text-slate-300"}
          `}>
            <Calendar size={24} />
          </div>
        </div>
      </Card>

      <Card
        className={`
          group p-6 border rounded-[2rem] transition-all duration-300
          ${newCount > 0 
            ? "border-emerald-100 bg-gradient-to-br from-white to-emerald-50/30 shadow-emerald-100/20 shadow-lg hover:shadow-emerald-200/40" 
            : "border-slate-100 bg-white shadow-sm hover:shadow-xl hover:shadow-slate-200/50"}
        `}
      >
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className={`text-xs uppercase tracking-widest font-bold ${newCount > 0 ? "text-emerald-400" : "text-slate-400"}`}>
              Прогресс
            </p>
            <p className={`text-4xl font-black leading-none ${newCount > 0 ? "text-emerald-700" : "text-slate-300"}`}>
              {newCount}
            </p>
            <p className="text-sm font-medium text-slate-500">Новых сегодня</p>
          </div>
          <div className={`
            w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300
            ${newCount > 0 ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200 -rotate-3 group-hover:rotate-0" : "bg-slate-50 text-slate-300"}
          `}>
            <PlusCircle size={24} />
          </div>
        </div>
      </Card>
    </div>
  );
}