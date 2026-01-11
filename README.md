AI Flow Assistant

A simple MERN stack application that lets users type a prompt, run it through an AI, and visualize the input and output in a flow chart. The app also allows saving prompts and AI responses to MongoDB.

Features

React Flow Visualization: Connect input and output nodes with an edge.

AI Integration: Sends user prompts to OpenRouter API and displays AI responses.

MongoDB Storage: Save prompts and answers for later reference.

Run & Save: Simple buttons to execute the flow and persist data.

Responsive UI: Works on desktop and mobile screens.

Tech Stack

Frontend: React, React Flow, CSS

Backend: Node.js, Express.js

Database: MongoDB

AI API: OpenRouter (Free Models: Mistral 7B Instruct, Gemini 2.0 Lite)

Getting Started

Clone the repository

git clone https://github.com/nainahjais777/ai-flow-assistant.git
cd ai-flow-assistant



Install dependencies

# Frontend
cd frontend
npm install

# Backend
cd backend
npm install


Create .env file in backend

PORT=5000
MONGO_URI=<your-mongodb-uri>
OPENROUTER_API_KEY=<your-openrouter-api-key>


Run the app

# Backend
cd backend
nodemon server.js

# Frontend
cd frontend
npm start


Open in browser: http://localhost:3000

Usage

Type a prompt in the Input Prompt node.

Click Run Flow to get the AI response in the AI Response node.

Click Save to DB to store the prompt and response in MongoDB.

Project Structure
frontend/
  ├─ src/
  │  ├─ components/
  │  │  ├─ Header.js
  │  │  └─ Canvas.js
  │  └─ App.js
backend/
  ├─ models/
  │  └─ Prompt.js
  ├─ db.js
  └─ server.js

# Screenshots

Input Prompt and AI Response nodes visualized using React Flow:

[1](frontend/src/screenshots/ai-flow_1.png)
[2](frontend/src/screenshots/ai-flow_2.png)
[3](frontend/src/screenshots/ai-flow_3.png)

# Data Folder

All AI prompts and responses are stored in `data/ai-flow.prompts.json`.