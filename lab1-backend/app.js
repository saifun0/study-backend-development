const express = require('express');
const app = express();
const port = 3000;

// Middleware для логирования каждого входящего запроса (продвинутый уровень)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// 1. Текстовый эндпоинт (корневой маршрут)
app.get('/', (req, res) => {
  res.send('Добро пожаловать на базовый сервер!');
});

// 2. JSON эндпоинт 1 (статус сервера)
app.get('/api/status', (req, res) => {
  res.json({ 
    status: 'ok', 
    uptime: process.uptime() 
  });
});

// 3. JSON эндпоинт 2 (информация о проекте)
app.get('/api/info', (req, res) => {
  res.json({ 
    author: 'Student', 
    version: '1.0.0' 
  });
});

// 4. JSON эндпоинт с параметром в пути (ID пользователя)
app.get('/api/users/:id', (req, res) => {
  res.json({
    message: 'Информация о пользователе',
    userId: req.params.id
  });
});

// 5. Обработка ошибки 404 (для всех несуществующих маршрутов)
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Маршрут не найден' 
  });
});

// Запуск прослушивания порта
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});