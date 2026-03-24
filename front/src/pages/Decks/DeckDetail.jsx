import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AlertCircle, Calendar, Dumbbell, Info, Clock, Sparkles, Link2, ClipboardList, RefreshCw, ChevronRight } from 'lucide-react';
import api from '@/services/api';
import Layout from '@/components/layout/Layout';
import CardModal from '@/components/cards/CardModal';
import DeckHeader from '@/components/decks/DeckHeader';
import DeckStats from '@/components/decks/DeckStats';
import CardsList from './components/CardsList';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';

export default function DeckDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [allCards, setAllCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCardModal, setShowCardModal] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

  const [filters, setFilters] = useState({
    search: '',
    status: '',
  });
  const [studyReverse, setStudyReverse] = useState(false);

  const fetchDeckDetails = useCallback(async () => {
    try {
      const params = {};
      if (filters.status) params.status = filters.status;
      const [deckRes, cardsRes] = await Promise.all([
        api.get(`/decks/${id}/`),
        api.get(`/decks/${id}/cards/`, { params }),
      ]);

      setDeck(deckRes.data);

      let fetchedCards = cardsRes.data.cards || cardsRes.data;
      setAllCards(fetchedCards);

      if (filters.search) {
        fetchedCards = fetchedCards.filter(
          (card) =>
            card.front?.toLowerCase().includes(filters.search.toLowerCase()) ||
            card.back?.toLowerCase().includes(filters.search.toLowerCase()) ||
            card.tags?.some((tag) => tag.toLowerCase().includes(filters.search.toLowerCase()))
        );
      }

      setCards(fetchedCards);
    } catch (err) {
      toast.error('Не удалось загрузить колоду');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id, filters]);

  useEffect(() => {
    fetchDeckDetails();
  }, [fetchDeckDetails]);

  const handleFilterChange = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleDeleteDeck = useCallback(async () => {
    if (!window.confirm('Удалить колоду? Это действие нельзя отменить.')) return;

    try {
      await api.delete(`/decks/${id}/`);
      toast.success('Колода удалена');
      navigate('/decks');
    } catch (err) {
      toast.error('Не удалось удалить колоду');
      console.error(err);
    }
  }, [id, navigate]);

  const handleDeleteCard = useCallback(async (cardId) => {
    if (!window.confirm('Удалить карточку?')) return;

    try {
      await api.delete(`/cards/${cardId}/`);
      setCards((prev) => prev.filter((c) => c.id !== cardId));
      setAllCards((prev) => prev.filter((c) => c.id !== cardId));
      toast.success('Карточка удалена');
    } catch (err) {
      toast.error('Не удалось удалить карточку');
      console.error(err);
    }
  }, []);

  const handleCreateCard = useCallback(() => {
    setEditingCard(null);
    setShowCardModal(true);
  }, []);

  const handleEditCard = useCallback((card) => {
    setEditingCard(card);
    setShowCardModal(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setShowCardModal(false);
    setEditingCard(null);
  }, []);

  const handleModalSuccess = useCallback(() => {
    handleModalClose();
    fetchDeckDetails();
  }, [handleModalClose, fetchDeckDetails]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-4 border-slate-100 border-t-blue-600 animate-spin" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!deck) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 max-w-md mx-auto">
          <div className="p-4 bg-red-50 rounded-3xl mb-6">
            <AlertCircle className="h-12 w-12 text-red-500" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">Колода не найдена</h2>
          <Button 
            variant="secondary"
            onClick={() => navigate('/decks')}
            className="rounded-2xl px-8 shadow-sm"
          >
            Вернуться к списку
          </Button>
        </div>
      </Layout>
    );
  }

  const statsCards = allCards.length > 0 ? allCards : cards;
  const cardsForLearning = statsCards.length;
  const newCardsCount = statsCards.filter((c) => !c.repetitions || c.repetitions === 0).length;

  return (
    <Layout>
      <div className="space-y-8 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 animate-in fade-in duration-500">
        <DeckHeader deck={deck} onDelete={handleDeleteDeck} />

        <DeckStats total={statsCards.length} dueToday={cardsForLearning} newCount={newCardsCount} />

        <div className="bg-gradient-to-br from-white to-slate-50/50 border border-slate-200/60 rounded-[2rem] p-6 shadow-sm ring-1 ring-black/[0.02]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-5">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${studyReverse ? 'bg-blue-600 shadow-lg shadow-blue-200 rotate-180' : 'bg-white shadow-sm border border-slate-100'}`}>
                <RefreshCw size={24} className={studyReverse ? 'text-white' : 'text-slate-400'} />
              </div>
              <div>
                <p className="font-bold text-slate-900 text-lg leading-tight">Реверсивный режим</p>
                <p className="text-slate-500 text-sm mt-1 font-medium">Поменять местами вопрос и ответ</p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer scale-110">
              <input
                type="checkbox"
                checked={studyReverse}
                onChange={(e) => setStudyReverse(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-slate-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-100 peer-checked:after:translate-x-7 peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-[20px] after:w-[20px] after:transition-all after:shadow-sm duration-300 transition-colors"></div>
            </label>
          </div>
        </div>

        {statsCards.length === 0 && (
          <div className="bg-blue-50/50 border border-blue-100 p-6 rounded-3xl animate-pulse">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-100 rounded-xl">
                <Info className="text-blue-600 shrink-0" size={24} />
              </div>
              <div>
                <h4 className="text-blue-900 font-bold mb-1">Как начать обучение?</h4>
                <p className="text-blue-700/80 text-sm font-medium leading-relaxed">
                  Добавьте хотя бы одну карточку в колоду. Мы рекомендуем начинать с 5-10 штук для лучшего закрепления.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Обучение',
              icon: Calendar,
              color: 'blue',
              badge: cardsForLearning > 0 ? 'Обучение' : 'Пусто',
              desc: 'Алгоритм интервальных повторений для вечного запоминания.',
              btn: 'Начать обучение',
              iconBtn: Sparkles,
              path: 'learning',
              active: cardsForLearning > 0,
            },
            {
              title: 'Тренировка',
              icon: Dumbbell,
              color: 'purple',
              badge: 'Без оценок',
              desc: 'Быстрый просмотр всех карточек без влияния на статистику.',
              btn: 'Тренироваться',
              iconBtn: Dumbbell,
              path: 'practice',
              active: statsCards.length > 0,
            },
            {
              title: 'Подбор пар',
              icon: Link2,
              color: 'amber',
              badge: 'Игра',
              desc: 'Соединяйте термины и определения на скорость.',
              btn: 'Начать игру',
              iconBtn: Link2,
              path: 'matching',
              active: statsCards.length >= 2,
            },
            {
              title: 'Тест',
              icon: ClipboardList,
              color: 'emerald',
              badge: 'Экзамен',
              desc: 'Проверка знаний с выбором вариантов ответа.',
              btn: 'Запустить тест',
              iconBtn: ClipboardList,
              path: 'test',
              active: statsCards.length > 0,
            },
          ].map((mode) => {
            
            return (
              <div
                key={mode.title}
                className={`group relative flex flex-col bg-white rounded-[2.5rem] border border-slate-200/60 p-8 transition-all duration-300 hover:-translate-y-1 ${
                  mode.active ? 'hover:shadow-2xl hover:shadow-slate-200/50 hover:border-blue-200' : 'opacity-80'
                }`}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-300 ${
                    mode.active ? `bg-${mode.color}-50 group-hover:bg-${mode.color}- group-hover:text-white` : 'bg-slate-50'
                  }`}>
                    <mode.icon size={28} className={`duration-600 transition-all ${
                      mode.active ? `text-${mode.color}-600 group-hover:text-black` : 'text-slate-300'
                    }`} />
                  </div>
                  <span className={`text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full ${
                    mode.active ? `bg-${mode.color}-50 text-${mode.color}-600` : 'bg-slate-100 text-slate-400'
                  }`}>
                    {mode.badge}
                  </span>
                </div>

                <h3 className="text-xl font-black text-slate-900 mb-2">{mode.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow font-medium">
                  {mode.desc}
                </p>

                {mode.active ? (
                  <button
                    onClick={() => navigate(`/study?deck=${id}&mode=${mode.path}${studyReverse ? '&reverse=1' : ''}`)}
                    className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center transition-all bg-blue-700 text-white hover:bg-black hover:shadow-lg active:scale-[0.98]`}
                  >
                    <mode.iconBtn size={18} className="mr-2" />
                    {mode.btn}
                  </button>
                ) : (
                  <div className="w-full py-4 rounded-2xl bg-slate-50 text-slate-400 text-xs font-bold text-center border border-dashed border-slate-200">
                    Недостаточно карточек
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="">
          <CardsList
            cards={cards}
            statsCards={statsCards}
            filters={filters}
            onFilterChange={handleFilterChange}
            onCreateCard={handleCreateCard}
            onEditCard={handleEditCard}
            onDeleteCard={handleDeleteCard}
            onResetFilters={() => setFilters({ search: '', status: '' })}
          />
        </div>
      </div>

      {showCardModal && (
        <CardModal
          deckId={id}
          card={editingCard}
          onClose={handleModalClose}
          onSuccess={handleModalSuccess}
        />
      )}
    </Layout>
  );
}