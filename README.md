# Interview Prep

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=nextdotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-Python-000000?logo=flask&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Drizzle_ORM-4169E1?logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)

A mock-interview platform with a webcam-based session UI, an in-browser code editor with real code execution, and backend services for resume parsing and speech-to-text.

## Overview

Interview Prep simulates a technical interview: candidates join a session with a live webcam feed, answer audio-delivered questions, and solve coding problems in an in-browser Monaco editor that compiles and runs against a real judge. The system is split into three services (a Next.js frontend, an Express/TypeScript API, and a Python microservice), connected through Docker Compose and deployed via a path-aware GitHub Actions pipeline.

The project is under active development. Authentication, speech-to-text, and code execution are wired end-to-end. The Flask service also exposes a working resume-parsing endpoint, though the frontend doesn't call it yet. The AI interview-question generation endpoint exists but is currently disabled server-side, so the interview session flow still runs on mock question data on the frontend while that integration is finished.

## Features

- **JWT authentication**: signup/login with bcrypt password hashing, rate-limited login attempts, and token verification middleware (Express + Drizzle/Postgres)
- **In-browser code execution**: Monaco-based editor supporting multiple languages, compiled and run remotely via the Judge0 API
- **Resume parsing**: a dedicated Flask endpoint extracts text from PDF and DOCX resumes (PyMuPDF / python-docx); not yet called from the frontend
- **Speech-to-text transcription**: audio responses transcribed with OpenAI Whisper on the Python service
- **Webcam-enabled interview UI**: a video-call-style interface (`getUserMedia`) with an audio question player, progress tracking, and a dashboard/analytics shell
- **Dockerized deployment**: `docker-compose.yml` orchestrates the Express server and a Postgres 14 database, with a CI/CD pipeline that path-filters changes and ships the server to Heroku on merge to `main`

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15, React 19, TypeScript, Tailwind CSS 4, Radix UI, Monaco Editor |
| API server | Express 5, TypeScript, Drizzle ORM, PostgreSQL, JWT, bcrypt |
| AI/microservice | Python, Flask, OpenAI Whisper, PyMuPDF, python-docx |
| Infra | Docker & Docker Compose, GitHub Actions, Heroku (server) |

## How It Works

The Express API doesn't do AI/media work itself: it proxies code-compile requests to Judge0, keeping that API key off the client. The Next.js client talks to the Python service directly for audio transcription (and would for resume parsing), via a `next.config.ts` rewrite that forwards `/api/*` to the Flask server. Drizzle ORM manages the Postgres schema (`users`, `profiles`, interview-type/style/difficulty enums) and is pushed to the database with `drizzle-kit`. The GitHub Actions workflow uses `dorny/paths-filter` so it only rebuilds and redeploys the services actually touched by a given push.

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.8+
- Docker & Docker Compose
- PostgreSQL (or use the bundled Docker container)

### Clone

```bash
git clone https://github.com/DharambirAgrawal/interviewprep.git
cd interviewprep
```

### Run with Docker

```bash
docker-compose up --build
```

This starts the Express server (`:8080`) and a Postgres 14 database. The client and Python service currently run separately (see below).

### Run manually

**Client** (Next.js, port 3000)

```bash
cd client
npm install
npm run dev
```

**Server** (Express, port 8080 by default)

```bash
cd server
npm install
npm run dev        # ts-node-dev
npm run db:push    # push the Drizzle schema to Postgres
```

**Python service** (Flask, port 5328)

```bash
cd python-server
pip install -r requirements.txt
python api/index.py
```

`requirements.txt` currently has `python-docx`, `python-dotenv`, and `openai-whisper` commented out even though `api/index.py` imports all three. Uncomment them (or `pip install python-docx python-dotenv openai-whisper` separately) before running the service.

### Environment variables

Each service reads its own `.env` file. None are committed, so create them locally:

- `client/.env`: `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_PYTHON_API_URL`
- `server/.env`: `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `JWT_SECRET`, `TOKEN_EXPIRY`, `PYTHON_API_URL`, `PYTHON_API_SECRET`, `JUDGE0_API_KEY`, `JUDGE0_API_URL`
- `python-server/.env`: `SOME_SECRET` and any AI/ML API keys the enabled features need

## Usage

1. Start Postgres, the Express server, and the Python service.
2. Run the client and sign up for an account (`/auth/signup`).
3. From the dashboard, start an interview session to reach the webcam/audio session UI.
4. Use the in-browser editor for coding questions. Submissions are compiled and executed through the Judge0 proxy at `POST /api/service/code-compile`.

## Project Structure

```
interviewprep/
├── client/          # Next.js frontend (App Router, auth, dashboard, interview UI)
├── server/          # Express + TypeScript API (auth, profiles, service proxy)
├── python-server/   # Flask service (resume parsing, Whisper transcription)
├── docker-compose.yml
└── .github/workflows/ci-cd.yml
```
