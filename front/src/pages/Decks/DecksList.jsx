import { useState, useEffect, useCallback } from "react";
import { Plus, Menu, X, FolderPlus, Layers } from "lucide-react";
import api from "@/services/api";
import Layout from "@/components/layout/Layout";
import Button from "@/components/ui/Button";
import DeckCard from "@/components/decks/DeckCard";
import FolderSidebar from "@/components/folders/FolderSidebar";
import FolderCard from "@/components/folders/FolderCard";
import FolderBreadcrumbs from "@/components/folders/FolderBreadcrumbs";
import SearchBar from "./components/SearchBar";
import CreateFolderModal from "@/components/folders/modals/CreateFolderModal";
import CreateDeckModal from "@/components/folders/modals/CreateDeckModal";
import toast from "react-hot-toast";

export default function DecksList() {
  const [decks, setDecks] = useState([]);
  const [filteredDecks, setFilteredDecks] = useState([]);
  const [folders, setFolders] = useState([]);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [currentFolder, setCurrentFolder] = useState(null);
  const [subfolders, setSubfolders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  const [showCreateDeckModal, setShowCreateDeckModal] = useState(false);
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState(new Set());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleDeleteFolder = async (id) => {
    if (!window.confirm("Вы уверены? Папка и все её содержимое будут удалены.")) return;

    try {
      await api.delete(`/folders/${id}/`);
      toast.success("Папка успешно удалена");
      
      await fetchFoldersTree();

      if (selectedFolderId === id) {
        setSelectedFolderId(null);
      } else if (selectedFolderId) {
        fetchFolderContents(selectedFolderId);
      } else {
        fetchAllDecks();
      }
    } catch (err) {
      console.error("Ошибка при удалении:", err);
      toast.error("Не удалось удалить папку");
    }
  };

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(t);
  }, [searchQuery]);

  const fetchFoldersTree = useCallback(async () => {
    try {
      const { data } = await api.get("/folders/tree/");
      setFolders(data);
    } catch (err) {
      toast.error("Ошибка загрузки папок");
    }
  }, []);

  const fetchAllDecks = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/decks/");
      setDecks(data.results || data);
      setCurrentFolder(null);
      setSubfolders([]);
    } catch (err) {
      toast.error("Ошибка загрузки колод");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchFolderContents = useCallback(async (id) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/folders/${id}/contents/`);
      setCurrentFolder(data.folder);
      setSubfolders(data.subfolders || []);
      setDecks(data.decks || []);
    } catch (err) {
      toast.error("Ошибка содержимого папки");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFoldersTree();
  }, [fetchFoldersTree]);

  useEffect(() => {
    if (selectedFolderId) fetchFolderContents(selectedFolderId);
    else fetchAllDecks();
  }, [selectedFolderId, fetchFolderContents, fetchAllDecks]);

  useEffect(() => {
    let result = [...decks];
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(d => 
        d.name.toLowerCase().includes(q) || 
        d.description?.toLowerCase().includes(q)
      );
    }
    setFilteredDecks(result);
  }, [decks, debouncedSearch, sortBy]);

  const handleFolderSelect = (id) => {
    setSelectedFolderId(id);
    setIsSidebarOpen(false);
  };

  const toggleFolderExpand = (id) => {
    setExpandedFolders(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex h-screen items-center justify-center bg-[#FAFBFF]">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex bg-[#FAFBFF]">
        
        <aside className="hidden lg:block w-72 flex-shrink-0 border-r border-slate-200/60 bg-white/50 backdrop-blur-md">
          <div className="h-full">
            <FolderSidebar
              folders={folders}
              selectedFolderId={selectedFolderId}
              onFolderSelect={handleFolderSelect}
              expandedFolders={expandedFolders}
              onToggleExpand={toggleFolderExpand}
              onCreateFolder={() => setShowCreateFolderModal(true)}
              onDeleteFolder={handleDeleteFolder} 
            />
          </div>
        </aside>

        <main className="flex-1 relative">
          <div className="max-w-6xl mx-auto p-4 md:p-8 lg:p-10 space-y-6 md:space-y-8">
            
            <div className="flex items-center justify-between">
              <div className="overflow-x-auto scrollbar-hide whitespace-nowrap mr-4">
                <FolderBreadcrumbs
                  breadcrumbs={currentFolder?.breadcrumbs || []}
                  onNavigate={handleFolderSelect}
                />
              </div>
              <button
                className="lg:hidden p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 shadow-sm active:scale-95 transition-transform"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu size={22} />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div className="space-y-1">
                <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                  {currentFolder ? currentFolder.name : "Библиотека"}
                </h1>
                {currentFolder?.description && (
                  <p className="text-slate-500 font-medium max-w-xl">{currentFolder.description}</p>
                )}
              </div>

              <div className="flex items-center gap-2 md:gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowCreateFolderModal(true)}
                  className="flex-1 sm:flex-none rounded-2xl border-slate-200 font-bold py-6 sm:py-2"
                >
                  <FolderPlus size={18} className="sm:mr-2" />
                  <span className="hidden sm:inline">Папка</span>
                </Button>
                <Button
                  onClick={() => setShowCreateDeckModal(true)}
                  className="flex-[2] sm:flex-none rounded-2xl font-bold px-4 md:px-4 py-2 sm:py-2 shadow-lg shadow-blue-100"
                >
                  <Plus size={20} className="sm:mr-2" />
                  Новая колода
                </Button>
              </div>
            </div>

            <div>
              <SearchBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                sortBy={sortBy}
                onSortChange={setSortBy}
                onClear={() => setSearchQuery("")}
              />
            </div>

            {subfolders.length > 0 && (
              <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-2 mb-4 px-1">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">Папки</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                  {subfolders.map((folder) => (
                    <FolderCard
                      key={folder.id}
                      folder={folder}
                      onClick={handleFolderSelect}
                      onDelete={handleDeleteFolder}
                    />
                  ))}
                </div>
              </section>
            )}

            <section className="animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
              <div className="flex items-center gap-2 mb-6 px-1">
                <div className="w-2 h-2 rounded-full bg-indigo-500" />
                <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Колоды {filteredDecks.length > 0 && `(${filteredDecks.length})`}
                </h2>
              </div>

              {filteredDecks.length > 0 ? (
                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-5">
                  {filteredDecks.map((deck) => (
                    <DeckCard key={deck.id} deck={deck} />
                  ))}
                </div>
              ) : (
                <div className="bg-slate-50/50 rounded-[2.5rem] border-2 border-dashed border-slate-200 py-16 md:py-24 text-center px-4">
                  <div className="bg-white w-16 h-16 md:w-20 md:h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm text-slate-200">
                    <Layers size={32} />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-900">Пусто</h3>
                  <p className="text-slate-500 text-sm md:text-base max-w-xs mx-auto mt-2 mb-8">
                    {searchQuery ? "По вашему запросу ничего не нашлось" : "Начните с создания первой колоды"}
                  </p>
                  {searchQuery && (
                    <Button variant="outline" onClick={() => setSearchQuery("")} className="rounded-xl">
                      Сбросить фильтры
                    </Button>
                  )}
                </div>
              )}
            </section>
          </div>
        </main>
      </div>

      {isSidebarOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setIsSidebarOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[85%] max-w-sm bg-white shadow-2xl animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between p-6 border-b border-slate-50">
              <h2 className="text-xl font-black text-slate-900">Навигация</h2>
              <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-slate-400"><X size={24}/></button>
            </div>
            <div className="h-[calc(100%-80px)] overflow-y-auto scrollbar-hide">
              <FolderSidebar
                folders={folders}
                selectedFolderId={selectedFolderId}
                onFolderSelect={handleFolderSelect}
                expandedFolders={expandedFolders}
                onToggleExpand={toggleFolderExpand}
                onDeleteFolder={handleDeleteFolder} 
                onCreateFolder={() => {
                  setIsSidebarOpen(false);
                  setShowCreateFolderModal(true);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {showCreateFolderModal && (
        <CreateFolderModal
          parentId={selectedFolderId}
          onClose={() => setShowCreateFolderModal(false)}
          onSuccess={() => {
            setShowCreateFolderModal(false);
            fetchFoldersTree();
            if (selectedFolderId) fetchFolderContents(selectedFolderId);
          }}
        />
      )}

      {showCreateDeckModal && (
        <CreateDeckModal
          folderId={selectedFolderId}
          onClose={() => setShowCreateDeckModal(false)}
          onSuccess={() => {
            setShowCreateDeckModal(false);
            selectedFolderId ? fetchFolderContents(selectedFolderId) : fetchAllDecks();
            fetchFoldersTree();
          }}
        />
      )}
    </Layout>
  );
}