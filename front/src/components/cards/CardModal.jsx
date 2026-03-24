import { useState, useEffect } from 'react';
import { X, Plus, Save, Info, Loader2 } from 'lucide-react';
import Button from '../ui/Button';
import toast from 'react-hot-toast';
import api from '../../services/api';

const CardModal = ({ deckId, card, onClose, onSuccess }) => {
  const isEditing = !!card;
  const [formData, setFormData] = useState({ front: '', back: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (card) setFormData({ front: card.front, back: card.back });
  }, [card]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.front.trim() || !formData.back.trim()) {
      toast.error('Заполни все поля, это важно для обучения');
      return;
    }

    setLoading(true);
    try {
      const payload = { front: formData.front.trim(), back: formData.back.trim() };
      if (isEditing) {
        await api.patch(`/cards/${card.id}/`, payload);
      } else {
        await api.post('/cards/', { ...payload, deck: deckId });
      }
      toast.success(isEditing ? 'Обновили! 📝' : 'Готово! Карточка в колоде 🃏');
      onSuccess();
    } catch (error) {
      toast.error('Что-то пошло не так при сохранении');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-[2.5rem] max-w-xl w-full max-h-[90vh] overflow-hidden shadow-[0_32px_64px_-15px_rgba(0,0,0,0.2)] flex flex-col animate-in zoom-in-95 slide-in-from-bottom-4 duration-500">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${isEditing ? 'bg-amber-50 text-amber-500' : 'bg-blue-50 text-blue-500'}`}>
              {isEditing ? <Save size={20} strokeWidth={2.5} /> : <Plus size={20} strokeWidth={2.5} />}
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {isEditing ? 'Редактирование' : 'Новая карточка'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-slate-900 transition-all active:scale-90"
          >
            <X size={24} strokeWidth={2.5} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto custom-scrollbar">
          
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
              Вопрос (Лицо)
            </label>
            <textarea
              value={formData.front}
              onChange={(e) => setFormData({ ...formData, front: e.target.value })}
              className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-50/50 transition-all outline-none resize-none min-h-[120px] font-bold text-slate-700 placeholder:font-medium"
              placeholder="Например: Как в React передать данные компоненту?"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
              Ответ (Оборот)
            </label>
            <textarea
              value={formData.back}
              onChange={(e) => setFormData({ ...formData, back: e.target.value })}
              className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-50/50 transition-all outline-none resize-none min-h-[120px] font-bold text-slate-700 placeholder:font-medium"
              placeholder="Ответ: Через props..."
              required
            />
          </div>

          <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl">
            <Info className="text-blue-500 shrink-0" size={18} />
            <p className="text-xs font-medium text-slate-500 leading-relaxed">
              Короткие и емкие ответы запоминаются на 40% лучше. Старайся не писать длинные тексты.
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="flex-1 h-14 rounded-2xl font-black text-slate-400 border-2 border-slate-100"
              disabled={loading}
            >
              Отмена
            </Button>
            <Button
              type="submit"
              disabled={loading || !formData.front.trim() || !formData.back.trim()}
              className="flex-[2] h-14 rounded-2xl font-black bg-slate-900 text-white shadow-xl shadow-slate-200 active:scale-95 transition-transform"
            >
              {loading ? (
                <Loader2 className="animate-spin mx-auto" size={20} />
              ) : (
                isEditing ? 'Сохранить изменения' : 'Создать карточку'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CardModal;