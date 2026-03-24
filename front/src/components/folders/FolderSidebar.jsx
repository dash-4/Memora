import { Plus, Folder, Layers } from 'lucide-react';
import FolderTree from './FolderTree';

export default function FolderSidebar({
  folders,
  selectedFolderId,
  onFolderSelect,
  expandedFolders,
  onToggleExpand,
  onDeleteFolder, 
}) {
  return (
    <div className="w-72 bg-white/50 backdrop-blur-md h-full overflow-y-auto flex-shrink-0 border-r border-slate-200/60">
      <div className="p-6 sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <button
          onClick={() => onFolderSelect(null)}
          className={`
            w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 text-sm font-bold
            ${selectedFolderId === null
              ? 'bg-white text-black shadow-lg shadow-blue-100 ring-1 ring-slate-100'
              : 'text-slate-600 hover:bg-slate-50'}
          `}
        >
          <Layers className={`w-4 h-4 ${selectedFolderId === null ? 'text-blue-500' : 'text-slate-400'}`} />
          Все колоды
        </button>
      </div>

      <div className="px-4 pb-10">
        <div className="px-2 mb-3 flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Мои папки</span>
          
        </div>

        {folders?.length > 0 ? (
          <div className="space-y-0.5">
            {folders.map(folder => (
              <FolderTree
                key={folder.id}
                folder={folder}
                level={0}
                selectedFolderId={selectedFolderId}
                onSelect={onFolderSelect}
                expandedFolders={expandedFolders}
                onToggleExpand={onToggleExpand}
                onDeleteFolder={onDeleteFolder} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center p-8 bg-slate-50/50 rounded-[2rem] border-2 border-dashed border-slate-100">
             <p className="text-xs font-bold text-slate-400">Папок пока нет</p>
          </div>
        )}
      </div>
    </div>
  );
}