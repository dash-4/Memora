import { BookOpen, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Card from "../cards/Card";

export default function DeckCard({ deck }) {
  const color = deck.color || "#3B82F6";

  return (
    <Link
      to={`/decks/${deck.id}`}
      className="block h-full group focus:outline-none focus:ring-4 focus:ring-blue-100 rounded-[2.5rem]"
    >
      <Card
        className={`
          h-full flex flex-col p-7 bg-white border border-slate-100 rounded-[2.5rem]
          shadow-sm hover:shadow-2xl hover:shadow-slate-200/60 transition-all duration-700 hover:-translate-y-1
        `}
      >
        <div className="flex items-start justify-between mb-6 duration-1000 transition-all">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-700 group-hover:rotate-6 group-hover:scale-110 shadow-inner"
            style={{ backgroundColor: `${color}15`, border: `1px solid ${color}20` }}
          >
            <BookOpen
              size={28}
              style={{ color }}
              className="transition-transform duration-500"
            />
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors">
              <ArrowUpRight size={20} />
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col space-y-3">
          <h3 className="text-xl font-black text-slate-900 line-clamp-2 leading-[1.2] group-hover:text-blue-600 transition-colors">
            {deck.name}
          </h3>

          {deck.description ? (
            <p className="text-sm font-medium text-slate-400 leading-relaxed line-clamp-3 flex-1">
              {deck.description}
            </p>
          ) : (
            <div className="flex-1 border-b border-dashed border-slate-100 mb-4" />
          )}
        </div>

        <div className="mt-6 pt-5 border-t border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-[10px] uppercase tracking-widest font-black text-slate-400">
              Колода
            </span>
          </div>
          {deck.cards_count !== undefined && (
            <span className="text-xs font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-lg">
              {deck.cards_count} карт
            </span>
          )}
        </div>
      </Card>
    </Link>
  );
}