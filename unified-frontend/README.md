# Unified AI Demos Frontend

This is a unified React frontend for all AI demo projects. It provides a tabbed interface to access:
- Chatbot
- Predictive Analytics Dashboard
- Medical Image Classifier
- MLOps Pipeline

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Production (Docker Compose)

- The frontend is served via Nginx in the Docker Compose setup.
- To build and run all services:
  ```bash
  docker-compose up --build
  ```
- The unified UI will be available at [http://localhost:3000](http://localhost:3000).

## Usage
- Select a project tab to access its demo UI.
- Each tab connects to its respective backend API (on a different port). 