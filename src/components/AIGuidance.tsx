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

    const handleSendMessage = async (text?: string) => {
        const messageText = text || input;
        if (!messageText.trim() || !config) return;

        const newUserMessage: ChatMessage = {
            role: 'user',
            content: messageText,
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
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
                <div className="bg-white dark:bg-dark-layer1 rounded-2xl p-8 max-w-md w-full shadow-2xl border border-black/5 dark:border-white/10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-primary/10 dark:bg-primary/20 rounded-xl">
                            <Bot className="w-6 h-6 text-primary" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">AI Setup</h2>
                    </div>

                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                        To use the AI guidance feature, please enter your Google Gemini API Key.
                        It will be stored locally on your device.
                    </p>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Gemini API Key</label>
                            <input
                                type="password"
                                value={apiKeyInput}
                                onChange={(e) => setApiKeyInput(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white outline-none transition-all placeholder-slate-400 dark:placeholder-slate-600"
                                placeholder="Enter your API key..."
                            />
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-500/10 p-3 rounded-lg border border-red-200 dark:border-red-500/20">
                                <AlertCircle className="w-4 h-4" />
                                {error}
                            </div>
                        )}

                        <div className="flex gap-3 pt-4">
                            <button
                                onClick={onClose}
                                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveConfig}
                                disabled={isLoading || !apiKeyInput}
                                className="flex-1 px-4 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-glow"
                            >
                                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Connect'}
                            </button>
                        </div>

                        <p className="text-xs text-center text-slate-500 mt-4">
                            Don't have a key? <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-primary hover:text-primary-light hover:underline">Get one here</a>
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
                className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40 animate-fade-in"
                onClick={onClose}
            />

            {/* Flyout Panel */}
            <div
                className="fixed inset-y-0 right-0 w-full md:w-[500px] bg-white dark:bg-dark-layer1 shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300 border-l border-black/5 dark:border-white/10"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-6 border-b border-black/5 dark:border-white/5 flex items-center justify-between bg-slate-50 dark:bg-dark-layer2">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg shadow-glow">
                            <Sparkles className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 dark:text-white">AI Guidance</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Powered by Gemini 2.5 Flash</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowSettings(true)}
                            className="p-2 hover:bg-slate-200 dark:hover:bg-white/5 rounded-lg transition-colors text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                            title="Settings"
                        >
                            <Settings className="w-5 h-5" />
                        </button>
                        <button
                            onClick={onClose}
                            className="flex items-center gap-2 px-3 py-2 bg-slate-200 dark:bg-white/5 hover:bg-red-100 dark:hover:bg-red-500/10 rounded-lg transition-all text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 border border-transparent hover:border-red-200 dark:hover:border-red-500/20 font-medium"
                            title="Close AI Guidance"
                        >
                            <X className="w-5 h-5" />
                            <span className="text-sm">Close</span>
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50 dark:bg-dark-bg custom-scrollbar">
                    {messages.length === 0 && (
                        <div className="text-center py-10 px-6">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
                                <Bot className="w-8 h-8 text-primary" />
                            </div>
                            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">How can I help?</h4>
                            <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
                                I can help you understand the problem, debug your code, or give you hints without spoiling the solution.
                            </p>
                            <div className="grid grid-cols-1 gap-2">
                                <button
                                    onClick={() => handleSendMessage("Can you give me a hint?")}
                                    className="text-sm text-left p-3 bg-white dark:bg-dark-layer1 border border-black/5 dark:border-white/5 rounded-xl hover:border-primary/50 hover:shadow-glow transition-all text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white"
                                >
                                    💡 Can you give me a hint?
                                </button>
                                <button
                                    onClick={() => handleSendMessage("Please review my solution for correctness and time complexity.")}
                                    className="text-sm text-left p-3 bg-white dark:bg-dark-layer1 border border-black/5 dark:border-white/5 rounded-xl hover:border-primary/50 hover:shadow-glow transition-all text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white"
                                >
                                    ✅ Check my solution
                                </button>
                                <button
                                    onClick={() => handleSendMessage("What's wrong with my code?")}
                                    className="text-sm text-left p-3 bg-white dark:bg-dark-layer1 border border-black/5 dark:border-white/5 rounded-xl hover:border-primary/50 hover:shadow-glow transition-all text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white"
                                >
                                    🐛 What's wrong with my code?
                                </button>
                                <button
                                    onClick={() => handleSendMessage("Explain the time complexity.")}
                                    className="text-sm text-left p-3 bg-white dark:bg-dark-layer1 border border-black/5 dark:border-white/5 rounded-xl hover:border-primary/50 hover:shadow-glow transition-all text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white"
                                >
                                    ⚡ Explain the time complexity
                                </button>
                            </div>
                        </div>
                    )}

                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-fade-in`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-slate-200 dark:bg-slate-700' : 'bg-primary'
                                }`}>
                                {msg.role === 'user' ? <User className="w-4 h-4 text-slate-600 dark:text-slate-300" /> : <Bot className="w-4 h-4 text-white" />}
                            </div>
                            <div className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${msg.role === 'user'
                                ? 'bg-white dark:bg-dark-layer1 text-slate-700 dark:text-slate-200 border border-black/5 dark:border-white/10 rounded-tr-none'
                                : 'bg-primary/10 text-slate-700 dark:text-slate-200 border border-primary/20 rounded-tl-none'
                                }`}>
                                <div className="prose dark:prose-invert prose-sm max-w-none">
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
                                                        customStyle={{
                                                            margin: '1em 0',
                                                            borderRadius: '0.5rem',
                                                            background: '#1e1e1e',
                                                            border: '1px solid rgba(255,255,255,0.1)'
                                                        }}
                                                    >
                                                        {String(children).replace(/\n$/, '')}
                                                    </SyntaxHighlighter>
                                                ) : (
                                                    <code {...props} className="bg-black/5 dark:bg-white/10 rounded px-1 py-0.5 text-primary-dark dark:text-primary-light">
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
                        <div className="flex gap-4 animate-fade-in">
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                                <Bot className="w-4 h-4 text-white" />
                            </div>
                            <div className="bg-white dark:bg-dark-layer1 border border-black/5 dark:border-white/10 rounded-2xl p-4 rounded-tl-none shadow-sm flex items-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                                <span className="text-sm text-slate-500 dark:text-slate-400">Thinking...</span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Feedback (only show if messages exist) */}
                {messages.length > 0 && (
                    <div className="px-6 py-2 bg-slate-50 dark:bg-dark-layer2 flex justify-center border-t border-black/5 dark:border-white/5">
                        {!feedback ? (
                            <div className="flex items-center gap-4 text-xs text-slate-500">
                                <span>Was this helpful?</span>
                                <div className="flex gap-2">
                                    <button onClick={() => handleFeedback('positive')} className="p-1 hover:bg-slate-200 dark:hover:bg-white/10 rounded transition-colors text-slate-400 hover:text-green-500 dark:hover:text-green-400"><ThumbsUp className="w-4 h-4" /></button>
                                    <button onClick={() => handleFeedback('negative')} className="p-1 hover:bg-slate-200 dark:hover:bg-white/10 rounded transition-colors text-slate-400 hover:text-red-500 dark:hover:text-red-400"><ThumbsDown className="w-4 h-4" /></button>
                                </div>
                            </div>
                        ) : (
                            <span className="text-xs text-green-600 dark:text-green-400 font-medium flex items-center gap-1">
                                <Sparkles className="w-3 h-3" /> Thanks for your feedback!
                            </span>
                        )}
                    </div>
                )}

                {/* Input */}
                <div className="p-4 border-t border-black/5 dark:border-white/5 bg-white dark:bg-dark-layer1">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                            placeholder="Ask a follow-up question..."
                            disabled={isLoading}
                            className="flex-1 px-4 py-3 bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-white/10 rounded-xl focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all disabled:opacity-50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600"
                        />
                        <button
                            onClick={() => handleSendMessage()}
                            disabled={isLoading || !input.trim()}
                            className="p-3 bg-primary text-white rounded-xl hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-glow"
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

