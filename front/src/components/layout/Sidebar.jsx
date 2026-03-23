import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, BarChart3, Calendar, X, Brain, HelpCircle } from 'lucide-react';

const navigation = [
  { name: 'Дашборд', href: '/dashboard', icon: Home },
  { name: 'Мои колоды', href: '/decks', icon: BookOpen },
  { name: 'Расписание', href: '/schedule', icon: Calendar },
  { name: 'Аналитика', href: '/statistics', icon: BarChart3 },
];

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const NavItem = ({ item, isMobile = false }) => {
    const Icon = item.icon;
    const active = isActive(item.href);
    
    return (
      <Link
        to={item.href}
        onClick={isMobile ? onClose : undefined}
        className={`
          flex items-center gap-3 px-4 py-3.5 rounded-2xl text-[15px] font-bold transition-all duration-300 group
          ${active 
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 translate-x-1' 
            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
        `}
      >
        <Icon size={20} className={`${active ? 'text-white' : 'text-slate-400 group-hover:text-blue-500'} transition-colors`} />
        {item.name}
      </Link>
    );
  };

  return (
    <>
      <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-slate-100 h-[calc(100vh-64px)] sticky top-16 p-6 overflow-y-auto">
        <nav className="space-y-2 flex-1">
          {navigation.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}
        </nav>
        
        <div className="mt-auto pt-6 border-t border-slate-50">
          <Link 
            to="/faq" 
            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-400 font-bold hover:text-blue-600 hover:bg-blue-50 transition-all"
          >
            <HelpCircle size={20} />
            Помощь
          </Link>
        </div>
      </aside>

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-2xl transform transition-transform duration-500 ease-out lg:hidden
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Brain className="text-white" size={22} />
            </div>
            <span className="text-2xl font-black text-slate-900 tracking-tighter">Memora</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-50 text-slate-400 hover:text-slate-900"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="p-6 space-y-2">
          {navigation.map((item) => (
            <NavItem key={item.name} item={item} isMobile />
          ))}
        </nav>
      </aside>
    </>
  );
}