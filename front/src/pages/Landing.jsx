import { Link } from 'react-router-dom';
import { 
  Brain, Target, Zap, BookOpen, CheckCircle, 
  Sparkles, Gamepad2, LineChart, ShieldCheck, 
  ChevronRight, Award 
} from 'lucide-react';
import Button from '@/components/ui/Button';

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#FAFBFF] text-slate-900 selection:bg-blue-100 font-sans">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 z-50">
        <div className="max-w-7xl mx-auto px-6 h-18 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-blue-200 shadow-lg group-hover:scale-105 transition-transform">
              <Brain className="text-white" size={22} />
            </div>
            <span className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
              Memora
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#modes" className="hover:text-blue-600 transition-colors">Режимы</a>
            <a href="#pet" className="hover:text-blue-600 transition-colors">Питомец</a>
            <Link to="/faq" className="hover:text-blue-600 transition-colors">Методика SM-2</Link>
            <div className="h-4 w-px bg-slate-200" />
            <Link to="/login" className="text-slate-900">Войти</Link>
            <Link to="/register">
              <Button className="rounded-full px-6">Создать аккаунт</Button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6">
              <ShieldCheck size={14} /> Powered by SM-2
            </div>
            <h1 className="text-6xl md:text-7xl font-black leading-[1.1] mb-8 tracking-tight text-slate-900">
              Знания, которые <br />
              <span className="text-blue-600">не испаряются.</span>
            </h1>
            <p className="text-xl text-slate-500 mb-10 leading-relaxed max-w-lg">
              Memora превращает хаотичное обучение в систему. Используйте научно доказанные интервалы, чтобы помнить 90% изученного через год.
            </p>
            <Link to="/register">
              <Button size="lg" className="h-16 px-10 rounded-2xl text-lg font-bold shadow-xl shadow-blue-100">
                Начать бесплатно
              </Button>
            </Link>
          </div>
          
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-100 to-indigo-100 rounded-[3rem] blur-2xl opacity-50 transition-opacity" />
            <div className="relative bg-white border border-slate-200 rounded-[2rem] shadow-2xl overflow-hidden p-6">
               <div className="space-y-4">
                 <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
                    <span className="font-bold text-slate-700">Карточек на сегодня</span>
                    <span className="text-blue-600 font-black text-2xl">24</span>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-600 rounded-xl text-white">
                       <Award className="mb-2" size={20} />
                       <div className="text-xs opacity-80 font-medium">Уровень питомца</div>
                       <div className="text-xl font-bold italic">Level 12</div>
                    </div>
                    <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                       <LineChart className="text-indigo-600 mb-2" size={20} />
                       <div className="text-xs text-slate-500 font-medium text-nowrap">Streak</div>
                       <div className="text-xl font-bold text-slate-900 text-nowrap">8 дней</div>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section id="modes" className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black text-slate-900 mb-4">Больше, чем просто карточки</h2>
          <p className="text-slate-500 max-w-2xl mx-auto mb-16">4 уникальных режима обучения для любого стиля подготовки.</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {[
              { icon: Zap, title: "Интервальное SM-2", desc: "Алгоритм сам назначает даты повторений.", color: "bg-orange-50 text-orange-600" },
              { icon: BookOpen, title: "Свободная практика", desc: "Просматривайте колоды без влияния на прогресс.", color: "bg-blue-50 text-blue-600" },
              { icon: Gamepad2, title: "Подбор пар", desc: "Динамичная игра на время: соединяйте вопрос и ответ.", color: "bg-green-50 text-green-600" },
              { icon: Target, title: "Тест-режим", desc: "Проверьте себя в формате экзамена с вариантами.", color: "bg-purple-50 text-purple-600" }
            ].map((mode, i) => (
              <div key={i} className="group p-8 rounded-3xl border border-slate-100 bg-[#FAFBFF] hover:bg-white hover:shadow-xl transition-all">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${mode.color}`}>
                  <mode.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">{mode.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{mode.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pet" className="py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto bg-slate-900 rounded-[3rem] p-8 md:p-16 relative">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-600/20 to-transparent pointer-events-none" />
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20 text-white">
                <Sparkles size={24} />
              </div>
              <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">
                Учитесь — и ваш <span className="text-blue-400">StudyPet</span> растёт
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Завершенные сессии начисляют XP вашему питомцу. Поддерживайте Streak, чтобы множить опыт и открывать уровни.
              </p>
              <div className="space-y-4">
                {['Начисление опыта в реальном времени', 'Визуальный прогресс уровня', 'Мониторинг Streak-статуса'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-white font-medium">
                    <CheckCircle size={18} className="text-blue-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative flex justify-center">
              <div className="w-64 h-64 bg-gradient-to-b from-blue-500 to-indigo-700 rounded-full flex items-center justify-center animate-pulse shadow-[0_0_50px_rgba(59,130,246,0.5)]">
                 <Brain size={80} className="text-white opacity-80" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 text-center px-6">
        <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight text-slate-900">Готовы прокачать свой мозг?</h2>
        <p className="text-slate-500 mb-10 max-w-xl mx-auto">Memora абсолютно бесплатна и не содержит рекламы. Начните обучение прямо сейчас.</p>
        <Link to="/register">
          <Button size="lg" className="h-16 px-12 rounded-2xl text-lg font-extrabold group">
            Создать мой первый набор 
            <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </section>

      <footer className="py-12 px-6 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-slate-500">
          <div className="flex items-center gap-2">
            <Brain className="text-blue-600" size={24} />
            <span className="font-black text-xl tracking-tighter text-slate-900">Memora</span>
          </div>
          <p className="text-sm">© 2026. Все права защищены.</p>
          <div className="flex gap-8 text-sm font-bold uppercase tracking-widest text-[10px]">
             <Link to="/faq" className="hover:text-blue-600 transition-colors">FAQ</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}