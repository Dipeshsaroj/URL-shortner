# URLShort

A simple Node.js URL shortener built with Express, MongoDB, and EJS.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the app:
   ```bash
   npm start
   ```
3. Open the app in your browser at `http://localhost:8000`

## Features

- Create short URLs
- Redirect from `http://localhost:8000/url/:shortId`
- Analytics endpoint at `GET /url/analytics/:shortId`
