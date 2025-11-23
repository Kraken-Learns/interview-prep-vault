export interface TestCase {
    input: string;
    output: string;
    explanation?: string;
}

export interface Problem {
    slug: string;
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    tags: string[];
    source: string;
    date: string;
    content: string; // The full markdown content
    testCases?: TestCase[];
    starterCode?: Record<string, string>;
}

export type AIModel = 'gemini-pro' | 'gemini-1.5-flash' | 'gemini-2.5-flash' | 'gpt-4' | 'gpt-3.5-turbo';

export interface AIConfig {
    provider: 'google' | 'openai';
    apiKey: string;
    model: AIModel;
}

export interface ChatMessage {
    role: 'user' | 'model' | 'system';
    content: string;
    timestamp: number;
}

export interface AIGuidanceSession {
    id: string;
    problemSlug: string;
    language: string;
    messages: ChatMessage[];
    userCode: string;
    feedback?: 'positive' | 'negative' | null;
    feedbackText?: string;
    timestamp: number;
}
