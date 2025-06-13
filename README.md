# FusedChatbotNew Setup Guide

## Introduction
FusedChatbotNew is a full-stack chatbot application featuring a React frontend, a Node.js backend, and a Python-based AI core service for handling language model interactions and vector-based document search. This guide provides all the necessary steps to set up the development environment and run the project locally.

## Contents
1. [Prerequisites](#prerequisites)  
2. [Setup and Installation](#setup-and-installation)  
   2.1 [Step 1: Clone the Repository](#step-1-clone-the-repository)  
   2.2 [Step 2: Configure Environment Variables](#step-2-configure-environment-variables)  
   2.3 [Step 3: Install All Dependencies](#step-3-install-all-dependencies)  
      2.3.1 [Backend Dependencies (Node.js)](#backend-dependencies-nodejs)  
      2.3.2 [AI Core Service Dependencies (Python)](#ai-core-service-dependencies-python)  
      2.3.3 [Frontend Dependencies (React)](#frontend-dependencies-react)  
3. [Running the Application](#running-the-application)  
   3.1 [Terminal 1: Start the AI Core Service (Python)](#terminal-1-start-the-ai-core-service-python)  
   3.2 [Terminal 2: Start the Backend Server (Node.js)](#terminal-2-start-the-backend-server-nodejs)  
   3.3 [Terminal 3: Start the Frontend (React)](#terminal-3-start-the-frontend-react)  
4. [Accessing the Application](#accessing-the-application)  
5. [Key Features](#key-features)  
6. [Dependencies](#dependencies)  
7. [Demo Video](#demo-video)  

## Prerequisites
Before you begin, ensure you have the following installed on your system:
- Node.js (v16 or higher is recommended) and npm.
- Python (v3.9 or higher is recommended) and pip.
- Git.
- MongoDB Instance: The application requires a running MongoDB database. You can use a local installation (MongoDB Community Server) or a cloud-based service like MongoDB Atlas. You will need the connection string for the setup.

## Setup and Installation

### Step 1: Clone the Repository
First, clone the project from GitHub to your local machine.

bash
git clone <your-repository-url>
cd FusedChatbotNew


### Step 2: Configure Environment Variables
The backend server requires a .env file for database connection strings and secret keys. An example file is provided.

Navigate to the server directory:

bash
cd server


Create a .env file by copying the provided example:

bash
# On Linux/macOS
cp .env.example .env

# On Windows
copy .env.example .env


Open the newly created server/.env file with a text editor and fill in the required values:


DB_CONNECT=YOUR_MONGODB_CONNECTION_STRING_HERE
JWT_SECRET=CREATE_A_STRONG_RANDOM_SECRET_KEY
OPENAI_API_KEY=YOUR_OPENAI_API_KEY_HERE
# Add any other keys as needed


### Step 3: Install All Dependencies
The project is split into three parts, each with its own dependencies. You must install them all.

#### Backend Dependencies (Node.js)
Make sure you are in the server directory. (If you are in the project root, run cd server).

Install the required npm packages:

bash
npm install


#### AI Core Service Dependencies (Python)
Navigate to the ai_core_service directory from the server directory:

bash
cd ai_core_service


Create and activate a Python virtual environment. This isolates the project’s Python packages.

bash
# Create the virtual environment
python -m venv venv

# Activate the environment
# On Windows (PowerShell)
.\venv\Scripts\Activate.ps1

# On Windows (Command Prompt)
.\venv\Scripts\activate.bat

# On Linux/macOS
source venv/bin/activate


You will know the virtual environment is active when you see (venv) at the beginning of your command prompt.

With the virtual environment active, install the required Python packages:

bash
pip install -r requirements.txt


#### Frontend Dependencies (React)
Navigate to the client directory from the project’s root:

bash
# If you are in server/ai_core_service/, go back to the root first
cd ../../

# Now go to the client directory
cd client


Install the required npm packages:

bash
npm install


## Running the Application
To run the full application, you must start all three services concurrently. Open three separate terminal windows or tabs for this process.

### Terminal 1: Start the AI Core Service (Python)
Navigate to the server directory:

bash
cd path/to/FusedChatbotNew/server


Activate the Python virtual environment:

bash
# On Windows (PowerShell)
.\ai_core_service\venv\Scripts\Activate.ps1

# On Linux/macOS
source ai_core_service/venv/bin/activate


Start the AI service:

bash
python -m ai_core_service.app


The service will start, typically listening on http://127.0.0.1:8000. Keep this terminal running.

### Terminal 2: Start the Backend Server (Node.js)
In a new terminal, navigate to the server directory:

bash
cd path/to/FusedChatbotNew/server


Start the Node.js server:

bash
node server.js


The server will connect to MongoDB and start listening on a port, typically 5001. The console will show a message like "Server running on port 5001" and "MongoDB connected". Keep this terminal running.

### Terminal 3: Start the Frontend (React)
In a third terminal, navigate to the client directory:

bash
cd path/to/FusedChatbotNew/client


Start the React development server:

bash
npm start


This will automatically launch the application in your default web browser.

## Accessing the Application
Once all three services are running, the application will be available at:

[http://localhost:3000](http://localhost:3000)

You can now interact with the FusedChatbotNew application.

## Key Features
- *Voice Assistant:* Enables voice input and interaction with the chatbot.
- *Chat Delete:* Allows users to delete chat history.
- *Continue Chat:* Supports continuing previous chat sessions seamlessly.
- *PDF Support:* Upload and interact with PDF documents.
- *API Keys Load Balance:* Manages multiple API keys for load balancing requests.
- *Assistance Setting:* Customizable settings for chatbot assistance behavior.
- *Database Settings:* Configuration options for MongoDB connection and management.

## Dependencies
- *Backend:* Node.js with Express, MongoDB driver, JWT for authentication, and other middleware.
- *AI Core Service:* Python with packages for language model interaction, vector search, and API communication.
- *Frontend:* React with state management, UI components, and API integration.

## Demo Video
[![Demo Video](https://img.youtube.com/vi/your-video-id/0.jpg)](https://www.youtube.com/watch?v=your-video-id)

Click the image above to watch the demo video.

*(Replace your-video-id with the actual YouTube video ID of your project demo.)*
