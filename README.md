# FusedChatbotNew

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

FusedChatbotNew is a full-stack conversational AI application that integrates a React frontend, Node.js backend, and a Python-based AI core service. It supports multi-LLM interactions, Retrieval Augmented Generation (RAG), document analysis, and user-friendly features like voice-to-text recognition and chat deletion. The application dynamically generates FAQs, topics, and mindmaps based on document size, providing a robust platform for interactive AI-driven conversations.

---

## ✨ Features

*   **Multi-LLM Support:** Choose from Gemini, Groq LLaMA 3, or Ollama-hosted models for chat interactions.
*   **Retrieval Augmented Generation (RAG):** Upload documents (PDF, DOCX, PPTX, TXT) to augment chat responses with relevant context, including multi-query RAG for improved recall.
*   **Document Analysis:**
    *   **FAQ Generation:** Automatically extracts FAQs based on document content, scaling with document size.
    *   **Topic Identification:** Identifies key topics with explanations, dynamically adjusted by document length.
    *   **Mindmap Generation:** Creates hierarchical mindmaps using Mermaid for visualizing document structure.
*   **Chain-of-Thought (CoT):** Displays the AI's reasoning process for transparency in responses.
*   **User Management:** Supports user signup, signin, and session management.
*   **File Management:** Upload, list, rename, and delete user-specific documents.
*   **Chat History:** Save and retrieve chat sessions with RAG references and CoT.
*   **Voice-to-Text Recognition:** Convert spoken input into text for hands-free interaction.
*   **Chat Deletion:** Delete chat sessions for privacy and clutter management.
*   **Enhanced UI:** Modern, intuitive interface for a seamless user experience.
*   ### Tool Featues
*   Web PDF Downloader: Search and download PDFs from the internet using keywords.
*   Academic Search: Find academic papers from sources like OpenAlex and Google Scholar.
*   Markdown to PPTX: Convert structured Markdown into a PowerPoint presentation.
*   Markdown to DOCX: Create a Word document from selected parts of Markdown content.
*   OCR Tool: Extract text from PDF files using Tesseract or Nougat OCR engines.
*   YouTube Downloader: Download video or audio from YouTube in chosen quality.

---

## 🏗️ Architecture

This project uses a scalable **microservice-oriented architecture** to separate concerns and improve maintainability.

`[React Frontend]` ↔️ `[Node.js Backend (Orchestrator)]` ↔️ `[Python AI Service (AI Core)]`

*   **React Frontend:** A modern, dynamic user interface.
*   **Node.js Backend:** Acts as an orchestrator and API gateway. It handles user authentication, session management, and file operations. It does **not** contain heavy AI logic.
*   **Python AI Service:** A dedicated service for all specialized AI tasks, including RAG, vector database management (FAISS), and all communication with LLMs (Gemini, Groq, Ollama).

---

## 🛠️ Tech Stack

*   **Frontend:** React, Axios
*   **Backend (Orchestrator):** Node.js, Express.js
*   **AI Service:** Python, Flask
*   **Database:** MongoDB with Mongoose
*   **AI & ML:**
    *   **LLMs:** Google Gemini, Groq, Ollama
    *   **Vector Database:** FAISS (Facebook AI Similarity Search)
    *   **Embeddings:** Sentence-Transformers
*   **Authentication:** JWT (JSON Web Tokens), bcrypt.js
*   **Deployment:** Docker (Optional but Recommended)

---

## ✅ Prerequisites

*   **Node.js:** v16 or higher with `npm`.
*   **Python:** v3.9 or higher with `pip`.
*   **Git:** For cloning the repository.
*   **MongoDB:** A running instance (local MongoDB Community Server or a free MongoDB Atlas cluster).
*   **(Optional) Ollama:** Installed and running for local LLM support.

---

## 🚀 Getting Started

## ⚙️ Setup and Installation

Follow these steps to set up and run the FusedChatbotNew project locally.

### Step 1: Clone the Repository

Clone the project from GitHub and navigate to the project directory:

```bash
git clone <your-repository-url>
cd FusedChatbotNew
```
---

## Step 2: Configure Environment Variables

### Backend (Node.js)

Navigate to the `server` directory and create a `.env` file by copying the example file.
Navigate to the `server/ai_core_service` directory and create a `.env` file by copying the example file.

```bash
cd server

# For Linux/macOS
cp .env.example .env

# For Windows
copy .env.example .env

```

---

## Step 3: Install Dependencies

### Backend (Node.js)

In the `server` directory, install the required Node.js dependencies:

```bash
cd server
npm install

```

---
