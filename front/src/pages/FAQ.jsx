import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronDown, Brain, Calendar, Target, 
  BookOpen, Zap, Sparkles, ArrowLeft, Search,
  ShieldCheck, LayoutDashboard, Layers
} from 'lucide-react';
import Button from '@/components/ui/Button';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const sections = [
    {
      title: 'Основы Memora',
      icon: BookOpen,
      color: 'text-blue-600 bg-blue-50',
      questions: [
        {
          question: 'Что такое Memora и как это работает?',
          answer: 'Memora — это экосистема для эффективного обучения. Мы используем метод интервальных повторений: вы создаете карточки с вопросами и ответами, а наше приложение (связка React + Django) рассчитывает идеальное время для их повторения, чтобы информация перешла в долговременную память.'
        },
        {
          question: 'Как данные защищены?',
          answer: 'Мы используем современную JWT-авторизацию. Ваши токены (access и refresh) безопасно хранятся в браузере, обеспечивая бесшовный доступ к вашим колодам с любого устройства.'
        }
      ]
    },
    {
      title: 'Алгоритм и Обучение',
      icon: Brain,
      color: 'text-purple-600 bg-purple-50',
      questions: [
        {
          question: 'Что такое алгоритм SM-2?',
          answer: 'Это классический научный алгоритм SuperMemo-2. На основе ваших оценок (от "Забыл" до "Легко") система вычисляет коэффициент сложности и интервал. Чем увереннее ответ, тем позже вы увидите карточку в следующий раз.'
        },
        {
          question: 'Какие режимы обучения доступны?',
          answer: 'В Memora есть 4 режима:\n1. Обучение — основной режим по SM-2.\n2. Тренировка — свободный просмотр без влияния на статистику.\n3. Подбор пар — игровой формат на время.\n4. Тест — проверка знаний с вариантами ответов.'
        }
      ]
    },
    {
      title: 'Личный прогресс',
      icon: LayoutDashboard,
      color: 'text-emerald-600 bg-emerald-50',
      questions: [
        {
          question: 'Где следить за статистикой?',
          answer: 'В разделе "Статистика" и на Дашборде. Мы визуализируем вашу активность по дням, прогресс по каждой колоде и общее количество выученных карточек через графики, построенные на данных нашего API.'
        },
        {
          question: 'Как работает расписание?',
          answer: 'Раздел "Расписание" — это ваш интерактивный календарь. Он обращается к эндпоинту /api/study/schedule/, чтобы показать вам нагрузку на ближайшие дни, помогая планировать время на учебу.'
        }
      ]
    },
    {
      title: 'Геймификация и Питомец',
      icon: Target,
      color: 'text-orange-600 bg-orange-50',
      questions: [
        {
          question: 'Зачем нужен StudyPet?',
          answer: 'Учебный питомец — ваш спутник в обучении. За каждую завершенную сессию на бэкенде начисляется XP. Питомец растет в уровнях, отражая вашу дисциплину и "streak" (серию дней без пропусков).'
        }
      ]
    }
  ];

  const filteredSections = searchQuery.trim()
    ? sections.map(s => ({
        ...s,
        questions: s.questions.filter(q => 
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(s => s.questions.length > 0)
    : sections;

  return (
    <div className="min-h-screen bg-[#FAFBFF] text-slate-900 selection:bg-blue-100 pb-20 font-sans">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 z-50 h-16 flex items-center">
        <div className="max-w-5xl mx-auto w-full px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group text-slate-600 hover:text-blue-600 transition-colors font-semibold text-sm">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Назад
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Brain className="text-white" size={18} />
            </div>
            <span className="font-black tracking-tighter text-xl">Memora</span>
          </div>
        </div>
      </nav>

      <header className="pt-32 pb-12 px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold uppercase tracking-wider mb-8">
          <Sparkles size={14} className="animate-pulse" /> База знаний проекта
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-slate-900">
          Как устроена Memora?
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto mb-10 text-lg">
          Узнайте больше о научной базе, архитектуре приложения и том, как мы помогаем вам учиться быстрее.
        </p>
        
        <div className="max-w-xl mx-auto relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={22} />
          <input
            type="text"
            placeholder="Найти ответ (алгоритм, питомец, сессии...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-6 py-4.5 bg-white border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-100/50 focus:border-blue-400 transition-all text-slate-600 placeholder:text-slate-400"
          />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 space-y-14">
        {filteredSections.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-100">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-slate-300" size={32} />
            </div>
            <p className="text-slate-400 font-semibold">По вашему запросу ничего не найдено</p>
            <button onClick={() => setSearchQuery('')} className="mt-2 text-blue-600 font-bold hover:underline">Сбросить поиск</button>
          </div>
        ) : (
          filteredSections.map((section, sIndex) => (
            <div key={sIndex} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${section.color}`}>
                  <section.icon size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-slate-800">{section.title}</h2>
                  <div className="h-1 w-8 bg-blue-100 rounded-full mt-1" />
                </div>
              </div>

              <div className="space-y-4">
                {section.questions.map((item, qIndex) => {
                  const id = `${sIndex}-${qIndex}`;
                  const isOpen = openIndex === id;

                  return (
                    <div 
                      key={qIndex}
                      className={`group bg-white rounded-3xl border transition-all duration-500 overflow-hidden ${
                        isOpen 
                        ? 'border-blue-200 shadow-2xl shadow-blue-100/30 ring-1 ring-blue-50' 
                        : 'border-slate-100 hover:border-slate-200 hover:shadow-md'
                      }`}
                    >
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : id)}
                        className="w-full flex items-center justify-between p-6 text-left"
                      >
                        <span className={`text-lg font-bold transition-colors duration-300 ${isOpen ? 'text-blue-600' : 'text-slate-700'}`}>
                          {item.question}
                        </span>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-blue-600 text-white rotate-180' : 'bg-slate-50 text-slate-400'}`}>
                          <ChevronDown size={18} />
                        </div>
                      </button>
                      <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="px-6 pb-8 text-slate-500 leading-relaxed">
                          <div className="pt-4 border-t border-slate-50 whitespace-pre-line">
                            {item.answer}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}

        <div className="mt-32 p-10 md:p-16 bg-slate-950 rounded-[3rem] text-center relative overflow-hidden shadow-2xl shadow-blue-900/20">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-600/20 blur-[100px] rounded-full" />
          
          <h3 className="text-3xl md:text-4xl font-black text-white mb-6">Готовы к новому уровню?</h3>
          <p className="text-slate-400 mb-10 max-w-md mx-auto text-lg">Присоединяйтесь к тысячам студентов, которые уже доверили свою память Memora.</p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
             <Link to="/">
               <Button variant="secondary" className="w-full sm:w-auto rounded-2xl px-10 h-14 font-bold border-white/10 hover:bg-white/5">
                 На главную
               </Button>
             </Link>
             <Link to="/register">
               <Button className="w-full sm:w-auto rounded-2xl px-10 h-14 font-bold bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/20 transition-all active:scale-95">
                 Начать обучение
               </Button>
             </Link>
          </div>
        </div>
      </main>
    </div>
  );
}