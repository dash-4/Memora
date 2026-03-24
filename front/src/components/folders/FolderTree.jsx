import { ChevronDown, ChevronRight, Folder, FolderOpen, Trash2, MoreVertical } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function FolderTree({
  folder,
  level = 0,
  selectedFolderId,
  onSelect,
  expandedFolders,
  onToggleExpand,
  onDeleteFolder, 
}) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const menuRef = useRef(null);
  
  const isExpanded = expandedFolders.has(folder.id);
  const hasChildren = folder.subfolders?.length > 0;
  const isSelected = selectedFolderId === folder.id;
  const color = folder.color || '#6366f1';

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMobileMenu(false);
      }
    };
    if (showMobileMenu) {
      document.addEventListener('touchstart', handleClickOutside); 
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMobileMenu]);

  return (
    <div className="select-none">
      <div
        className={`
          group flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer
          transition-all duration-300 mb-1 relative
          ${isSelected 
            ? 'bg-white shadow-md text-slate-900 ring-1 ring-slate-100' 
            : 'text-slate-500 active:bg-slate-100'} 
        `}
        style={{ marginLeft: `${level * 12}px` }}
        onClick={() => onSelect(folder.id)}
      >
        <div className="w-6 h-6 flex items-center justify-center -ml-1">
          {hasChildren && (
            <button
              onClick={e => {
                e.stopPropagation();
                onToggleExpand(folder.id);
              }}
              className="p-1.5 hover:bg-slate-200/50 rounded-lg text-slate-400"
            >
              {isExpanded ? <ChevronDown size={16} strokeWidth={3} /> : <ChevronRight size={16} strokeWidth={3} />}
            </button>
          )}
        </div>

        <div className={isExpanded ? 'scale-110 transition-transform' : ''}>
           {isExpanded ? (
            <FolderOpen size={18} strokeWidth={2.5} style={{ color }} />
          ) : (
            <Folder size={18} strokeWidth={2.5} style={{ color }} />
          )}
        </div>

        <span className={`flex-1 text-sm truncate ${isSelected ? 'font-black' : 'font-bold'}`}>
          {folder.name}
        </span>

        <div className="relative" ref={menuRef}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMobileMenu(!showMobileMenu);
            }}
            className="p-2 -mr-2 text-slate-300 active:text-slate-900 active:bg-slate-100 rounded-xl transition-all"
          >
            <MoreVertical size={18} strokeWidth={2.5} />
          </button>

          {showMobileMenu && (
            <div className="absolute right-0 top-10 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 z-[100] py-2 animate-in zoom-in-95 fade-in duration-200">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMobileMenu(false);
                  if (typeof onDeleteFolder === 'function') {
                    onDeleteFolder(folder.id);
                  } else {
                    console.error("Ошибка: onDeleteFolder не передан для папки", folder.name);
                  }
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 active:bg-red-50 transition-colors"
              >
                <div className="p-1.5 bg-red-50 rounded-lg text-red-500">
                  <Trash2 size={16} />
                </div>
                Удалить папку
              </button>
            </div>
          )}
        </div>
      </div>

      {isExpanded && hasChildren && (
        <div className="relative border-l-2 border-slate-100/50 ml-6">
          {folder.subfolders.map(sub => (
            <FolderTree
              key={sub.id}
              folder={sub}
              level={0} 
              selectedFolderId={selectedFolderId}
              onSelect={onSelect}
              expandedFolders={expandedFolders}
              onToggleExpand={onToggleExpand}
              onDeleteFolder={onDeleteFolder} 
            />
          ))}
        </div>
      )}
    </div>
  );
}