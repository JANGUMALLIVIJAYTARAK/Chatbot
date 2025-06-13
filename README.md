FusedChatbotNew
FusedChatbotNew is a full-stack conversational AI application that integrates a React frontend, Node.js backend, and a Python-based AI core service. It supports multi-LLM interactions, Retrieval Augmented Generation (RAG), document analysis, and user-friendly features like voice-to-text recognition and chat deletion. The application dynamically generates FAQs, topics, and mindmaps based on document size, providing a robust platform for interactive AI-driven conversations.
Features

Multi-LLM Support: Choose from Gemini, Groq LLaMA 3, or Ollama-hosted models for chat interactions.
Retrieval Augmented Generation (RAG): Upload documents (PDF, DOCX, PPTX, TXT) to augment chat responses with relevant context, including multi-query RAG for improved recall.
Document Analysis:
FAQ Generation: Automatically extracts FAQs based on document content, scaling with document size.
Topic Identification: Identifies key topics with explanations, dynamically adjusted by document length.
Mindmap Generation: Creates hierarchical mindmaps using Mermaid for visualizing document structure.


Chain-of-Thought (CoT): Displays the AI's reasoning process for transparency in responses.
User Management: Supports user signup, signin, and session management.
File Management: Upload, list, rename, and delete user-specific documents.
Chat History: Save and retrieve chat sessions with RAG references and CoT.
Voice-to-Text Recognition: Convert spoken input into text for hands-free interaction.
Chat Deletion: Delete chat sessions for privacy and clutter management.
Enhanced UI: Modern, intuitive interface for seamless user experience.

Prerequisites

Node.js: v16 or higher with npm.
Python: v3.9 or higher with pip.
Git: For cloning the repository.
MongoDB: A running instance (local MongoDB Community Server or MongoDB Atlas).
Optional: Ollama installed for local LLM support.

Setup and Installation
Step 1: Clone the Repository
Clone the project from GitHub and navigate to the project directory:
git clone <your-repository-url>
cd FusedChatbotNew

Step 2: Configure Environment Variables
Backend (Node.js)
Navigate to the server directory and create a .env file by copying the example:
cd server
# Linux/macOS
cp .env.example .env
# Windows
copy .env.example .env

Edit server/.env with your configuration:
DB_CONNECT=<YOUR_MONGODB_CONNECTION_STRING>
JWT_KEY=<YOUR_OPENAI_API_KEY>
PYTHON_AI_CORE_SERVICE_URL=http://localhost:8000
PORT=5001
GEMINI_API_KEY=<YOUR_GEMINI_API_KEY>
GROQ_API_KEY=<YOUR_GROQ_API_KEY>

AI Core Service (Python)
Navigate to the ai_core_service directory and create a .env file:
cd server/ai_core_service
# Linux/macOS
cp .env.example .env
# Windows
copy .env.example .env

Edit server/ai_core_service/.env:
GEMINI_API_KEY=<YOUR_GEMINI_API_KEY>
GROQ_API_KEY=<YOUR_GROQ_API_KEY>
OLLAMA_BASE_URL=http://localhost:11434
DEFAULT_OLLAMA_MODEL=llama3

Step 3: Install Dependencies
Backend (Node.js)
In the server directory, install Node.js dependencies:
cd server
npm install

AI Core Service (Python)
Navigate to the ai_core_service directory, create a virtual environment, and install Python dependencies:
cd server/ai_core_service
python -m venv venv
# Activate virtual environment
# Windows (PowerShell)
.\venv\Scripts\Activate.ps1
# Windows (Command Prompt)
.\venv\Scripts\activate.bat
# Linux/macOS
source venv/bin/activate
pip install -r requirements.txt

Frontend (React)
Navigate to the client directory and install React dependencies:
cd ../../client
npm install

Running the Application
Run the three services in separate terminal windows.
Terminal 1: AI Core Service (Python)
cd path/to/FusedChatbotNew/server
# Activate virtual environment
# Windows (PowerShell)
.\ai_core_service\venv\Scripts\Activate.ps1
# Linux/macOS
source ai_core_service/venv/bin/activate
python -m ai_core_service.app

The service runs on http://127.0.0.1:8000.
Terminal 2: Backend Server (Node.js)
cd path/to/FusedChatbotNew/server
node server.js

The server runs on http://localhost:5001.
Terminal 3: Frontend (React)
cd path/to/FusedChatbotNew/client
npm start

The frontend opens at http://localhost:3000.
Accessing the Application
Visit http://localhost:3000 in your browser to interact with FusedChatbotNew.
Contributing

Fork the repository.
Create a feature branch (git checkout -b feature-name).
Commit changes (git commit -m 'Add feature').
Push to the branch (git push origin feature-name).
Open a pull request.

License
This project is licensed under the MIT License.
