# TaskAI — AI-Powered Task Manager

A full-stack SaaS task management application built with React, Supabase, and Claude AI. Features a Kanban board, real-time database, user authentication, and AI-powered task assistance.

![TaskAI Board](https://img.shields.io/badge/Status-In%20Development-yellow?style=flat-square)
![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react)
![Supabase](https://img.shields.io/badge/Supabase-Database%20%26%20Auth-3ecf8e?style=flat-square&logo=supabase)

---

## Features

- **Kanban Board** — Drag and drop tasks across To Do, In Progress, and Done columns
- **Authentication** — Secure sign up / login with email confirmation via Supabase Auth
- **Real-time Database** — Tasks stored and synced with PostgreSQL via Supabase
- **AI Task Breakdown** — Claude AI suggests subtasks and priorities from a single prompt
- **Dashboard & Analytics** — Visualize productivity with charts and completion stats
- **Protected Routes** — Board is locked behind authentication

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Styling | CSS-in-JS (inline styles) |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| AI | Claude API (Anthropic) |
| Charts | Recharts |
| Routing | React Router v6 |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites
- Node.js 18+
- A Supabase account
- An Anthropic API key (for AI features)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/SaiAshish1234/ai-task-manager.git
cd ai-task-manager
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_ANTHROPIC_API_KEY=your_anthropic_api_key
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Project Structure

```
src/
├── components/
│   ├── layout/         # Sidebar, Header, Layout wrapper
│   └── kanban/         # KanbanBoard, TaskCard, Column
├── pages/
│   ├── Board.jsx       # Main Kanban board page
│   ├── Dashboard.jsx   # Analytics & stats page
│   ├── Login.jsx       # Login page
│   └── Signup.jsx      # Sign up page
├── lib/
│   └── supabase.js     # Supabase client
└── App.jsx             # Routes & auth state
```

---

## Roadmap

- [x] Week 1 — UI shell (Sidebar, Header, Kanban board)
- [x] Week 2 — Supabase authentication
- [ ] Week 3 — Real tasks stored in database
- [ ] Week 4 — AI task breakdown with Claude API
- [ ] Week 5 — Dashboard & analytics charts
- [ ] Week 6 — Polish, mobile responsive, deploy

---

## Author

**G Sai Ashish**
- GitHub: [@SaiAshish1234](https://github.com/SaiAshish1234)
- LinkedIn: [sai-ashish](https://www.linkedin.com/in/sai-ashish-a496a3273)
- Email: saiashish236@gmail.com

---

## License

MIT License — feel free to use this project as inspiration for your own work.