// server/routes/chat.js
const express = require('express');
const axios = require('axios');
const { tempAuth } = require('../middleware/authMiddleware');
const ChatHistory = require('../models/ChatHistory');
const { v4: uuidv4 } = require('uuid');
// --- MODIFICATION START ---
const User = require('../models/User'); // To fetch user-specific API keys
const { decrypt } = require('../services/encryptionService'); // To decrypt the keys
// --- MODIFICATION END ---

const router = express.Router();

const PYTHON_AI_SERVICE_URL = process.env.PYTHON_AI_CORE_SERVICE_URL;
if (!PYTHON_AI_SERVICE_URL) {
    console.error("FATAL ERROR: PYTHON_AI_CORE_SERVICE_URL is not set. AI features will not work.");
}

router.post('/rag', tempAuth, async (req, res) => {
    console.warn(">>> WARNING: /api/chat/rag is deprecated. RAG is now handled by /api/chat/message.");
    return res.status(410).json({ message: "This RAG endpoint is deprecated. Please use the main chat message endpoint." });
});

router.post('/message', tempAuth, async (req, res) => {
    const {
        message,
        history,
        sessionId,
        systemPrompt,
        isRagEnabled,
        llmProvider,
        llmModelName,
        enableMultiQuery
    } = req.body;
    
    const userId = req.user._id.toString();

    if (!message || typeof message !== 'string' || message.trim() === '') {
        return res.status(400).json({ message: 'Message text required.' });
    }
    if (!sessionId || typeof sessionId !== 'string') {
        return res.status(400).json({ message: 'Session ID required.' });
    }
    if (!Array.isArray(history)) {
        return res.status(400).json({ message: 'Invalid history format.'});
    }

    try {
        // --- MODIFICATION START: Fetch and Decrypt User API Keys ---
        const user = await User.findById(userId).select('+geminiApiKey +grokApiKey');

        if (!user || !user.geminiApiKey || !user.grokApiKey) {
            console.error(`User ${userId} attempted to chat but API keys are missing from the database.`);
            return res.status(400).json({ message: "Your API keys are not configured correctly. Please sign out and sign back in to set them up." });
        }

        const decryptedGeminiKey = decrypt(user.geminiApiKey);
        const decryptedGrokKey = decrypt(user.grokApiKey);
        // --- MODIFICATION END ---


        if (!PYTHON_AI_SERVICE_URL) {
            console.error("Python AI Core Service URL is not configured in Node.js environment.");
            throw new Error("AI Service communication error.");
        }

        const performRagRequest = !!isRagEnabled;
        const selectedLlmProvider = llmProvider || process.env.DEFAULT_LLM_PROVIDER_NODE || 'groq_llama3';
        const selectedLlmModel = llmModelName || null;
        const useMultiQuery = enableMultiQuery === undefined ? true : !!enableMultiQuery;

        console.log(`>>> POST /api/chat/message: User=${userId}, Session=${sessionId}, RAG=${performRagRequest}, Provider=${selectedLlmProvider}`);

        const pythonPayload = {
            user_id: userId,
            query: message.trim(),
            chat_history: history,
            llm_provider: selectedLlmProvider,
            llm_model_name: selectedLlmModel,
            system_prompt: systemPrompt,
            perform_rag: performRagRequest,
            enable_multi_query: useMultiQuery,
            // --- MODIFICATION START: Add decrypted keys to the payload ---
            user_gemini_api_key: decryptedGeminiKey,
            user_grok_api_key: decryptedGrokKey,
            // --- MODIFICATION END ---
        };

        console.log(`   Calling Python AI Core Service at ${PYTHON_AI_SERVICE_URL}/generate_chat_response`);
        
        const pythonResponse = await axios.post(
            `${PYTHON_AI_SERVICE_URL}/generate_chat_response`,
            pythonPayload,
            { timeout: 60000 }
        );

        if (!pythonResponse.data || pythonResponse.data.status !== 'success') {
            console.error("   Error or unexpected response from Python AI Core Service:", pythonResponse.data);
            throw new Error(pythonResponse.data?.error || "Failed to get valid response from AI service.");
        }

        const { 
            llm_response: aiReplyText, 
            references: retrievedReferences,
            thinking_content: thinkingContent
        } = pythonResponse.data;

        const modelResponseMessage = {
            role: 'model',
            parts: [{ text: aiReplyText || "[No response text from AI]" }],
            timestamp: new Date(),
            references: retrievedReferences || [],
            thinking: thinkingContent || null
        };
        
        console.log(`<<< POST /api/chat/message successful for session ${sessionId}.`);
        res.status(200).json({ reply: modelResponseMessage });

    } catch (error) {
        console.error(`!!! Error processing chat message for session ${sessionId}:`, error.response?.data || error.message || error);
        let statusCode = error.response?.status || 500;
        let clientMessage = "Failed to get response from AI service.";

        if (error.response?.data?.error) {
            clientMessage = error.response.data.error;
        } else if (error.message) {
            clientMessage = error.message;
        }
        
        if (statusCode === 500 && clientMessage.toLowerCase().includes("python")) {
            clientMessage = "An internal error occurred while communicating with the AI service.";
        }

        res.status(statusCode).json({ message: clientMessage });
    }
});


