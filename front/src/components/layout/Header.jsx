import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Brain, Menu, Bell } from 'lucide-react';
import { authService } from '@/services/auth';
import { useState } from 'react';

export default function Header({ onMenuClick }) {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState('');

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate('/login', { replace: true });
    } catch (err) {
      setError('ошибка выхода');
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-30 h-16 flex items-center">
      <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              <Menu size={24} />
            </button>

            <Link to="/dashboard" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform duration-300">
                <Brain className="text-white" size={22} />
              </div>
              <span className="text-xl font-black text-slate-900 tracking-tighter hidden sm:block">
                Memora
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            

            <div className="h-6 w-[1px] bg-slate-100 mx-1 hidden sm:block"></div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all active:scale-95"
              title="Выйти из аккаунта"
            >
              <LogOut size={18} className="opacity-70" />
              <span className="hidden sm:inline">Выход</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}