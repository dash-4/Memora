import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  TrendingUp,
  Award,
  Target,
  Calendar,
  CheckCircle,
  Clock,
  Zap,
  BarChart3,
  ChevronRight,
  Flame,
} from "lucide-react";
import api from "@/services/api";
import Card from "@/components/cards/Card";
import Button from "@/components/ui/Button";
import Layout from "@/components/layout/Layout";
import toast from "react-hot-toast";

export default function Statistics() {
  const [stats, setStats] = useState(null);
  const [decksStats, setDecksStats] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStatistics = useCallback(async () => {
    try {
      const [statsResponse, decksResponse] = await Promise.all([
        api.get("/statistics/dashboard/"),
        api.get("/statistics/decks_progress/"),
      ]);

      setStats(statsResponse.data);
      setDecksStats(decksResponse.data);
    } catch (err) {
      toast.error("Ошибка загрузки статистики");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatistics();
  }, [fetchStatistics]);

  const getMasteryLevel = (deck) => {
    const p = deck.mastery_percent;
    if (p >= 80) return { label: "Мастер", color: "bg-emerald-500", text: "text-emerald-700", bg: "bg-emerald-50" };
    if (p >= 60) return { label: "Знаток", color: "bg-blue-500", text: "text-blue-700", bg: "bg-blue-50" };
    if (p >= 40) return { label: "Ученик", color: "bg-amber-500", text: "text-amber-700", bg: "bg-amber-50" };
    return { label: "Новичок", color: "bg-slate-400", text: "text-slate-600", bg: "bg-slate-50" };
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600" />
        </div>
      </Layout>
    );
  }

  const avgCardsPerDay = stats?.study?.sessions_this_week > 0
    ? Math.round((stats?.study?.cards_studied_this_week || 0) / 7)
    : 0;

  return (
    <Layout>
      <div className="bg-[#FAFBFF] ">
        <main className="  p-4 md:p-8 space-y-8">
          
          <div className="flex items-center gap-4">
            
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Твой Прогресс</h1>
              <p className="text-slate-500 font-medium text-sm">Аналитика обучения и личные рекорды</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Изучено", val: stats?.cards_learned, unit: "карточек", icon: BookOpen, color: "blue" },
              { label: "Ударный режим", val: stats?.progress?.current_streak, unit: "дней", icon: Flame, color: "orange", highlight: true },
              { label: "Рекорд", val: stats?.progress?.longest_streak, unit: "дней", icon: Award, color: "emerald" },
              { label: "Уровень", val: stats?.progress?.level, unit: `${stats?.progress?.points || 0} XP`, icon: TrendingUp, color: "purple" }
            ].map((s, i) => (
              <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl bg-${s.color}-50 text-${s.color}-600`}>
                    <s.icon size={22} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{s.label}</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className={`text-3xl font-black ${s.highlight ? 'text-orange-500' : 'text-slate-900'}`}>
                    {s.val || 0}
                  </span>
                  <span className="text-xs font-bold text-slate-400 uppercase">{s.unit}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl overflow-hidden relative">
            <div className="relative z-10">
              <h2 className="text-xl font-black mb-6 flex items-center gap-2">
                <Zap className="text-yellow-400" fill="currentColor" size={20} />
                Активность за неделю
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                  <p className="text-white/60 text-xs font-bold uppercase mb-1">Всего сессий</p>
                  <p className="text-3xl font-black">{stats?.study?.sessions_this_week || 0}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                  <p className="text-white/60 text-xs font-bold uppercase mb-1">Карточек пройдено</p>
                  <p className="text-3xl font-black">{stats?.study?.cards_studied_this_week || 0}</p>
                </div>
                <div className="bg-blue-500 rounded-2xl p-6 shadow-lg shadow-blue-500/20">
                  <p className="text-white/80 text-xs font-bold uppercase mb-1">Среднее в день</p>
                  <p className="text-3xl font-black">{avgCardsPerDay}</p>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Прогресс по колодам</h2>
              <span className="text-xs font-bold text-slate-400 uppercase">Освоение материала</span>
            </div>

            {decksStats.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {decksStats.map((deck) => {
                  const level = getMasteryLevel(deck);
                  return (
                    <div key={deck.id} className="bg-white rounded-[2rem] border border-slate-100 p-6 hover:shadow-lg hover:shadow-slate-200/50 transition-all group">
                      <div className="flex flex-col md:flex-row md:items-center gap-6">
                        {/* Deck Icon & Name */}
                        <div className="flex items-center gap-4 min-w-[240px]">
                          <div 
                            className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner"
                            style={{ backgroundColor: deck.color || "#6366f1" }}
                          >
                            <BookOpen size={24} className="text-white" />
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-black text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                              {deck.name}
                            </h3>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                              {deck.mastered_cards} / {deck.total_cards} изучено
                            </p>
                          </div>
                        </div>

                        <div className="flex-1 space-y-2">
                          <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter text-slate-400 px-1">
                            <span>Прогресс</span>
                            <span>{deck.mastery_percent}%</span>
                          </div>
                          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-1000 ${level.color}`}
                              style={{ width: `${deck.mastery_percent}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-4 justify-between md:justify-end min-w-[180px]">
                          <div className={`px-4 py-2 rounded-xl ${level.bg} ${level.text} text-xs font-black uppercase tracking-widest`}>
                            {level.label}
                          </div>
                          <Link to={`/decks/${deck.id}`}>
                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-all">
                              <ChevronRight size={20} />
                            </div>
                          </Link>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-slate-50 flex flex-wrap gap-6">
                         {[
                           { icon: CheckCircle, val: deck.mastered_cards, color: "text-emerald-500", label: "Освоено" },
                           { icon: Clock, val: deck.learning_cards, color: "text-blue-500", label: "В изучении" },
                           { icon: Calendar, val: deck.cards_due_today, color: "text-orange-500", label: "К повтору" }
                         ].map((item, idx) => (
                           <div key={idx} className="flex items-center gap-2">
                             <item.icon size={14} className={item.color} />
                             <span className="text-xs font-black text-slate-700">{item.val || 0}</span>
                             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{item.label}</span>
                           </div>
                         ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-[3rem] border-2 border-dashed border-slate-200 py-16 text-center">
                <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                  <Target size={32} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Пока нет данных</h3>
                <p className="text-slate-500 text-sm mb-6">Начни учить любую колоду, чтобы увидеть статистику</p>
                <Link to="/decks">
                  <Button className="rounded-2xl px-8">Перейти к колодам</Button>
                </Link>
              </div>
            )}
          </div>
        </main>
      </div>
    </Layout>
  );
}