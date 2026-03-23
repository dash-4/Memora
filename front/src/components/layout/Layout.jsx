import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAFBFF] flex flex-col font-sans">
      <Header onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex flex-1 max-w-[1440px] mx-auto w-full relative">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 min-w-0">
          <div className="p-4 sm:p-6 lg:p-8 animate-in fade-in slide-in-from-bottom-3 duration-500">
            {children}
          </div>
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 z-40 lg:hidden backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
