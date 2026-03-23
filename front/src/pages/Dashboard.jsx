import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Calendar as CalendarIcon,
  BookOpen,
  TrendingUp,
  Clock,
  PlayCircle,
  BarChart,
  Target,
  Zap,
  ChevronRight,
  Flame,
  ArrowUpRight,
} from "lucide-react";
import api from "@/services/api";
import Button from "@/components/ui/Button";
import Layout from "@/components/layout/Layout";
import Calendar from "@/components/schedule/Calendar";
import StudyPet from "@/components/pet/StudyPet";
import toast from "react-hot-toast";

export default function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [scheduleData, setScheduleData] = useState([]);
  const [decksWithDueCards, setDecksWithDueCards] = useState([]);
  const [currentMonth] = useState(new Date());

  const fetchDashboardData = useCallback(async () => {
    try {
      const [statsResponse, scheduleResponse, decksResponse] = await Promise.all([
        api.get("/study/stats/"),
        api.get("/study/schedule/", {
          params: {
            year: currentMonth.getFullYear(),
            month: currentMonth.getMonth() + 1,
          },
        }),
        api.get("/statistics/decks_progress/"),
      ]);

      setStats(statsResponse.data);
      setScheduleData(scheduleResponse.data.schedule || []);
      setDecksWithDueCards(
        decksResponse.data.filter((deck) => deck.cards_due_today > 0)
      );
    } catch (err) {
      toast.error("Не удалось загрузить данные");
      console.log(err);
    }
  }, [currentMonth]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleStartStudying = (deckId) => {
    navigate(`/study?deck=${deckId}&mode=learning`);
  };

  const statsCards = [
    { label: "На сегодня", value: stats?.cards_due_today || 0, icon: Target, color: "blue" },
    { label: "Всего колод", value: stats?.total_decks || 0, icon: BookOpen, color: "purple" },
    { label: "Изучено", value: stats?.cards_learned || 0, icon: TrendingUp, color: "emerald" },
    { label: "Карточки", value: stats?.total_cards || 0, icon: Zap, color: "orange" },
  ];

  const colorMap = {
    blue: "bg-blue-50 text-blue-600 shadow-blue-100",
    purple: "bg-purple-50 text-purple-600 shadow-purple-100",
    emerald: "bg-emerald-50 text-emerald-600 shadow-emerald-100",
    orange: "bg-orange-50 text-orange-600 shadow-orange-100",
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-10">
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Дашборд</h1>
            <p className="text-slate-500 mt-1">Твой личный прогресс обучения на сегодня</p>
          </div>
          <div className="flex items-center gap-2 text-sm font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-xl">
             <Flame size={18} />
             <span>5 дней ударного режима!</span>
          </div>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm flex flex-col items-center justify-center min-h-[320px]">
            <StudyPet />
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            {statsCards.map((stat) => (
              <div
                key={stat.label}
                className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${colorMap[stat.color]}`}>
                  <stat.icon size={24} />
                </div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
                <h3 className="text-3xl font-black text-slate-900 mt-1">{stat.value}</h3>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2 ml-2">
              <PlayCircle className="text-blue-600" />
              Нужно повторить
            </h2>
            
            {decksWithDueCards.length > 0 ? (
              <div className="space-y-4">
                {decksWithDueCards.map((deck) => (
                  <div
                    key={deck.id}
                    className="group bg-white flex items-center justify-between p-5 rounded-[1.5rem] border border-slate-100 hover:border-blue-200 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${deck.color || "#3B82F6"}15` }}
                      >
                        <BookOpen size={22} style={{ color: deck.color || "#3B82F6" }} />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{deck.name}</h3>
                        <p className="text-sm text-slate-500 font-medium">{deck.cards_due_today} карточек ждет тебя</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleStartStudying(deck.id)}
                      className="rounded-xl bg-blue-600 hover:bg-indigo-600 text-white font-bold px-6 shadow-lg shadow-blue-100 transition-all active:scale-95"
                    >
                      Начать
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 py-12 text-center">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                   <Target className="text-slate-300" size={32} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Всё чисто!</h3>
                <p className="text-slate-500 max-w-xs mx-auto text-sm">Ты повторил все карточки на сегодня. Отдохни или добавь новые!</p>
              </div>
            )}

            <div className="grid grid-cols-3 gap-4">
              {[
                { to: "/decks", label: "Колоды", icon: BookOpen, bg: "bg-blue-50", text: "text-blue-600" },
                { to: "/statistics", label: "Статистика", icon: BarChart, bg: "bg-emerald-50", text: "text-emerald-600" },
                { to: "/schedule", label: "План", icon: CalendarIcon, bg: "bg-purple-50", text: "text-purple-600" },
              ].map((link) => (
                <Link key={link.to} to={link.to} className="group">
                  <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm group-hover:shadow-md transition-all flex flex-col items-center gap-3">
                    <div className={`p-3 rounded-xl ${link.bg} ${link.text} transition-transform group-hover:scale-110`}>
                      <link.icon size={20} />
                    </div>
                    <span className="text-xs font-black text-slate-700 uppercase tracking-tighter">{link.label}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2 ml-2">
              <CalendarIcon className="text-blue-600" size={22} />
              График
            </h2>
            
            <div className="bg-white p-2 rounded-[2rem] border border-slate-100 shadow-sm">
              <Calendar
                data={scheduleData}
                onDayClick={() => navigate("/schedule")}
              />
            </div>

            <div className="bg-slate-900 rounded-[2rem] p-6 text-white shadow-xl relative overflow-hidden">
               <div className="relative z-10">
                 <div className="flex items-center gap-2 mb-4 opacity-80 font-bold text-xs uppercase tracking-widest">
                   <Clock size={14} />
                   Скоро в программе
                 </div>
                 <div className="space-y-4">
                    {scheduleData.slice(0, 2).map((day, i) => (
                      <div key={i} className="flex items-center justify-between border-b border-white/10 pb-3 last:border-0 last:pb-0">
                         <div>
                            <p className="text-sm font-bold">{new Date(day.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}</p>
                            <p className="text-xs text-white/60">{day.count} карточек</p>
                         </div>
                         <ArrowUpRight size={16} className="text-white/40" />
                      </div>
                    ))}
                 </div>
               </div>
               <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-blue-600 rounded-full blur-3xl opacity-20"></div>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}