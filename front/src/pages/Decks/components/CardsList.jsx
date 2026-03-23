import Card from '../../../components/cards/Card';
import Button from '../../../components/ui/Button';
import { Plus, Search, Inbox, FilterX } from 'lucide-react';
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-2">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Карточки</h2>
          <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full">
            {statsCards.length} всего
          </span>
        </div>
        
        <Button 
          onClick={onCreateCard} 
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white rounded-2xl px-6 py-3 shadow-lg shadow-blue-100 transition-all active:scale-95"
        >
          <Plus size={20} className="mr-2 stroke-[3px]" />
          Добавить карточку
        </Button>
      </div>

      <div className="bg-white border border-slate-100 rounded-[2.5rem] p-4 sm:p-8 shadow-sm">
        <CardFilters
          filters={filters}
          onFilterChange={onFilterChange}
        />

        {cards.length > 0 ? (
          <div className="space-y-4 mt-8">
            {cards.length !== statsCards.length && (
              <div className="flex items-center gap-2 text-sm font-medium text-slate-400 pb-2 px-1">
                <Search size={14} />
                Найдено {cards.length} из {statsCards.length}
              </div>
            )}
            
            <div className="grid gap-3">
              {cards.map((card, index) => (
                <div 
                  key={card.id} 
                  className="animate-in fade-in slide-in-from-bottom-2 duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
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
          <div className="flex flex-col items-center justify-center py-20 px-4">
            {hasFilters ? (
              <div className="text-center max-w-xs animate-in zoom-in duration-300">
                <div className="w-20 h-20 bg-amber-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-amber-500">
                  <FilterX size={40} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Ничего не нашли</h3>
                <p className="text-slate-500 text-sm mb-8 font-medium leading-relaxed">
                  Попробуйте изменить параметры поиска или сбросить фильтры
                </p>
                <Button 
                  variant="secondary" 
                  onClick={onResetFilters} 
                  className="w-full rounded-2xl border-2 border-slate-100 hover:bg-slate-50"
                >
                  Сбросить всё
                </Button>
              </div>
            ) : (
              <div className="text-center max-w-xs animate-in zoom-in duration-300">
                <div className="w-20 h-20 bg-blue-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-blue-500">
                  <Inbox size={40} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Колода пуста</h3>
                <p className="text-slate-500 text-sm mb-8 font-medium leading-relaxed">
                  Самое время добавить первые знания. Начните с создания первой карточки!
                </p>
                <Button 
                  onClick={onCreateCard} 
                  className="w-full rounded-2xl bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-100"
                >
                  Создать карточку
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}