# Handoff: Лендинг «Личная CRM»

## Overview
Одностраничный статичный лендинг продукта «Личная CRM». Одно целевое действие — **перейти в приложение**: все кнопки ведут по одной ссылке (`APP_URL`, задать в конфиге).
Концепция: каждый блок — отдельный лист из записной книжки / ежедневника, «вырванный из разных мест» (линейка, клетка, перфорация, стикер), разложенный на тёмно-зелёной обложке.

Стек: **Astro + Tailwind CSS 4**, статическая сборка (`output: 'static'`), без клиентского JS.

## About the Design Files
Файлы в `design/` — **дизайн-референсы в HTML** (прототипы), а не продакшн-код. Их нужно воссоздать в Astro-компонентах с Tailwind 4. Открыть референсы: запустить любой статический сервер в `design/` (например `npx serve design`) и открыть `.dc.html` в браузере (рядом лежит `support.js` — рантайм прототипа, в проект его не переносить).

- `design/Landing Mobile v3.dc.html` — мобильная версия (макет 390 px).
- `design/Landing Desktop.dc.html` — десктоп (макет 1440 px, резиновый до ~900 px).
- `copy/landing-text.md` — исходный текст. **Все тексты — дословно отсюда.**
- `assets/paper-noise.svg` — тайл зернистости бумаги (240×240).

## Fidelity
**High-fidelity.** Цвета, шрифты, размеры, ритм строк и декор — финальные. Воспроизводить точно.

---

## Ключевой принцип: вертикальный ритм 32 px
Листы в линейку разлинованы с шагом **32 px** (линия 1 px в позиции 31–32 каждого шага, от верхнего края листа). Весь текст стоит на этих линиях:
- `line-height` всех текстовых элементов — 32 px (или кратно: 64, 96).
- Все вертикальные отступы между элементами внутри листа — кратны 32 px.
- Первая строка контента: `padding-top: 42px` у листа (≈ базовая линия ложится на линию 2-го шага).
- Заголовки с кеглем больше строки сдвинуты `position:relative; top:-7px` (моб. h1/h2 33px), `top:-9px` (деск. h2 46/64), `top:-14px` (деск. h1 76/96), чтобы базовая линия села на линейку. Подзаголовки фич: `top:-2px`.
- Кнопка: высота 52 px + `margin-top:38px; margin-bottom:6px` (= 96 px — ровно три строки). Мобильная кнопка на первом листе.
- **Цифры — только лайнинговые**: `font-variant-numeric: lining-nums` на всех текстовых элементах (Alegreya по умолчанию даёт старостильные цифры — заказчик просил, чтобы цифры не были меньше букв). Важно: шорткат `font:` сбрасывает это свойство, поэтому ставить его после/отдельно (в Tailwind — утилита `lining-nums` на каждом текстовом узле или глобально в base-слое для `body, h1, h2, p, li, a, span, div`).

---

## Design Tokens

### Цвета
| Токен | Hex | Где |
|---|---|---|
| cover | `#3f5a3a` | фон страницы (обложка), акцент-курсив в заголовках, ✓ |
| ink | `#2b3527` | заголовки h1/h2 |
| ink-strong | `#2f3a2a` | лого-текст, названия фич, жирный лид, фон кнопки |
| ink-body | `#45503d` | основной текст |
| ink-muted | `#7b6d53` | даты в шапке листов |
| paper | `#f1e9d2` | лист в линейку |
| paper-grid | `#f4f0e2` | лист в клетку |
| paper-aged | `#ece2c6` | лист с перфорацией |
| sticker | `#f6e39a` | стикер (блок 5) |
| btn-text | `#f1ead4` | текст кнопки |
| btn-hover | `#3f5a3a` | фон кнопки при hover |
| btn-dot | `#c9d4a8` | кружок со стрелкой в кнопке |
| ribbon / ink-red | `#a8452c` | закладка, «?» на полях |
| ink-blue | `#2c4a7a` | рукописные номера, рукописный текст стикера |
| rule | `rgba(70,100,130,.28)` | линии линейки |
| grid-rule | `rgba(70,100,130,.22)` | линии клетки |
| margin-line | `rgba(176,70,60,.55)` | красная линия полей (справа) |
| tape | `rgba(232,222,196,.8)` | скотч |

### Шрифты (Google Fonts)
`Alegreya` (500, 700, 500 italic) — заголовки, лого, названия фич.
`Alegreya Sans` (400, 500, 700) — текст, даты, кнопка.
`Caveat` (700) — рукописные пометки на полях и текст стикера.
Рекомендуется self-host через `@fontsource/alegreya`, `@fontsource/alegreya-sans`, `@fontsource/caveat` (кириллица обязательна), `font-display: swap`.

