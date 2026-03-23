import { Plus, Folder, Trash2, Layers } from 'lucide-react';
import FolderTree from './FolderTree';

export default function FolderSidebar({
  folders,
  selectedFolderId,
  onFolderSelect,
  onCreateFolder,
  expandedFolders,
  onToggleExpand,
  onDeleteFolder,
}) {
  return (
    <div className="w-72 bg-white/50 backdrop-blur-md h-full overflow-y-auto scrollbar-hide flex-shrink-0 border-r border-slate-200/60">
      <div className="p-6 sticky top-0 bg-white/80 backdrop-blur-md z-10">
       

        <button
          onClick={() => onFolderSelect(null)}
          className={`
            w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 text-sm font-bold
            ${
              selectedFolderId === null
                ? ' text-black shadow-lg shadow-blue-200'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }
          `}
        >
          <Layers 
            className={`w-4 h-4 ${selectedFolderId === null ? 'text-black' : 'text-slate-400'}`} 
          />
          Все колоды
        </button>
      </div>

      <div className="px-4 pb-10">
        {folders?.length > 0 ? (
          <div className="space-y-0.5">
            <div className="px-2 mb-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Мои папки</span>
            </div>
            {folders.map(folder => (
              <FolderTree
                key={folder.id}
                folder={folder}
                level={0}
                isSelected={selectedFolderId === folder.id}
                onSelect={onFolderSelect}
                expandedFolders={expandedFolders}
                onToggleExpand={onToggleExpand}
                onDeleteFolder={onDeleteFolder}
              />
            ))}
          </div>
        ) : (
          <div className="mt-4 p-8 text-center bg-slate-50/50 rounded-[2rem] border-2 border-dashed border-slate-100">
            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4">
              <Folder className="w-6 h-6 text-slate-300" />
            </div>
            <p className="text-sm font-bold text-slate-400">Папок нет</p>
            <button 
              onClick={onCreateFolder}
              className="mt-4 text-xs font-black uppercase tracking-widest text-blue-600 hover:text-indigo-600 transition-colors"
            >
              Создать +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}