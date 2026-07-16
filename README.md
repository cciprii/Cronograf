# CronoGraf

Cronograf este un site care arata cum se pot folosi nodurile invatate la informatica. Avem o portiune de wikipedia pe noduri pentru utilizatori neautentificati, iar posibilitatea de a crea un arbore genealogic pentru cei care au cont.

## Funcționalități

- autentificare cu Supabase
- arbore genealogic interactiv cu noduri și conexiuni
- pagini wiki pentru subiecte istorice
- interfață modernă construită cu React, Vite și Tailwind CSS

## Tehnologii folosite

- React
- Vite
- TanStack Router
- TanStack Query
- Supabase
- Tailwind CSS
- TypeScript

## Pornire locală

1. Clonează proiectul:
   ```bash
   git clone <url-repo>
   cd CronoGraf-Frontend
   ```

2. Instalează dependențele:
   ```bash
   npm install
   ```

3. Creează un fișier `.env`

4. Completează variabilele de mediu cu datele tale Supabase:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

5. Pornește aplicația:
   ```bash
   npm run dev
   ```

## Build

```bash
npm run build
```

