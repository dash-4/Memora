import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import bridge from '@vkontakte/vk-bridge';
import { AdaptivityProvider, ConfigProvider } from '@vkontakte/vkui';
import './index.css'

// Инициализируем bridge
bridge.send('VKWebAppInit');

ReactDOM.createRoot(document.getElementById('root')).render(
  <ConfigProvider>
    <AdaptivityProvider>
      <App />
    </AdaptivityProvider>
  </ConfigProvider>
);