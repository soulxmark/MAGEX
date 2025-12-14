# MAGEX — Visions & Vignettes

This repository contains a small static website. A tiny Node static server (`server.js`) is included so you can run the site locally with Node without installing extra packages.

Quick start (Windows cmd.exe):

```cmd
cd "d:\programming\Full Projects\Vision & Vignettes\MAGEX"
node server.js
```

Then open http://localhost:3000 in your browser.

You can also use `npm start` if you prefer:

```cmd
npm install   # optional, no deps required, but safe
npm start
```

Notes
- The server is intentionally dependency-free. If you want an Express-based server or a dev workflow with hot-reload, tell me and I will add it.
- To change the port set the `PORT` environment variable before running, e.g. `set PORT=8080 && node server.js`.

MongoDB integration
- An Express + Mongoose server is provided in `server-express.js` with basic API endpoints:
	- POST `/api/contact` — save a contact message (body: `{name,email,message}`)
	- GET `/api/portfolio` — list portfolio items
	- POST `/api/portfolio` — add a portfolio item (body: `{title,description,image}`)

Setup with MongoDB (recommended):

1. Copy `.env.example` to `.env` and set `MONGODB_URI` to your MongoDB connection string.

```cmd
cd "d:\programming\Full Projects\Vision & Vignettes\MAGEX"
npm install
npm start
```

This runs `server-express.js` which serves static assets and exposes the small API.

If you want to run the minimal static-only server instead (no dependencies):

```cmd
node server.js
```

