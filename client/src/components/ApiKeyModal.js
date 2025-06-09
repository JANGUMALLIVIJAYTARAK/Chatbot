import React, { useState } from 'react';
import './ApiKeyModal.css';

const ApiKeyModal = ({ onSave, username }) => {
    const [geminiApiKey, setGeminiApiKey] = useState('');
    const [grokApiKey, setGrokApiKey] = useState('');
    const [error, setError] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!geminiApiKey || !grokApiKey) {
            setError('Please provide both API keys to continue.');
            return;
        }
        setError('');
        setIsSaving(true);

        try {
            await onSave({ geminiApiKey, grokApiKey });
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred while saving the keys.');
            setIsSaving(false);
        }
    };

    return (
        <div className="api-key-modal-backdrop">
            <div className="api-key-modal-content">
                <h2>Welcome, {username}!</h2>
                <p>To use this application, please provide your own API keys. This is a one-time setup.</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        {/* --- MODIFICATION START --- */}
                        <label htmlFor="gemini-key">
                            Gemini API Key
                            <a 
                                href="https://aistudio.google.com/app/apikey" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="get-key-link"
                            >
                                (Get Key here)
                            </a>
                        </label>
                        {/* --- MODIFICATION END --- */}
                        <input
                            id="gemini-key"
                            type="password"
                            value={geminiApiKey}
                            onChange={(e) => setGeminiApiKey(e.target.value)}
                            placeholder="Enter your Gemini API Key"
                            required
                        />
                    </div>
                    <div className="form-group">
                        {/* --- MODIFICATION START --- */}
                        <label htmlFor="grok-key">
                            Grok API Key
                            <a 
                                href="https://console.groq.com/keys" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="get-key-link"
                            >
                                (Get Key here)
                            </a>
                        </label>
                        {/* --- MODIFICATION END --- */}
                        <input
                            id="grok-key"
                            type="password"
                            value={grokApiKey}
                            onChange={(e) => setGrokApiKey(e.target.value)}
                            placeholder="Enter your Grok API Key"
                            required
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="save-keys-button" disabled={isSaving}>
                        {isSaving ? 'Saving...' : 'Save and Continue'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ApiKeyModal;