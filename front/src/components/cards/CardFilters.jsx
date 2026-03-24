import { Search, X, Filter, Layers, RotateCcw } from "lucide-react";

export const CardFilters = ({ 
  filters, 
  onFilterChange, 
  showDeckFilter = false,
  decks = []
}) => {
  const hasActiveFilters = filters.search || filters.status || filters.deck_id;

  const resetFilters = () => {
    onFilterChange('search', '');
    onFilterChange('status', '');
    if (showDeckFilter) {
      onFilterChange('deck_id', '');
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap gap-4 items-end">
        
        <div className="flex-1 min-w-[280px]">
          <div className="relative group">
            <Search 
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" 
              size={18} 
            />
            <input
              type="text"
              placeholder="Поиск по карточкам..."
              value={filters.search}
              onChange={(e) => onFilterChange('search', e.target.value)}
              className="w-full pl-11 pr-11 py-3 bg-slate-50 border border-slate-100 rounded-[1.25rem] text-sm font-medium focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-50/50 transition-all outline-none placeholder:text-slate-400"
            />
            {filters.search && (
              <button
                type="button"
                onClick={() => onFilterChange('search', '')}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center bg-slate-200/50 hover:bg-slate-200 rounded-xl text-slate-600 transition-all active:scale-90"
              >
                <X size={14} strokeWidth={3} />
              </button>
            )}
          </div>
        </div>

        {showDeckFilter && decks.length > 0 && (
          <div className="min-w-[200px] flex-1 sm:flex-none">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">
              <Layers size={12} /> Колода
            </label>
            <div className="relative">
              <select
                value={filters.deck_id || ''}
                onChange={(e) => onFilterChange('deck_id', e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-[1.25rem] text-sm font-bold text-slate-700 appearance-none focus:bg-white focus:ring-4 focus:ring-blue-50/50 transition-all outline-none cursor-pointer"
              >
                <option value="">Все колоды</option>
                {decks.map(deck => (
                  <option key={deck.id} value={deck.id}>{deck.name}</option>
                ))}
              </select>
              <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={14} />
            </div>
          </div>
        )}

        <div className="min-w-[180px] flex-1 sm:flex-none">
          <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Статус
          </label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-[1.25rem] text-sm font-bold text-slate-700 appearance-none focus:bg-white focus:ring-4 focus:ring-blue-50/50 transition-all outline-none cursor-pointer"
          >
            <option value="">Все статусы</option>
            <option value="new">Новые</option>
            <option value="learning">Изучаются</option>
            <option value="mastered">Выучены</option>
          </select>
        </div>

        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="flex items-center justify-center gap-2 h-[46px] px-5 bg-white border-2 border-slate-100 hover:border-red-100 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-[1.25rem] text-sm font-black transition-all active:scale-95"
          >
            <RotateCcw size={16} strokeWidth={3} />
            <span className="hidden sm:inline">Сбросить</span>
          </button>
        )}
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 items-center pt-4 border-t border-slate-50 animate-in fade-in slide-in-from-top-2 duration-500">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 mr-2">Активно:</span>
          
          {filters.search && (
            <Tag label={`Поиск: ${filters.search}`} onRemove={() => onFilterChange('search', '')} />
          )}
          
          {filters.status && (
            <Tag 
              label={filters.status === 'new' ? 'Новые' : filters.status === 'learning' ? 'Изучаются' : 'Выучены'} 
              onRemove={() => onFilterChange('status', '')} 
            />
          )}
        </div>
      )}
    </div>
  );
};