### Типографика
| Элемент | Mobile | Desktop |
|---|---|---|
| Лого «Личная CRM» | Alegreya 700 19/32 | Alegreya 700 21/32 |
| Дата листа (UPPERCASE, `letter-spacing:.12em`) | Alegreya Sans 500 13/32 | 500 14/32 |
| h1 | Alegreya 500 33/32 | Alegreya 500 76/96, `letter-spacing:-.01em`, `text-wrap:balance`, max-w 900 (fluid: `clamp(40px,5.3vw,76px)/clamp(64px,6.7vw,96px)`) |
| Подзаголовок h1 | Alegreya Sans 400 18/32 | 22/32, max-w 640 |
| h2 | Alegreya 500 33/32 | Alegreya 500 46/64 |
| Текст | Alegreya Sans 400 18/32 | 19/32 (подзаголовок блока 3 — 21/32) |
| Название фичи | Alegreya 700 22/32 | 24/32 |
| Пометки на полях (?, 1–4, ✓) | Caveat 700 26/32, ширина 32, по центру | Caveat 700 28/32 |
| Кнопка | Alegreya Sans 700 17 | 700 18 |
| Стикер h2 | Alegreya 500 30/1.1 | 44/1.08 |
| Стикер текст | Caveat 700 25/1.15, `#2c4a7a` | 32/1.12 |
Курсив-акцент в заголовках (`<i>`, цвет `#3f5a3a`): «с историей», «история», «историю».
Неразрывные пробелы: «с&nbsp;историей», «а&nbsp;человека», «в&nbsp;историю».

### Фактура бумаги (общие слои фона)
- Зерно: `url(/paper-noise.svg)` 240×240, повтор.
- Линейка: `repeating-linear-gradient(180deg, transparent 0 31px, rgba(70,100,130,.28) 31px 32px)`, size `100% 32px`.
- Клетка 16 px: два `repeating-linear-gradient` (180deg и 90deg, `transparent 0 15px, rgba(70,100,130,.22) 15px 16px`), size `100% 16px` и `16px 100%`, позиция второго `8px 0`.
- Поля справа: `linear-gradient(270deg, transparent Xpx, rgba(176,70,60,.55) Xpx, … X+1px, transparent X+1px)`; X = 57 (mobile), 120 (desk, лист 1), 80 (desk, листы 2 и 4).
- Корешок слева (только лист 1): `linear-gradient(90deg, rgba(60,50,20,.28) 0, rgba(60,50,20,.08) 18px, transparent 34px)` (desk: 22px / 44px).

Рекомендация: вынести слои в CSS-классы `.paper`, `.paper-lined`, `.paper-grid`, `.margin-right` через `@utility` в Tailwind 4 (длинные градиенты в arbitrary values нечитаемы).

### Тени
- Лист 1: `box-shadow: 4px 0 0 -1px #e3d9be, 8px 0 0 -2px #d8cdb0, 0 10px 24px rgba(0,0,0,.25)` (стопка страниц справа). Desk: `5px…, 10px…, 0 14px 34px rgba(0,0,0,.28)`.
- Листы 2–4 (обрезаны clip-path/mask, поэтому тень — на обёртке): `filter: drop-shadow(0 8px 12px rgba(20,30,15,.32))`; desk `0 12px 18px`.
- Стикер: `0 18px 16px -12px rgba(20,30,15,.45), 0 2px 4px rgba(20,30,15,.18)`; desk `0 26px 22px -16px …`.
- Скотч: `0 1px 2px rgba(0,0,0,.12)`.

### Радиусы
Лист 1: `0 10px 10px 0` (desk 12). Кнопка: `29px` (pill). Кружок в кнопке: 50%. Остальные листы — без скругления.

---

## Screens / Views

Единая страница. Обёртка: фон `#3f5a3a`, flex-колонка, `gap: 40px` (mob) / `80px` (desk), `padding-bottom: 56px` / `120px`, `overflow:hidden` (из-за поворотов листов).

### Шапка листа (общий элемент)
Листы 2–4 начинаются с даты (UPPERCASE, `#7b6d53`), затем h2 с `margin-top:32px`:
- Лист 2: «среда · 21 октября»
- Лист 3: «пятница · 23 октября»
- Лист 4: «воскресенье · 25 октября»
(Даты — декоративные, не из текста лендинга; согласованы с заказчиком как элемент концепции «разные записи».)

