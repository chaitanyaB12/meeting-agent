# Meeting Action Agent

A full-stack AI powered web app that extracts action items from meeting transcripts and lets users manage tasks in a simple workspace.

## Features

- Paste meeting transcript
- Automatically extract action items (task + owner)
- Manual CRUD:
  - Add actions
  - Edit actions
  - Delete actions
  - Mark actions as done
- View last 5 processed transcripts
- Status panel for:
  - Backend
  - Database
  - LLM
- Dark UI
- Graceful handling when backend is down

---

## Tech Stack

Frontend:
- React
- Tailwind CSS
- Axios

Backend:
- Node.js
- Express
- MongoDB (Mongoose)
- OpenAI API

---

## How To Run

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