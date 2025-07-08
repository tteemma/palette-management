# Управление палитрами

## Тестовое задание для [БКХ Еком](https://calendly.com/sharapova-natalia-v/meet-with-me)


### Структура 

```
palette-management/
├── node_modules/
├── public/
├── src/
│   ├── assets/                                 
│   ├── components/
│   │   └── colorSystem/
│   │       ├── __tests__/                       # Тесты для colorSystem
│   │       │   └── palette.test.ts              # Юнит-тесты для createTone и createPalette
│   │       ├── atoms/
│   │       │   ├── colors.ts                    # Базовые цвета (InputModel)
│   │       │   └── types.ts                     # Типы для цветов и тонов
│   │       ├── molecules/
│   │       │   ├── createTone.ts                # Фабрика для создания объектов тонов
│   │       │   └── tonePresets.ts               # Предопределённые тона (baseTone, brightness, depths)
│   │       └── organisms/
│   │           ├── createPalette.ts             # Основная логика сборки палитры
│   │           └── palettePresets.ts            # Экспортирует appPalette, appPaletteContrast и др.
│   ├── App.css                                  
│   ├── App.tsx                                  
│   ├── index.css                                
│   ├── main.tsx                                 
│   ├── vite-env.d.ts                            
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts

```

### Ключевые файлы и их роли

- **`atoms/colors.ts`**: Определяет объект `baseColors` с начальными данными цветов (например, красный, зеленый, синий, желтый) и связанные типы.
- **`atoms/types.ts`**: Содержит определения типов, такие как `ColorData`, `InputModel`, `ToneCallback` и `SubtonesConfig`.
- **`molecules/createTone.ts`**: Реализует функцию `createTone` для создания типобезопасных объектов тонов с необязательными подтонами.
- **`molecules/tonePresets.ts`**: Экспортирует предопределенные тоны (например, `baseTone`, `brightness`, `depths`, `contrast`).
- **`organisms/createPalette.ts`**: Реализует функцию `createPalette` для генерации палитры путем комбинирования базовых цветов и тонов.
- **`components/colorSystem/organisms/palettePresets.ts`**: Экспортирует `appPalette` и `appPaletteContrast` с использованием `createPalette`.
- **`App.tsx`**: Основной React-компонент, отображающий сетку карточек с данными палитры.
- **`tests/palette.test.ts`**: Содержит юнит-тесты для `createTone` и `createPalette` с использованием Vitest.

## Начало работы

### Установка

1. Склонируйте репозиторий:
   ```bash
   git clone <url-репозитория>
   cd palette-management
   ```
2. Установите зависимости:
   ```bash
   npm install
   ```

### Запуск проекта

1. Запустите сервер разработки:

   ```bash
   npm run dev
   ```

   - Это запустит приложение по адресу `http://localhost:5173` (или другому порту, если указано).

2. Запуск тестов:
   ```bash
   npm test
   ```
   - Это выполнит юнит-тесты с использованием Vitest.

## Использование

- Приложение отображает две палитры (`appPalette` и `appPaletteContrast`) в виде сетки.
- Каждая карточка показывает ключ (например, `blue`, `blue_brightness`) и связанные данные цвета в формате JSON.
- Система расширяема, т.е вы можете добавить новые цвета в `baseColors` или новые тоны в `tonePresets.ts`.

## Тестирование

- Юнит-тесты находятся в `tests/palette.test.ts`.
- Тесты покрывают создание тонов и палитр, обеспечивая правильную структуру и данные.
- Выполните `npm test` для запуска тестов и просмотра результатов.
