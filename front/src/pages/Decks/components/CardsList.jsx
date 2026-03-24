import Card from '../../../components/cards/Card';
import Button from '../../../components/ui/Button';
import { Plus, Search, Inbox, FilterX, Layers } from 'lucide-react';
import CardItem from '../../../components/cards/CardItem'; 
import { CardFilters } from '../../../components/cards/CardFilters';

export default function CardsList({
  cards,
  statsCards,
  filters,
  onFilterChange,
  onCreateCard,
  onEditCard,
  onDeleteCard,
  onResetFilters,
}) {
  const hasFilters = filters.search || filters.status;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 px-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Карточки</h2>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-100 rounded-xl">
              <Layers size={14} className="text-blue-500" />
              <span className="text-blue-700 text-xs font-black uppercase tracking-wider">
                {statsCards.length}
              </span>
            </div>
          </div>
          <p className="text-sm font-medium text-slate-400">Управляйте знаниями в этой колоде</p>
        </div>
        
        <Button 
          onClick={onCreateCard} 
          className="w-full sm:w-auto bg-slate-900 hover:bg-blue-600 text-white rounded-[1.25rem] px-8 py-4 shadow-xl shadow-slate-200 hover:shadow-blue-200 transition-all active:scale-95 group"
        >
          <Plus size={20} className="mr-2 stroke-[3px] group-hover:rotate-90 transition-transform" />
          <span className="font-bold">Добавить карточку</span>
        </Button>
      </div>

      <div className="bg-white border border-slate-50 rounded-[3rem] p-2 sm:p-4 shadow-xl shadow-slate-200/40">
        <div className="p-4 sm:p-6 bg-slate-50/50 rounded-[2.5rem] border border-white">
          <CardFilters
            filters={filters}
            onFilterChange={onFilterChange}
          />
        </div>

        {cards.length > 0 ? (
          <div className="mt-8 px-2 pb-6">
            {cards.length !== statsCards.length && (
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] font-black text-slate-400 mb-6 px-4">
                <Search size={12} strokeWidth={3} />
                Найдено {cards.length} из {statsCards.length}
              </div>
            )}
            
            <div className="grid gap-4">
              {cards.map((card, index) => (
                <div 
                  key={card.id} 
                  className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
                  style={{ animationDelay: `${index * 40}ms` }}
                >
                  <CardItem
                    card={card}
                    onEdit={() => onEditCard(card)}
                    onDelete={() => onDeleteCard(card.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 px-6">
            {hasFilters ? (
              <div className="text-center max-w-sm animate-in zoom-in-95 duration-500">
                <div className="w-24 h-24 bg-gradient-to-br from-amber-50 to-orange-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-inner border border-amber-100/50">
                  <FilterX size={44} strokeWidth={1.5} className="text-amber-500" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3">Ничего не найдено</h3>
                <p className="text-slate-500 text-sm mb-10 font-medium leading-relaxed px-4">
                  Мы просмотрели всю колоду, но совпадений нет. Попробуйте упростить запрос.
                </p>
                <Button 
                  variant="secondary" 
                  onClick={onResetFilters} 
                  className="px-10 py-4 rounded-2xl border-2 border-slate-100 hover:bg-slate-900 hover:text-white transition-all font-bold"
                >
                  Сбросить фильтры
                </Button>
              </div>
            ) : (
              <div className="text-center max-w-sm animate-in zoom-in-95 duration-500">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-inner border border-blue-100/50">
                  <Inbox size={44} strokeWidth={1.5} className="text-blue-500" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3">Колода пуста</h3>
                <p className="text-slate-500 text-sm mb-10 font-medium leading-relaxed px-4">
                  Здесь пока нет знаний. Наполните колоду карточками, чтобы начать обучение!
                </p>
                <Button 
                  onClick={onCreateCard} 
                  className="px-10 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white shadow-2xl shadow-blue-200 transition-all font-bold active:scale-95"
                >
                  Создать первую карточку
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}