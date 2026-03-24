# Job Portal Application

A complete full-stack job portal built with Node.js, Express, and React. Integrated with Adzuna API for real-time job listings in India.

## Features
- **Modern UI**: Sleek, glassmorphism design with responsive layout.
- **Job Search**: Search jobs by keyword and location (Adzuna API).
- **Authentication**: Register and Login functionality.
- **Application Tracking**: Apply for jobs and track them in "My Applications".
- **Real-time Data**: Storage using JSON files (no external DB setup required).

## How to Run

### 1. Start the Backend Server
Open a terminal and run:
```bash
npm install
node server.js
```
The server will run on [http://localhost:3000](http://localhost:3000).

### 2. Start the Frontend Application
Open another terminal:
```bash
cd frontend
npm install
npm run dev
```
The application will be available at [http://localhost:5173](http://localhost:5173).

## API Configuration
- **Adzuna API**: Already configured in `server.js`.
- **Backend Port**: 3000
- **Frontend Port**: 5173

## Tech Stack
- **Backend**: Node.js, Express, node-fetch, CORS.
- **Frontend**: React, Vite, Lucide React, React Router.
- **Styling**: Vanilla CSS (Custom design system).
