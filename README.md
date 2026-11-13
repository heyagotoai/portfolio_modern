# Portfolio (modern)

Jednostronicowe portfolio (React + Vite + Tailwind). Treści wielojęzyczne (PL/EN) przez i18next.

## Uruchomienie

```bash
npm install
npm run dev
```

Build produkcyjny: `npm run build`, podgląd builda: `npm run preview`.
Kontrola kodu: `npm run lint`.

## Edycja projektów i sekcji

- Treści obu języków są w `src/i18n/pl.json` oraz `src/i18n/en.json`. Aktualizuj oba pliki.
- **Główne produkty:** `projects.items`, wpisy `careerguide` i `wspolnik-demo`. Zawierają opis, rolę (`role`), zakres (`scope`), technologie (`tags`), link i ilustrację. Publiczny link Wspólnika prowadzi do demonstracji; wyjaśnia to pole `demo`.
- **Wybrane rozwiązania:** `solutions.items`. Każdy wpis opisuje nazwę, problem, rozwiązanie i technologie. Sekcja nie publikuje etapu zaawansowania projektu.
- **Wcześniejsze projekty:** pozostałe wpisy `projects.items`; **notebooki:** `eda.items`. Pole `notebook_url` wskazuje plik w `public/`.
- Wpis `projects.items` z `visible: false` jest ukryty w sekcji wcześniejszych projektów. Audionotatki pozostają w danych, ale nie są prezentowane w portfolio.
- **Doświadczenie i sposób pracy:** `experience`; **kompetencje:** `skills.categories`; **certyfikaty:** `certificates.items`; **kontakt:** `contact`.
- Grafiki statyczne: katalog `public/images/`.
- Fonty Inter i Space Mono są serwowane lokalnie z `public/fonts/`; w tym samym katalogu znajdują się ich licencje OFL.

## Metadane i adres publikacji

`index.html` zawiera statyczne metadane dla robotów indeksujących i podglądu linku. Adres kanoniczny oraz adresy grafiki Open Graph / Twitter wskazują domenę ustawioną w repozytorium: `https://portfolio-heya-9863s-projects.vercel.app/`. Przy zmianie domeny zaktualizuj te adresy. Grafika podglądu to `public/images/social-preview.png` (1200 × 630 px).

Po przełączeniu języka aplikacja aktualizuje `lang`, tytuł i opisy metadanych. Roboty bez JavaScript otrzymują domyślną polską wersję z `index.html`.

## Efekty i dostępność

Reagujące tło i subtelny przechył z refleksem na kartach projektów działają na urządzeniach z myszą. Canvas rysuje na żądanie i zatrzymuje się po ukryciu karty przeglądarki. Wejścia treści są jednorazowe. Ustawienie `prefers-reduced-motion` wyłącza te animacje, również po zmianie preferencji w trakcie działania strony. Na dotyku nie ma przechyłu ani zapętlonego połysku.

## Stack

React 19, Vite 8, Tailwind CSS 3, Framer Motion, react-i18next.
