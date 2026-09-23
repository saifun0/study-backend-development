const express = require('express');
const app = express();
const port = 3000;

// Middleware логирования входящих запросов (время, метод, URL)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// 1. Текстовый эндпоинт на корневом маршруте (Вариант 1)
app.get('/', (req, res) => {
  res.send('Добро пожаловать!');
});

// 2. Коллекция 1: Задачи (Вариант 1)
app.get('/api/tasks', (req, res) => {
  res.json([
    { id: 1, title: 'Установить Node.js и зависимости', completed: true },
    { id: 2, title: 'Создать HTTP-сервер на Express', completed: true },
    { id: 3, title: 'Оформить отчет по лабораторной работе', completed: false }
  ]);
});

// 3. Коллекция 2: Проекты (Вариант 1)
app.get('/api/projects', (req, res) => {
  res.json([
    { id: 1, name: 'Веб-разработка: Бэкенд', status: 'active' },
    { id: 2, name: 'Базы данных и SQL', status: 'planned' }
  ]);
});

// 4. Эндпоинт с параметром в пути: ID задачи (Вариант 1)
app.get('/api/tasks/:id', (req, res) => {
  res.json({
    requestedId: req.params.id,
    status: 'success',
    message: `Информация по задаче #${req.params.id} успешно получена`
  });
});

// 5. Обработка ошибки 404 (для всех несуществующих адресов)
app.use((req, res) => {
  res.status(404).json({
    error: 'Маршрут не найден'
  });
});

// Запуск прослушивания порта 3000
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});