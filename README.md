# Portfolio (modern)

Jednostronicowe portfolio (React + Vite + Tailwind). Treści wielojęzyczne (PL/EN) przez i18next.

## Uruchomienie

```bash
npm install
npm run dev
```

Build produkcyjny: `npm run build`, podgląd builda: `npm run preview`.

## Edycja projektów i sekcji

- **Karty aplikacji (grid projektów):** `src/i18n/pl.json` oraz `src/i18n/en.json`, klucz `projects.items`. Każdy wpis może mieć m.in. `slug`, `title`, `subtitle`, `description`, `tags`, `url`, `image` (ścieżka pod `public/`, np. `/images/nazwa.png`), `color`, `size` (`large` = pełna szerokość siatki, inne wartości = węższy kafel na dużych ekranach), opcjonalnie `demo`.
- **Sekcja EDA / notebooki:** ten sam plik, klucz `eda.items` (`notebook_url` wskazuje na pliki w `public/`).
- Grafiki statyczne: katalog `public/images/`.

## Stack

React 19, Vite 8, Tailwind CSS 3, Framer Motion, react-i18next.
