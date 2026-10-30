# Web developer portfolio

Полная независимая копия сайта-портфолио на React, TypeScript и Vite. Проект не зависит от OpenAI Sites и подходит для локальной разработки, GitHub и Vercel.

## Запуск в VS Code

1. Откройте эту папку в VS Code.
2. Откройте встроенный терминал.
3. Выполните:

```bash
npm install
npm run dev
```

Vite покажет локальный адрес, обычно `http://localhost:5173`.

## Проверка production-сборки

```bash
npm run build
npm run preview
```

## Где редактировать

- Содержание страницы: `src/App.tsx`
- Все стили и адаптивная верстка: `src/index.css`
- Заголовок и SEO-описание: `index.html`
- Статические изображения и иконки: `public/`

Перед публикацией замените демонстрационный адрес `hello@site.dev` в `src/App.tsx` на свой и добавьте реальные проекты.

## Загрузка в GitHub

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

## Публикация на Vercel

1. Импортируйте GitHub-репозиторий в Vercel.
2. Vercel определит Vite автоматически.
3. Команда сборки: `npm run build`.
4. Папка результата: `dist`.
5. Нажмите **Deploy**.

Переменные окружения, база данных и сервисы Sites этому проекту не нужны.
