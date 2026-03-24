import { Home, ChevronRight } from 'lucide-react';

export default function FolderBreadcrumbs({ breadcrumbs = [], onNavigate }) {
  if (!breadcrumbs?.length) return null;

  return (
    <nav className="flex items-center gap-1.5 text-xs sm:text-sm mb-6 bg-slate-50/50 p-2 rounded-2xl w-fit border border-slate-100/50">
      <button
        onClick={() => onNavigate(null)}
        className="p-2 hover:bg-white hover:shadow-sm rounded-xl text-slate-400 hover:text-blue-600 transition-all active:scale-90"
      >
        <Home size={16} strokeWidth={2.5} />
      </button>

      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.id} className="flex items-center gap-1.5 animate-in fade-in slide-in-from-left-2">
          <ChevronRight size={14} className="text-slate-300" strokeWidth={3} />
          <button
            onClick={() => onNavigate(crumb.id)}
            className={`
              px-3 py-1.5 rounded-xl transition-all font-black tracking-tight
              ${index === breadcrumbs.length - 1 
                ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-100' 
                : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'}
            `}
          >
            {crumb.name}
          </button>
        </div>
      ))}
    </nav>
  );
}