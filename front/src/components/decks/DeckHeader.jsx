import { ArrowLeft, Trash2, Hash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

export default function DeckHeader({ deck, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="w-full pb-8 mb-8 border-b border-slate-50">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 justify-between">
        
        <div className="flex items-center gap-5 w-full sm:w-auto">
          <button
            onClick={() => navigate("/decks")}
            className="group p-3 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:bg-slate-50 transition-all active:scale-90 shrink-0"
            title="Назад к колодам"
          >
            <ArrowLeft size={24} className="text-slate-600 group-hover:text-slate-900 group-hover:-translate-x-1 transition-transform" />
          </button>

          <div className="space-y-1">
            <div className="flex items-center gap-3">
               <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-none">
                {deck?.name}
              </h1>
             
            </div>
            
            {deck?.description && (
              <p className="text-sm sm:text-base font-medium text-slate-400 max-w-xl leading-relaxed">
                {deck.description}
              </p>
            )}
          </div>
        </div>

        {/* Правая часть: Действия */}
        <div className="flex items-center gap-3 w-full sm:w-auto self-end sm:self-center">
          <Button
            variant="ghost"
            onClick={onDelete}
            className="group w-full sm:w-auto h-12 px-5 rounded-2xl border-2 border-slate-100 text-slate-400 hover:text-red-600 hover:border-red-50 hover:bg-red-50 transition-all"
          >
            <Trash2 size={20} className="sm:mr-2 transition-transform group-hover:scale-110" />
            <span className="font-bold sm:inline">Удалить</span>
          </Button>
        </div>

      </div>
    </div>
  );
}