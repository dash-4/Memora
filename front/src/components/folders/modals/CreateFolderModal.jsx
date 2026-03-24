import { useState, useEffect } from 'react';
import { X, FolderPlus, Palette, AlignLeft, Loader2 } from 'lucide-react'; 
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';
import api from '@/services/api';

export default function CreateFolderModal({ parentId, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#6366f1',
    parent: parentId,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('Введите название папки');
      return;
    }

    setLoading(true);
    try {
      await api.post('/folders/', formData);
      toast.success('Папка создана! 📁');
      onSuccess();
    } catch (err) {
      toast.error('Ошибка создания папки');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleEsc = e => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-[2.5rem] max-w-md w-full p-8 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.15)] animate-in zoom-in-95 duration-500">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
              <FolderPlus size={22} strokeWidth={2.5} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Новая папка</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full text-slate-400 transition-all">
            <X size={24} strokeWidth={2.5} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
              Название папки
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-5 py-3.5 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-50/50 transition-all outline-none font-bold text-slate-700"
              placeholder="Программирование / Языки"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
              <AlignLeft size={12} /> Описание
            </label>
            <textarea
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-5 py-3.5 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-50/50 transition-all outline-none resize-none font-medium text-slate-600"
              rows={2}
              placeholder="О чем эта папка?"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
              <Palette size={12} /> Цвет папки
            </label>
            <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="relative overflow-hidden w-12 h-10 rounded-xl shadow-inner border border-white">
                <input
                  type="color"
                  value={formData.color}
                  onChange={e => setFormData({ ...formData, color: e.target.value })}
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
              {loading ? <Loader2 className="animate-spin mx-auto" /> : 'Создать'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}