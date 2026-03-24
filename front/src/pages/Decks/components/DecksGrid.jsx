import DeckCard from '../../../components/decks/DeckCard';
import Card from '../../../components/cards/Card';
import { Search, BookOpen, Plus } from 'lucide-react';
import Button from '../../../components/ui/Button';

export default function DecksGrid({ items, type = 'decks', emptyMessage = 'Нет колод', onCreate }) {
  if (items.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center py-24 px-6 bg-white border-none rounded-[3rem] shadow-xl shadow-slate-200/50 animate-in zoom-in-95 duration-500">
        {type === 'search' ? (
          <div className="text-center max-w-sm">
            <div className="w-24 h-24 bg-gradient-to-br from-slate-50 to-slate-100 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-inner border border-slate-200/20">
              <Search size={40} strokeWidth={1.5} className="text-slate-400" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">Ничего не найдено</h3>
            <p className="text-slate-500 font-medium mb-8 leading-relaxed">
              Мы прочесали все архивы, но подходящих {type === 'decks' ? 'колод' : 'папок'} не нашлось.
            </p>
          </div>
        ) : (
          <div className="text-center max-w-sm">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-inner border border-blue-100/50">
              <BookOpen size={40} strokeWidth={1.5} className="text-blue-500" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">{emptyMessage}</h3>
            <p className="text-slate-500 font-medium mb-10 leading-relaxed">
              Ваша библиотека пока пуста. Начните свое путешествие, создав первую {type === 'decks' ? 'колоду' : 'папку'}.
            </p>
            {onCreate && (
              <Button 
                onClick={onCreate}
                className="group px-10 py-4 bg-slate-900 hover:bg-blue-600 text-white rounded-2xl shadow-2xl shadow-slate-200 hover:shadow-blue-200 transition-all font-bold active:scale-95"
              >
                <Plus size={20} className="mr-2 stroke-[3px] group-hover:rotate-90 transition-transform" />
                Создать {type === 'decks' ? 'колоду' : 'папку'}
              </Button>
            )}
          </div>
        )}
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 animate-in fade-in duration-700">
      {items.map((item, index) => (
        <div 
          key={item.id} 
          className="animate-in fade-in slide-in-from-bottom-6 duration-500 fill-mode-both"
          style={{ animationDelay: `${index * 60}ms` }}
        >
          <DeckCard deck={item} />
        </div>
      ))}
    </div>
  );
}