### Блок 1 — Первый экран (лист ежедневника)
- Обёртка: `padding: 14px 14px 0 0` (mob) / `28px 40px 0 0` (desk) — лист прижат к левому краю (корешок).
- Лист: фон paper + зерно + корешок + поля справа + линейка; `padding: 42px 72px 38px 26px` (mob) / `42px 160px 70px 120px` (desk).
- Закладка: абсолютная, `right:20px; top:-4px; 18×118`, `#a8452c`, `clip-path: polygon(0 0,100% 0,100% 100%,50% 88%,0 100%)`, `box-shadow: inset -3px 0 0 rgba(0,0,0,.12)`. Desk: `right:60px; top:-6px; 24×180`.
- Контент по порядку: лого (знак + «Личная CRM», высота строки 32) → h1 (`margin-top:32px`, desk 96px) → подзаголовок (`margin-top:32px`) → кнопка.
- Лого-знак: квадрифолий 20×20 (desk 22) из 4 кругов + центральный квадрат, цвет `#3f5a3a`. Можно заменить на SVG-файл логотипа, если есть.
- Тексты: h1 «Каждый знакомый — с историей, а не просто номером»; p «Личная CRM для людей, которых вы знаете лично. Кто это, откуда знакомы, о чём говорили и о чём договорились — в одной карточке.»; кнопка «Открыть приложение».

### Кнопка (CTA, переиспользуемый компонент)
`<a href={APP_URL}>`; flex, `align-items:center; justify-content:space-between` (mob, на всю ширину) / `align-self:flex-start; gap:28px` (desk); высота 52; `padding: 0 10px 0 22px` (desk `0 10px 0 26px`); `border-radius:29px`; фон `#2f3a2a`, текст `#f1ead4`; справа кружок 36×36 `#c9d4a8` со стрелкой «→» (20px, цвет `#2f3a2a`). Hover: фон `#3f5a3a`. Добавить `focus-visible` кольцо (напр. `outline: 2px solid #c9d4a8; outline-offset: 3px`).

### Блок 2 — Проблема (лист, вырванный из блокнота на пружине)
- Обёртка: `margin: 0 14px 0 6px; transform: rotate(-1.2deg)` + drop-shadow. Desk: `max-width:900px`, отступ слева ≈120px.
- Лист: paper + поля справа + линейка; `padding: 42px 72px 46px 30px` (desk `42px 112px 54px 56px`).
- Следы от колец слева: `mask: radial-gradient(circle at 0 16px, transparent 7px, #000 7.5px) 0 0/100% 32px repeat-y` (desk 8/8.5px).
- Рваный низ: `clip-path: polygon(...)` — зубцы 1–9 px по нижнему краю (точные точки — в референсе).
- h2 «Номер есть, а человека не помните».
- Список из 4 пунктов, `gap:32px`; пометка «?» (`#a8452c`) на правом поле: mob — абсолютно `right:-56px`; desk — сетка 2 колонки (`repeat(auto-fit,minmax(280px,1fr))`, column-gap 40), пометка слева от текста в flex (`gap:8px`).

### Блок 3 — Решение (лист в клетку, рваный верх)
- Обёртка: `margin: 0 6px 0 14px; rotate(.9deg)` + drop-shadow. Desk: `max-width:1000px`, прижат вправо (`margin-right≈110px`), `rotate(.8deg)`.
- Лист: `#f4f0e2` + зерно + клетка 16 px; `padding: 42px 66px 38px 26px` (desk `42px 64px 54px`). Красной линии полей нет.
- Рваный верх: `clip-path: polygon(0 7px, 5% 2px, 11% 8px, … 100% 7px, 100% 100%, 0 100%)`.
- h2 «За каждым именем — история»; p «Личная CRM хранит не только контакты, но и всё, что между вами было.»
- 4 фичи (номер Caveat `#2c4a7a` + название + текст), `gap:32px`, desk — 2 колонки (column-gap 48):
  1. Кто это — Имя, кто это, откуда знакомы, телефон и почта. Обязательно только имя — остальное допишете потом.
  2. История разговоров — После встречи — пара строк в ленту заметок. Каждая с датой, новые сверху, старые не стираются.
  3. О чём договорились — Отдельное поле в карточке — обещания всегда на виду и не теряются среди заметок.
  4. Быстрый поиск — По имени или по тому, кто это: «анна ветеринар» найдёт нужную Анну. Слова — в любом порядке.

