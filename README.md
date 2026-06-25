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

## Technologies

- Node.js
- Express
- MongoDB / Mongoose
- EJS templates
- shortid for URL tokens

## Available Routes

- `POST /url` — create a new short URL
- `GET /url/:shortId` — redirect to the original URL
- `GET /url/analytics/:shortId` — fetch click analytics

## Features

- Create short URLs
- Use a custom alias for shortened links
- Set optional expiration dates for links
- Redirect visitors using generated short links
- Track visit history for analytics
- View saved URLs from the homepage
