import { Folder, MoreVertical } from 'lucide-react';

export default function FolderCard({ folder, onClick }) {
  const folderColor = folder.color || '#6366f1';

  return (
    <div
      onClick={() => onClick(folder.id)}
      className="group relative bg-white rounded-[2rem] p-6 border border-slate-100 hover:border-transparent hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 cursor-pointer overflow-hidden"
    >
      <div 
        className="absolute -right-4 -top-4 w-24 h-24 blur-3xl opacity-10 transition-opacity group-hover:opacity-20"
        style={{ backgroundColor: folderColor }}
      />

      <div className="flex flex-col gap-4 relative z-10">
        <div 
          className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner"
          style={{ backgroundColor: `${folderColor}15`, color: folderColor }}
        >
          <Folder size={24} fill="currentColor" fillOpacity={0.2} strokeWidth={2.5} />
        </div>
        
        <div>
          <h3 className="font-black text-slate-900 text-lg leading-tight mb-1 truncate">
            {folder.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              {folder.decks_count || 0} {folder.decks_count === 1 ? 'Колода' : 'Колоды'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}