### Блок 4 — Выгоды (лист с перфорацией, на скотче)
- Обёртка: `margin: 0 10px; rotate(-.7deg)` + drop-shadow. Desk: `max-width:920px`, отступ слева ≈160px.
- Скотч: абсолютный прямоугольник 84×24 (desk 110×28 справа + 96×28 слева), `top:-10px`, `rotate(5deg)` / `rotate(-4deg)`, цвет tape. Лежит на обёртке поверх листа (не внутри маски).
- Лист: `#ece2c6` + зерно + поля справа + линейка; `padding: 42px 72px 38px 26px` (desk `42px 112px 38px 56px`).
- Перфорация сверху: `mask: radial-gradient(circle at 7px 0, transparent 4px, #000 4.5px) 0 0/14px 100% repeat-x` (desk 8px/5/5.5, шаг 16px).
- h2 «Что изменится»; 4 пункта с ✓ (`#3f5a3a`), жирный лид `#2f3a2a` + текст; desk — 2 колонки.

### Блок 5 — Призыв (стикер)
- `margin: 8px 34px 0; rotate(2deg)`; desk `max-width:560px`, по центру.
- Фон `#f6e39a` + зерно + `linear-gradient(180deg, rgba(0,0,0,.05), transparent 22%)`; `padding: 30px 24px 26px` (desk `44px 44px 40px`); flex-колонка `gap:14px` (desk 18).
- h2 «Превратите первый номер в историю», p (Caveat) «Вспомните, с кем говорили сегодня, и заведите первую карточку.», кнопка «Открыть приложение» (`margin-top:8px`, desk 12px).
- Ритм 32 px на стикере не применяется.

---

## Interactions & Behavior
- Единственное взаимодействие — ссылки «Открыть приложение» (2 шт.) → `APP_URL`. Без JS.
- Hover кнопки: фон `#2f3a2a → #3f5a3a`, `transition: background-color .15s`.
- Анимаций нет. Повороты листов статичны.
- `prefers-reduced-motion` не требуется.

## Responsive
- `< 768px` — мобильная раскладка (одна колонка, размеры из колонки Mobile).
- `≥ 768px` — десктопная: max-width контейнера 1440 px по центру, листы разной ширины со сдвигом влево/вправо, списки в 2 колонки (`repeat(auto-fit, minmax(280px, 1fr))` — сами схлопываются в 1 колонку на узких экранах).
- Отступы и кегль h1 на десктопе резиновые (`clamp`, см. референс), чтобы листы не вылезали за обложку при 768–1440 px.
- На всех ширинах сохранять кратность 32 px по вертикали внутри листов в линейку.

## State Management
Нет. Статичная страница.

## Рекомендуемая структура Astro
```
src/
  layouts/Base.astro          — <html lang="ru">, шрифты, meta, фон обложки
  components/
    Sheet.astro               — props: variant ('diary'|'spiral'|'grid'|'perforated'), date?, rotate, class
    Cta.astro                 — кнопка «Открыть приложение»
    MarginMark.astro          — пометка Caveat на полях
    Logo.astro
    Sticker.astro
  data/landing.ts             — все тексты (дословно из copy/landing-text.md)
  styles/global.css           — @import "tailwindcss"; @theme {...}; @utility paper / paper-lined / paper-grid / margin-right / torn-top / torn-bottom / spiral-holes / perforation-top
  pages/index.astro
public/paper-noise.svg
```
Пример `@theme` (Tailwind 4):
```css
@theme {
  --color-cover: #3f5a3a;
  --color-ink: #2b3527;
  --color-ink-strong: #2f3a2a;
  --color-ink-body: #45503d;
  --color-ink-muted: #7b6d53;
  --color-paper: #f1e9d2;
  --color-paper-grid: #f4f0e2;
  --color-paper-aged: #ece2c6;
  --color-sticker: #f6e39a;
  --color-btn-text: #f1ead4;
  --color-btn-dot: #c9d4a8;
  --color-ink-red: #a8452c;
  --color-ink-blue: #2c4a7a;
  --font-serif: "Alegreya", serif;
  --font-sans: "Alegreya Sans", sans-serif;
  --font-hand: "Caveat", cursive;
  --spacing-row: 32px;
}
```

## SEO / мета (рекомендация)
`<title>Личная CRM — каждый знакомый с историей</title>`, description — подзаголовок первого экрана, `lang="ru"`, `theme-color: #3f5a3a`.

## Assets
- `assets/paper-noise.svg` — сгенерированный шум (feTurbulence), положить в `public/`.
- Шрифты — Google Fonts / Fontsource (OFL).
- Логотип — собран из CSS-фигур; заменить на файл логотипа, если он есть.
- Изображений нет.

## Files
- `design/Landing Mobile v3.dc.html` — мобильный референс.
- `design/Landing Desktop.dc.html` — десктопный референс.
- `design/support.js` — рантайм для просмотра референсов (не переносить).
- `copy/landing-text.md` — источник текстов.
- `assets/paper-noise.svg` — фактура.
