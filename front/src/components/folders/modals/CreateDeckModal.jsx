import { useState, useEffect } from 'react';
import { X, Layout, AlignLeft, Palette, Loader2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';
import api from '@/services/api';

export default function CreateDeckModal({ folderId, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#3B82F6',
    folder: folderId || null, 
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('Введите название колоды');
      return;
    }

    setLoading(true);
    try {
      await api.post('/decks/', formData);
      toast.success('Колода создана! 🎉');
      onSuccess();
    } catch (error) {
      toast.error('Не удалось создать колоду');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleEscape = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-[2.5rem] max-w-md w-full p-8 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.15)] animate-in zoom-in-95 duration-500">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <Layout size={22} strokeWidth={2.5} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Новая колода</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full text-slate-400 transition-all">
            <X size={24} strokeWidth={2.5} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
              Название колоды
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-5 py-3.5 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-50/50 transition-all outline-none font-bold text-slate-700"
              placeholder="Например: JavaScript Advanced"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
              <AlignLeft size={12} /> Описание
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-5 py-3.5 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-50/50 transition-all outline-none resize-none font-medium text-slate-600"
              rows={3}
              placeholder="О чем эта колода?"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
              <Palette size={12} /> Акцентный цвет
            </label>
            <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="relative group overflow-hidden w-12 h-10 rounded-xl shadow-inner border border-white">
                <input
                  type="color"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="absolute inset-0 w-full h-full scale-150 cursor-pointer"
                />
              </div>
              <span className="text-sm font-black text-slate-500 font-mono tracking-wider">
                {formData.color.toUpperCase()}
              </span>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={onClose} className="flex-1 h-14 rounded-2xl font-black text-slate-400 border-2 border-slate-100" disabled={loading}>
              Отмена
            </Button>
            <Button type="submit" disabled={loading || !formData.name.trim()} className="flex-[1.5] h-14 rounded-2xl font-black bg-slate-900 text-white shadow-lg active:scale-95 transition-transform">
              {loading ? <Loader2 className="animate-spin mx-auto" /> : 'Создать колоду'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}