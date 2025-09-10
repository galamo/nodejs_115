# Security App (React + TypeScript + Vite)

A minimal starter that includes:
- Vite + React + TS
- React Router v6
- Pages: **Login**, **Register**, **Data**
- Shared Header with **Logout**
- Axios services with a preconfigured instance and auth header
- Dark, security-themed styling

## Quickstart
```bash
npm i
npm run dev
```

Set your API base URL (optional) in `.env`:
```bash
VITE_API_BASE_URL=http://localhost:3000
```

### Auth API (expected)
- `POST /auth/login` → `{ token }`
- `POST /auth/register` → `{ ok: true }`
- `GET /dates?from=YYYY-MM-DD&to=YYYY-MM-DD` → `[{ session, country, amount, date }]`

You can adapt endpoints in `src/services/*.ts` to match your backend.
