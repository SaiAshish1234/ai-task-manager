# TaskAI — AI-Powered Task Manager

A full-stack SaaS task management application built with React, Supabase, and Gemini AI. Features a stunning glassmorphism UI, Kanban board, real-time database, user authentication, and AI-powered task assistance.

![TaskAI](https://img.shields.io/badge/Status-Live-brightgreen?style=flat-square)
![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react)
![Supabase](https://img.shields.io/badge/Supabase-Database%20%26%20Auth-3ecf8e?style=flat-square&logo=supabase)
![Gemini](https://img.shields.io/badge/Gemini-AI-4285f4?style=flat-square&logo=google)

🌐 **Live Demo:** [ai-task-manager-flax.vercel.app](https://ai-task-manager-flax.vercel.app)

---

## Features

- **Glassmorphism UI** — Stunning dark gradient mesh background with frosted glass sidebar, cards, and panels
- **Kanban Board** — Move tasks across To Do, In Progress, and Done columns with hover actions
- **Authentication** — Secure sign up / login with email confirmation via Supabase Auth
- **Real-time Database** — Tasks stored and synced with PostgreSQL via Supabase
- **AI Task Breakdown** — Gemini AI generates 4-6 actionable subtasks from a single title
- **AI Priority Suggestion** — AI recommends high, medium, or low priority based on task context
- **AI Description Generator** — AI writes a detailed, specific task description from just a title
- **Draggable AI Panel** — Floating glass AI assistant panel that can be dragged anywhere on screen
- **Dashboard & Analytics** — Real-time charts for tasks by status and priority, plus completion rate
- **Protected Routes** — Board is locked behind authentication

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Styling | CSS-in-JS (Glassmorphism + Gradient Mesh) |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| AI | Google Gemini API (gemini-2.5-flash) |
| Charts | Recharts |
| Routing | React Router v6 |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites
- Node.js 18+
- A Supabase account
- A Google AI Studio API key (free)

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
VITE_GEMINI_API_KEY=your_gemini_api_key
```

4. Create the `tasks` table in your Supabase project with these columns:

| Column | Type | Default |
|---|---|---|
| id | int8 | auto |
| created_at | timestamptz | now() |
| title | text | — |
| description | text | — |
| column | text | todo |
| priority | text | medium |
| user_id | uuid | — |

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Project Structure

```
src/
├── components/
│   ├── layout/         # Sidebar, Header, Layout wrapper
│   └── kanban/         # KanbanBoard, TaskCard, Column, AIPanel
├── pages/
│   ├── Board.jsx       # Main Kanban board page
│   ├── Dashboard.jsx   # Analytics & stats page
│   ├── Login.jsx       # Login page
│   └── Signup.jsx      # Sign up page
├── lib/
│   ├── supabase.js     # Supabase client
│   └── ai.js           # Gemini AI helper functions
└── App.jsx             # Routes & auth state
```

---

## Roadmap

- [x] Week 1 — UI shell (Sidebar, Header, Kanban board)
- [x] Week 2 — Supabase authentication
- [x] Week 3 — Real tasks stored in database
- [x] Week 4 — AI task breakdown with Gemini API
- [x] Week 5 — Glassmorphism redesign + draggable AI panel
- [x] Week 6 — Dashboard & analytics charts + deployed on Vercel

---

## Author

**G Sai Ashish**
- GitHub: [@SaiAshish1234](https://github.com/SaiAshish1234)
- LinkedIn: [sai-ashish](https://www.linkedin.com/in/sai-ashish-a496a3273)
- Email: saiashish236@gmail.com
- Portfolio: [your-portfolio.vercel.app](https://your-portfolio.vercel.app)

---

## License

MIT License — feel free to use this project as inspiration for your own work.
