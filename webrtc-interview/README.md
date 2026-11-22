# Видеособеседование 1 на 1

React + Vite приложение для видеозвонка двух участников через WebRTC.
Сигнальный сервер — WebSocket (адрес в `src/config.js`).

## Запуск

```bash
npm install
npm run dev      # http://127.0.0.1:5173
```

Открой приложение в двух окнах: в каждом включи камеру → подключись к серверу → позвони из любого.

## Скрипты

| Команда               | Что делает                                             |
| --------------------- | ------------------------------------------------------ |
| `npm run dev`         | dev-сервер Vite                                        |
| `npm run build`       | сборка в `dist/`                                       |
| `npm run build:pages` | сборка в `docs/` для GitHub Pages                      |
| `npm run lint`        | проверка Oxlint                                        |
| `npm run preview`     | предпросмотр собранной версии                          |

## Структура

```
src/
├── main.jsx                  точка входа
├── App.jsx                   сборка экрана из хуков и компонентов
├── App.css                   раскладка страницы
├── config.js                 адрес сигнального сервера, ICE, таймаут вызова
├── hooks/
│   ├── useCamera.js          камера и микрофон
│   └── useInterviewCall.js   WebSocket-сигналинг и RTCPeerConnection
├── components/
│   ├── ConnectionBadges      индикаторы камеры, сервера, звонка
│   ├── StatusBar             строка статуса
│   ├── Controls              кнопки управления
│   └── VideoTile             плитка с видео
└── styles/
    └── index.css             цвета, шрифты, общие стили
```

## Публикация на GitHub Pages

Pages раздаёт папку `docs/`. После изменений:

```bash
npm run build:pages
git add -A && git commit -m "Update site" && git push
```
