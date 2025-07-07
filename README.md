# Dental Practice Reservation & Triage App

This repository contains a basic web application for booking dental appointments and triaging patient reasons using Abundly agents.

## Structure

- **client/** – static HTML, CSS and JavaScript for the booking form
- **server/** – Express server providing API endpoints

## Setup

1. Install dependencies:
   ```bash
   cd server && npm install
   ```
2. Copy the example environment file and add your Abundly API key:
   ```bash
   cp .env.example .env
   # edit .env and fill ABUNDLY_API_KEY
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. Open `client/index.html` in your browser. Ensure the server is running on `http://localhost:3001`.

The server exposes:
- `POST /api/appointment`
- `POST /api/triage`
- `POST /api/suggestions`
- `/dashboard` – simple dashboard listing appointments

CORS is enabled for local development.

![screenshot](client/images/screenshot.png)
