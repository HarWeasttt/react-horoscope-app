import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import BottomNavbar from './components/BottomNavbar';
import Home from './pages/Home';
import Wallet from './pages/Wallet'; 
import Horoscope from './pages/Horoscope'; 
import Friends from './pages/Friends'; 
import Tasks from './pages/Tasks'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const App = () => {
  const [chatId, setChatId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({ name: '', birthDate: '', zodiac: '' });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      if (chatId) {
        try {
          const response = await axios.post('/api/user', { chatId });
          if (response.data.exists) {
            setUserData(response.data.user);
          }
        } catch (error) {
          console.error('Ошибка при загрузке данных пользователя:', error);
        }
      }
    };

    if (window.Telegram && window.Telegram.WebApp) {
      const chat = window.Telegram.WebApp.getChat();
      setChatId(chat.id); // Получаем chatId
      fetchUserData(); // Загружаем данные пользователя
    }
  }, [chatId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.birthDate || !formData.zodiac) {
      setErrorMessage('Пожалуйста, заполните все поля.');
      return;
    }

    try {
      const response = await axios.post('/api/user/create', { chatId, ...formData });
      setUserData(response.data.user);
      setErrorMessage('');
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else if (error.request) {
        setErrorMessage('Сервер не ответил. Пожалуйста, попробуйте позже.');
      } else {
        setErrorMessage('Ошибка: ' + error.message);
      }
    }
  };

  return (
    <Router>
      <Routes>
        {/* Определяем маршруты для страниц */}
        <Route path="/home" element={<Home />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/horoscope" element={<Horoscope />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/tasks" element={<Tasks />} />
        {/* Проверка регистрации */}
        <Route 
          path="/" 
          element={
            userData ? (
              <Navigate to="/horoscope" />
            ) : (
              <div className="container">
                <h2>Регистрация</h2>
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Имя" 
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                    />
                  </div>
                  <div className="mb-3">
                    <input 
                      type="date" 
                      className="form-control" 
                      onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })} 
                    />
                  </div>
                  <div className="mb-3">
                    <select 
                      className="form-select" 
                      onChange={(e) => setFormData({ ...formData, zodiac: e.target.value })}>
                      <option value="">Выберите знак зодиака</option>
                      <option value="Овен">Овен</option>
                      <option value="Телец">Телец</option>
                      <option value="Близнецы">Близнецы</option>
                      <option value="Рак">Рак</option>
                      <option value="Лев">Лев</option>
                      <option value="Дева">Дева</option>
                      <option value="Весы">Весы</option>
                      <option value="Скорпион">Скорпион</option>
                      <option value="Стрелец">Стрелец</option>
                      <option value="Козерог">Козерог</option>
                      <option value="Водолей">Водолей</option>
                      <option value="Рыбы">Рыбы</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary">Зарегистрироваться</button>
                </form>
              </div>
            )
          } 
        />
        {/* Обработка 404 ошибок */}
        <Route path="*" element={<Navigate to="/horoscope" />} />
      </Routes>
      <BottomNavbar />
    </Router>
  );
};

export default App;