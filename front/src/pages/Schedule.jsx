import { useState, useEffect, useCallback, useRef } from "react"; 
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  BookOpen,
  Clock,
  CheckCircle,
  Sparkles,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import api from "@/services/api";
import Card from "@/components/cards/Card";
import Button from "@/components/ui/Button";
import Layout from "@/components/layout/Layout";
import toast from "react-hot-toast";

export default function Schedule() {
  const navigate = useNavigate();
  const [scheduleData, setScheduleData] = useState([]);
  const [stats, setStats] = useState(null);
  const [decksWithDueCards, setDecksWithDueCards] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const initialized = useRef(false);

  const fetchSchedule = useCallback(async () => {
    try {
      const [scheduleResponse, decksResponse] = await Promise.all([
        api.get("/study/schedule/", { params: { days: 7 } }),
        api.get("/statistics/decks_progress/"),
      ]);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const schedule = (scheduleResponse.data.schedule || [])
        .filter((day) => {
          const dayDate = new Date(day.date);
          dayDate.setHours(0, 0, 0, 0);
          return dayDate >= today;
        })
        .slice(0, 7);

      setScheduleData(schedule);
      setStats(scheduleResponse.data.stats);
      setDecksWithDueCards(
        (decksResponse.data || []).filter((deck) => deck.cards_due_today > 0)
      );
    } catch (err) {
      if (err.response?.status !== 429) {
        toast.error("Ошибка загрузки расписания");
      }
      console.error("Schedule fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!initialized.current) {
      fetchSchedule();
      initialized.current = true;
    }
  }, [fetchSchedule]);

  const handleStartStudying = (deckId) => {
    navigate(`/study?deck=${deckId}&mode=learning`);
  };

  const getDateLabel = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.getTime() === today.getTime()) return "Сегодня";
    if (date.getTime() === tomorrow.getTime()) return "Завтра";

    return date.toLocaleDateString("ru-RU", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex h-[60vh] items-center justify-center bg-[#FAFBFF]">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-[#FAFBFF] min-h-screen">
        <main className="max-w-5xl mx-auto p-4 md:p-8 lg:p-10 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                Расписание
              </h1>
              <p className="text-slate-500 mt-2 font-medium">
                Ваш план обучения на ближайшую неделю
              </p>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm">
              <TrendingUp size={18} className="text-blue-500" />
              <span className="text-sm font-bold text-slate-700">
                {stats?.today || 0} карточек на сегодня
              </span>
            </div>
          </div>

          {decksWithDueCards.length > 0 && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 md:p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-100">
                        <Sparkles className="text-white" size={28} />
                      </div>
                      <div>
                        <h2 className="text-2xl font-black text-slate-900">Готовы к сессии?</h2>
                        <p className="text-slate-500 font-medium">На сегодня запланированы повторения</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {decksWithDueCards.slice(0, 4).map((deck) => (
                        <div
                          key={deck.id}
                          onClick={() => handleStartStudying(deck.id)}
                          className="group flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-blue-50 transition-colors cursor-pointer border border-transparent hover:border-blue-100"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div
                              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
                              style={{ backgroundColor: deck.color || "#3b82f6" }}
                            >
                              <BookOpen size={18} className="text-white" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-bold text-slate-900 truncate text-sm">{deck.name}</p>
                              
                            </div>
                          </div>
                          <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                        </div>
                      ))}
                    </div>
                </div>
              </div>
            </section>
          )}

          <section className="animate-in fade-in slide-in-from-bottom-6 duration-700 space-y-6">
            <div className="flex items-center gap-2 ml-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">План на неделю</h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {scheduleData.length > 0 ? (
                scheduleData.map((day) => {
                  const label = getDateLabel(day.date);
                  const isToday = label === "Сегодня";
                  const dayDate = new Date(day.date);

                  return (
                    <div
                      key={day.date}
                      className={`group relative bg-white rounded-[2rem] border transition-all duration-300 ${
                        isToday 
                        ? "border-blue-200 shadow-md ring-4 ring-blue-50" 
                        : "border-slate-100 hover:border-slate-200 shadow-sm"
                      }`}
                    >
                      <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6">
                        <div className="flex items-center gap-5 min-w-[180px]">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black shadow-sm ${
                            isToday ? "bg-blue-600 text-white" : "bg-slate-900 text-white"
                          }`}>
                            {dayDate.getDate()}
                          </div>
                          <div>
                            <p className={`text-lg font-black ${isToday ? "text-blue-600" : "text-slate-900"}`}>
                              {label}
                            </p>
                            <p className="text-slate-400 font-bold text-xs uppercase tracking-tighter">
                              {dayDate.toLocaleDateString("ru-RU", { weekday: "long", month: "long" })}
                            </p>
                          </div>
                        </div>

                        <div className="hidden lg:block flex-1 h-2 bg-slate-50 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${isToday ? 'bg-blue-500' : 'bg-slate-200'}`}
                            style={{ width: `${Math.min((day.count / 50) * 100, 100)}%` }}
                          />
                        </div>

                        <div className="flex items-center gap-4 justify-between md:justify-end min-w-[120px]">
                          <div className="text-right">
                            <p className="text-2xl font-black text-slate-900">{day.count}</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase">Карточек</p>
                          </div>
                          <div className={`p-2 rounded-xl ${day.count > 0 ? "bg-blue-50 text-blue-500" : "bg-slate-50 text-slate-200"}`}>
                            {day.count > 0 ? <CheckCircle size={20} /> : <Clock size={20} />}
                          </div>
                        </div>
                      </div>

                      {day.by_deck?.length > 0 && (
                        <div className="px-8 pb-8 flex flex-wrap gap-2">
                          {day.by_deck.map((item) => (
                            <div 
                              key={item.deck_id}
                              className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-100"
                            >
                              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-tight">
                                {item.deck_name} • {item.count}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="bg-slate-50/50 rounded-[3rem] border-2 border-dashed border-slate-200 py-20 text-center">
                   <Calendar size={40} className="mx-auto mb-4 text-slate-200" />
                   <h3 className="text-xl font-bold text-slate-900">График пуст</h3>
                   <Button variant="secondary" className="mt-4" onClick={() => navigate('/decks')}>
                     К колодам
                   </Button>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}