// ... (The rest of the file remains unchanged) ...
// Chat History Routes
router.post('/history', tempAuth, async (req, res) => {
    const { sessionId, messages } = req.body;
    const userId = req.user._id;
    if (!sessionId) return res.status(400).json({ message: 'Session ID required to save history.' });
    if (!Array.isArray(messages)) return res.status(400).json({ message: 'Invalid messages format.' });

    try {
        const validMessages = messages.map(m => ({
            role: m.role,
            parts: m.parts,
            timestamp: m.timestamp,
            references: m.role === 'model' ? (m.references || []) : undefined,
            thinking: m.role === 'model' ? (m.thinking || null) : undefined,
        })).filter(m =>
            m && typeof m.role === 'string' &&
            Array.isArray(m.parts) && m.parts.length > 0 &&
            typeof m.parts[0].text === 'string' &&
            m.timestamp
        );

        const newSessionId = uuidv4();

        if (validMessages.length === 0) {
            console.log(`Session ${sessionId}: No valid messages to save. Client likely clearing history.`);
            return res.status(200).json({
                message: 'No history saved (empty or invalid messages). New session ID provided.',
                savedSessionId: null,
                newSessionId: newSessionId
            });
        }

        const savedHistory = await ChatHistory.findOneAndUpdate(
            { sessionId: sessionId, userId: userId },
            { $set: { userId: userId, sessionId: sessionId, messages: validMessages, updatedAt: Date.now() } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        
        console.log(`History saved/updated for session ${savedHistory.sessionId}. New session ID for client: ${newSessionId}`);
        res.status(200).json({
            message: 'Chat history saved successfully.',
            savedSessionId: savedHistory.sessionId,
            newSessionId: newSessionId
        });
    } catch (error) {
        console.error(`Error saving chat history for session ${sessionId}:`, error);
        res.status(500).json({ message: 'Failed to save chat history.' });
    }
});

router.get('/sessions', tempAuth, async (req, res) => {
    const userId = req.user._id;
    try {
        const sessions = await ChatHistory.find({ userId: userId })
            .sort({ updatedAt: -1 })
            .select('sessionId createdAt updatedAt messages')
            .lean();

        const sessionSummaries = sessions.map(session => {
            const firstUserMessage = session.messages?.find(m => m.role === 'user');
            let preview = 'Chat Session';
            if (firstUserMessage?.parts?.[0]?.text) {
                preview = firstUserMessage.parts[0].text.substring(0, 75);
                if (firstUserMessage.parts[0].text.length > 75) preview += '...';
            }
            return {
                sessionId: session.sessionId,
                createdAt: session.createdAt,
                updatedAt: session.updatedAt,
                messageCount: session.messages?.length || 0,
                preview: preview
            };
        });
        res.status(200).json(sessionSummaries);
    } catch (error) {
        console.error(`Error fetching chat sessions for user ${userId}:`, error);
        res.status(500).json({ message: 'Failed to retrieve chat sessions.' });
    }
});

router.get('/session/:sessionId', tempAuth, async (req, res) => {
    const userId = req.user._id;
    const { sessionId } = req.params;
    if (!sessionId) return res.status(400).json({ message: 'Session ID parameter is required.' });
    try {
        const session = await ChatHistory.findOne({ sessionId: sessionId, userId: userId }).lean();
        if (!session) return res.status(404).json({ message: 'Chat session not found or access denied.' });
        res.status(200).json(session);
    } catch (error) {
        console.error(`Error fetching chat session ${sessionId} for user ${userId}:`, error);
        res.status(500).json({ message: 'Failed to retrieve chat session details.' });
    }
});

module.exports = router;