# Meeting Action Agent

Mini workspace app to extract meeting action items.

## Features

- Paste meeting transcript
- Automatically extract action items (task, owner, due date when available)
- Add / Edit / Delete actions
- Mark actions as done
- Last 5 transcript history
- Backend / Database / LLM status panel

## Tech Stack

Frontend:
- React + Vite
- TailwindCSS

Backend:
- Node.js
- Express
- MongoDB Atlas
- OpenAI API

## How to Run Locally

### Backend

```bash
cd server
npm install
nodemon index.js

Create .env:
OPENAI_API_KEY=your_key_here
MONGO_URI=your_mongo_uri

Backend runs on:
http://localhost:8000

Frontend
cd client
npm install
npm run dev

Runs on:
http://localhost:5173

```
