# CronoGraf

CronoGraf este o aplicație web pentru explorarea și construirea unui arbore genealogic interactiv, cu suport pentru autentificare și o experiență de navigare modernă.

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

3. Creează un fișier `.env` pe baza exemplului:
   ```bash
   cp .env.example .env
   ```

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

## Publicare pe GitHub

1. Creează un repository nou pe GitHub.
2. În folderul proiectului rulează:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/USERNAME/REPO_NAME.git
   git push -u origin main
   ```

## Notă importantă

Nu încărca fișierul `.env` în GitHub. Adaugă `.env` în `.gitignore` și păstrează cheia secretă doar local.
