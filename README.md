# Persona-Based AI Chatbot

Assignment 01 for Prompt Engineering at Scaler Academy. The app lets users chat with three respectful persona simulations based on public information about Anshuman Singh, Abhimanyu Saxena, and Kshitij Mishra.

## Features

- Three persona switcher tabs with conversation reset on switch
- Distinct backend system prompt for each persona
- Suggestion chips per persona
- Typing indicator during API calls
- Friendly API error messages
- Responsive Expo UI for web and mobile
- API key loaded from environment variables only

## Project Structure

```text
Backend/
  index.js       Express API and OpenAI call
  personas.js    Persona metadata and system prompts
Frontend/
  src/app/       Expo Router app screens
prompts.md       Annotated prompt decisions
reflection.md    Assignment reflection
```

## Setup

1. Install backend dependencies:

```bash
cd Backend
npm install
```

2. Create backend env:

```bash
cp .env.example .env
```

Set `OPENAI_API_KEY` in `Backend/.env`.

3. Start the backend:

```bash
npm start
```

4. Install frontend dependencies:

```bash
cd ../Frontend
npm install
```

5. Start the frontend:

```bash
npm run web
```

The frontend expects the API at `http://100.129.164.192:4000`. For deployment, set `EXPO_PUBLIC_API_URL` to the deployed backend URL.

## Deployment

- Backend: deploy `Backend/` to Railway, Render, Fly.io, or similar. Add `OPENAI_API_KEY`, `OPENAI_MODEL`, and `CLIENT_ORIGIN` as environment variables.
- Frontend: deploy `Frontend/` to Vercel/Netlify using Expo web export, or host it with any static site service. Set `EXPO_PUBLIC_API_URL` to the backend public URL.
- Live URL: add your deployed frontend link here before submission.

## Research Sources

- Scaler About page for founder backgrounds: https://www.scaler.com/about/
- InterviewBit/Scaler Academy overview: https://www.interviewbit.com/scaler-academy-review
- Scaler School of Technology pages for Kshitij Mishra and learn-by-building framing: https://www.scaler.com/school-of-technology/
- Kshitij Mishra public LinkedIn post snippet on AI & Business and technical depth: https://www.linkedin.com/posts/kshitij-mishra-a5779334_in-2017-i-joined-interviewbit-as-a-lead-activity-7434271548192018433-mqW2
- Abhimanyu Saxena public interview/article context: https://collegedunia.com/news/i-40960-interview-mr-abhimanyu-saxena-co-founder-at-scaler-and-interviewbit-karnataka

## Screenshots

Add screenshots after running or deploying the app:

- Desktop chat screen
- Mobile chat screen
- Persona switch reset behavior
