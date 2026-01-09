import { useEffect, useState } from 'react';
import bridge from '@vkontakte/vk-bridge';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    bridge.send('VKWebAppInit')
      .then((data) => {
        console.log('Init success:', data); 

        return bridge.send('VKWebAppGetUserInfo');
      })
      .then((userData) => {
        setUser(userData);
        console.log('User:', userData); 
      })
      .catch((err) => {
        setError(err);
        console.error('Bridge error:', err);
      })
      .finally(() => {
        setLoading(false);
      });

    bridge.subscribe((event) => {
      console.log('Bridge event:', event.detail);
    });

    return () => bridge.unsubscribe();
  }, []);

  if (loading) return <div>Загрузка профиля...</div>;
  if (error) return <div>Ошибка: {error.error_type || error}</div>;
  if (!user) return <div>Нет данных</div>;

  return (
    <div>
      <img src={user.photo_200} alt="Аватар" className="w-32 h-32 rounded-full" />
      <p>{user.first_name} {user.last_name}</p>
      <p>ID: {user.id}</p>
    </div>
  );
}

export default App;