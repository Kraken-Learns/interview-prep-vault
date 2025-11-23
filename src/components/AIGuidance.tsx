import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Settings, X, ThumbsUp, ThumbsDown, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
// @ts-ignore
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// @ts-ignore
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { AIService } from '@/lib/ai-service';
import { logger } from '@/lib/logger';
import type { Problem, AIConfig, ChatMessage } from '@/types';

interface AIGuidanceProps {
    problem: Problem;
    userCode: string;
    language: string;
    onClose: () => void;
}

const AIGuidance: React.FC<AIGuidanceProps> = ({ problem, userCode, language, onClose }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [config, setConfig] = useState<AIConfig | null>(null);
    const [showSettings, setShowSettings] = useState(false);
    const [apiKeyInput, setApiKeyInput] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<'positive' | 'negative' | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const sessionId = useRef(crypto.randomUUID());

    useEffect(() => {
        const storedConfig = localStorage.getItem('ai_config');
        if (storedConfig) {
            setConfig(JSON.parse(storedConfig));
        } else {
            setShowSettings(true);
        }
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSaveConfig = async () => {
        setIsLoading(true);
        setError(null);
        const trimmedKey = apiKeyInput.trim();

        if (!trimmedKey) {
            setError('Please enter an API key');
            setIsLoading(false);
            return;
        }

        try {
            await AIService.getProvider({
                provider: 'google',
                apiKey: trimmedKey,
                model: 'gemini-2.5-flash'
            }).validateApiKey(trimmedKey);

            const newConfig: AIConfig = {
                provider: 'google',
                apiKey: trimmedKey,
                model: 'gemini-2.5-flash'
            };
            setConfig(newConfig);
            localStorage.setItem('ai_config', JSON.stringify(newConfig));
            setShowSettings(false);
        } catch (e: any) {
            setError(e.message || 'Failed to validate API Key.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendMessage = async () => {
        if (!input.trim() || !config) return;

        const newUserMessage: ChatMessage = {
            role: 'user',
            content: input,
            timestamp: Date.now()
        };

        setMessages(prev => [...prev, newUserMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const provider = AIService.getProvider(config);
            const response = await provider.generateResponse(
                [...messages, newUserMessage],
                { problem, userCode, language }
            );

            const newBotMessage: ChatMessage = {
                role: 'model',
                content: response,
                timestamp: Date.now()
            };

            setMessages(prev => [...prev, newBotMessage]);

            // Log session update
            logger.saveSession({
                id: sessionId.current,
                problemSlug: problem.slug,
                language,
                messages: [...messages, newUserMessage, newBotMessage],
                userCode,
                timestamp: Date.now()
            });

        } catch (e) {
            console.error(e);
            setMessages(prev => [...prev, {
                role: 'model',
                content: 'Sorry, I encountered an error. Please try again.',
                timestamp: Date.now()
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFeedback = (type: 'positive' | 'negative') => {
        setFeedback(type);
        logger.saveSession({
            id: sessionId.current,
            problemSlug: problem.slug,
            language,
            messages,
            userCode,
            feedback: type,
            timestamp: Date.now()
        });
    };

    if (showSettings) {
        return (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-300">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-blue-100 rounded-xl">
                            <Bot className="w-6 h-6 text-blue-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">AI Setup</h2>
                    </div>

                    <p className="text-slate-600 mb-6">
                        To use the AI guidance feature, please enter your Google Gemini API Key.
                        It will be stored locally on your device.
                    </p>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Gemini API Key</label>
                            <input
                                type="password"
                                value={apiKeyInput}
                                onChange={(e) => setApiKeyInput(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="Enter your API key..."
                            />
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                                <AlertCircle className="w-4 h-4" />
                                {error}
                            </div>
                        )}

                        <div className="flex gap-3 pt-4">
                            <button
                                onClick={onClose}
                                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveConfig}
                                disabled={isLoading || !apiKeyInput}
                                className="flex-1 px-4 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                            >
                                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Connect'}
                            </button>
                        </div>

                        <p className="text-xs text-center text-slate-400 mt-4">
                            Don't have a key? <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Get one here</a>
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Flyout Panel */}
            <div
                className="fixed inset-y-0 right-0 w-full md:w-[500px] bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300 border-l border-slate-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                            <Sparkles className="w-5 h-5 text-purple-500" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900">AI Guidance</h3>
                            <p className="text-xs text-slate-500">Powered by Gemini 2.5 Flash</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowSettings(true)}
                            className="p-2 hover:bg-white/50 rounded-lg transition-colors text-slate-500 hover:text-slate-700"
                            title="Settings"
                        >
                            <Settings className="w-5 h-5" />
                        </button>
                        <button
                            onClick={onClose}
                            className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-red-100 rounded-lg transition-all text-slate-700 hover:text-red-700 border border-slate-300 hover:border-red-300 shadow-sm hover:shadow-md font-medium"
                            title="Close AI Guidance"
                        >
                            <X className="w-5 h-5" />
                            <span className="text-sm">Close</span>
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
                    {messages.length === 0 && (
                        <div className="text-center py-10 px-6">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Bot className="w-8 h-8 text-blue-600" />
                            </div>
                            <h4 className="text-lg font-bold text-slate-900 mb-2">How can I help?</h4>
                            <p className="text-slate-600 text-sm mb-6">
                                I can help you understand the problem, debug your code, or give you hints without spoiling the solution.
                            </p>
                            <div className="grid grid-cols-1 gap-2">
                                <button
                                    onClick={() => { setInput("Can you give me a hint?"); handleSendMessage(); }}
                                    className="text-sm text-left p-3 bg-white border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all"
                                >
                                    💡 Can you give me a hint?
                                </button>
                                <button
                                    onClick={() => { setInput("What's wrong with my code?"); handleSendMessage(); }}
                                    className="text-sm text-left p-3 bg-white border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all"
                                >
                                    🐛 What's wrong with my code?
                                </button>
                                <button
                                    onClick={() => { setInput("Explain the time complexity."); handleSendMessage(); }}
                                    className="text-sm text-left p-3 bg-white border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all"
                                >
                                    ⚡ Explain the time complexity
                                </button>
                            </div>
                        </div>
                    )}

                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-slate-200' : 'bg-blue-600'
                                }`}>
                                {msg.role === 'user' ? <User className="w-4 h-4 text-slate-600" /> : <Bot className="w-4 h-4 text-white" />}
                            </div>
                            <div className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${msg.role === 'user'
                                ? 'bg-white text-slate-800 border border-slate-200 rounded-tr-none'
                                : 'bg-white text-slate-800 border border-blue-100 rounded-tl-none'
                                }`}>
                                <div className="prose prose-sm max-w-none prose-slate">
                                    <ReactMarkdown
                                        components={{
                                            code({ node, inline, className, children, ...props }: any) {
                                                const match = /language-(\w+)/.exec(className || '')
                                                return !inline && match ? (
                                                    <SyntaxHighlighter
                                                        {...props}
                                                        style={vscDarkPlus}
                                                        language={match[1]}
                                                        PreTag="div"
                                                    >
                                                        {String(children).replace(/\n$/, '')}
                                                    </SyntaxHighlighter>
                                                ) : (
                                                    <code {...props} className={className}>
                                                        {children}
                                                    </code>
                                                )
                                            }
                                        }}
                                    >
                                        {msg.content}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                                <Bot className="w-4 h-4 text-white" />
                            </div>
                            <div className="bg-white border border-blue-100 rounded-2xl p-4 rounded-tl-none shadow-sm flex items-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                                <span className="text-sm text-slate-500">Thinking...</span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Feedback (only show if messages exist) */}
                {messages.length > 0 && (
                    <div className="px-6 py-2 bg-slate-50 flex justify-center border-t border-slate-100">
                        {!feedback ? (
                            <div className="flex items-center gap-4 text-xs text-slate-500">
                                <span>Was this helpful?</span>
                                <div className="flex gap-2">
                                    <button onClick={() => handleFeedback('positive')} className="p-1 hover:bg-slate-200 rounded transition-colors"><ThumbsUp className="w-4 h-4" /></button>
                                    <button onClick={() => handleFeedback('negative')} className="p-1 hover:bg-slate-200 rounded transition-colors"><ThumbsDown className="w-4 h-4" /></button>
                                </div>
                            </div>
                        ) : (
                            <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                                <Sparkles className="w-3 h-3" /> Thanks for your feedback!
                            </span>
                        )}
                    </div>
                )}

                {/* Input */}
                <div className="p-4 border-t border-slate-200 bg-white">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                            placeholder="Ask a follow-up question..."
                            disabled={isLoading}
                            className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all disabled:opacity-50"
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={isLoading || !input.trim()}
                            className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-200"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AIGuidance;

