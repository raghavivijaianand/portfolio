# Personal Portfolio Website (Task 1)

Stack: HTML/CSS/JS frontend, Node.js + Express backend, MongoDB database.

## Run locally
1. Install Node.js and MongoDB (or use a free MongoDB Atlas URI).
2. `cp .env.example .env` and set MONGO_URI
3. `npm install`
4. `npm start` then open http://localhost:3000

## API
- GET/POST /api/projects, PUT/DELETE /api/projects/:id
- POST /api/contact

## Deploy (Render / Heroku)
Push to GitHub, create a Web Service, set build `npm install`, start `npm start`,
and add MONGO_URI (MongoDB Atlas) as an environment variable.
Netlify/Vercel host only static files, so use Render or Heroku for this full-stack app.
