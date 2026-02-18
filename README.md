# Health Nugget Ilare

Health Nugget Ilare is a React + Vite frontend for simple, accessible community health education content.

## Features
- Browse health nuggets from a local JSON API
- Filter nuggets by content type and category
- Clean, mobile-friendly card layout

## Tech Stack
- React 19
- Vite 7
- Bootstrap 5
- Tailwind CSS 4 (PostCSS plugin)
- json-server (mock API)

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the mock API:
   ```bash
   npx json-server --watch db.json --port 3001
   ```
3. Start the frontend:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## Project Structure
- `src/App.jsx`: Main page shell and nuggets list
- `src/hooks/useNuggets.js`: Nugget loading and filtering logic
- `src/hooks/useCategories.js`: Category loading logic
- `src/components/ui`: Reusable UI components
- `src/api/nuggetService.js`: API access helpers
- `db.json`: Local mock data
