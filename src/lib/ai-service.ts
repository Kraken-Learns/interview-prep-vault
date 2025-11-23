import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';
import type { AIConfig, ChatMessage, Problem } from '@/types';

export interface AIProvider {
    generateResponse(
        messages: ChatMessage[],
        context: { problem: Problem; userCode: string; language: string }
    ): Promise<string>;
    validateApiKey(apiKey: string): Promise<void>;
}

export class GeminiProvider implements AIProvider {
    private genAI: GoogleGenerativeAI;

    constructor(apiKey: string) {
        this.genAI = new GoogleGenerativeAI(apiKey);
    }

    async generateResponse(
        messages: ChatMessage[],
        context: { problem: Problem; userCode: string; language: string }
    ): Promise<string> {
        const model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const systemPrompt = `
You are an expert coding tutor. Your goal is to guide the user to solve the coding problem: "${context.problem.title}".
The user is writing in ${context.language}.

Here is the problem description:
${context.problem.content}

Here is the user's current code:
\`\`\`${context.language}
${context.userCode}
\`\`\`

GUIDELINES:
1. Do NOT give the full solution immediately. Provide hints, ask leading questions, or explain concepts.
2. If the user's code has errors, explain the error and suggest how to fix it, but don't just rewrite the code.
3. Encourage the user to think about edge cases and time/space complexity.
4. Be encouraging and positive.
5. If the user explicitly asks for the solution or is completely stuck after multiple attempts, you can provide more direct help, but prioritize learning.
6. Keep responses concise and readable. Use markdown.
`;

        const chat = model.startChat({
            history: messages.slice(0, -1).map(m => ({
                role: m.role === 'user' ? 'user' : 'model',
                parts: [{ text: m.content }]
            }))
        });

        let lastMessage = messages[messages.length - 1].content;
        if (messages.length === 1) {
            lastMessage = `${systemPrompt}\n\nUser Question: ${lastMessage}`;
        }

        const result = await chat.sendMessage(lastMessage);
        const response = await result.response;
        return response.text();
    }

    async validateApiKey(apiKey: string): Promise<void> {
        const genAI = new GoogleGenerativeAI(apiKey);
        try {
            const listModelsResponse = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
            );

            if (listModelsResponse.ok) {
                const data = await listModelsResponse.json();
                console.log('Available models:', data.models?.map((m: any) => m.name));

                // Prioritize flash models (better quota limits)
                const flashModel = data.models?.find((m: any) =>
                    (m.name.includes('flash') || m.name.includes('Flash')) &&
                    m.supportedGenerationMethods?.includes('generateContent')
                );

                if (flashModel) {
                    const modelName = flashModel.name.replace('models/', '');
                    console.log('Using flash model:', modelName);
                    const model = genAI.getGenerativeModel({ model: modelName });
                    await model.generateContent('Test');
                    return;
                }
            }

            // Fallback: try gemini-2.5-flash directly
            const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
            await model.generateContent('Test');
        } catch (e: any) {
            console.error('Gemini API Validation Error:', e);
            throw new Error(e.message || 'Failed to validate Gemini API Key');
        }
    }
}

export class OpenAIProvider implements AIProvider {
    private openai: OpenAI;

    constructor(apiKey: string) {
        this.openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
    }

    async generateResponse(
        messages: ChatMessage[],
        context: { problem: Problem; userCode: string; language: string }
    ): Promise<string> {
        const systemPrompt = `
You are an expert coding tutor. Your goal is to guide the user to solve the coding problem: "${context.problem.title}".
The user is writing in ${context.language}.

Here is the problem description:
${context.problem.content}

Here is the user's current code:
\`\`\`${context.language}
${context.userCode}
\`\`\`

GUIDELINES:
1. Do NOT give the full solution immediately. Provide hints, ask leading questions, or explain concepts.
2. If the user's code has errors, explain the error and suggest how to fix it, but don't just rewrite the code.
3. Encourage the user to think about edge cases and time/space complexity.
4. Be encouraging and positive.
5. If the user explicitly asks for the solution or is completely stuck after multiple attempts, you can provide more direct help, but prioritize learning.
`;

        const openAIMessages = messages.map(m => {
            let role: 'user' | 'assistant' | 'system' = 'user';
            if (m.role === 'model') role = 'assistant';
            if (m.role === 'system') role = 'system';
            return { role, content: m.content };
        });

        const response = await this.openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: systemPrompt },
                ...openAIMessages
            ]
        });

        return response.choices[0]?.message?.content || 'No response from AI.';
    }

    async validateApiKey(_apiKey: string): Promise<void> {
        try {
            await this.openai.models.list();
        } catch (e: any) {
            throw new Error(e.message || 'Failed to validate OpenAI API Key');
        }
    }
}

export class AIService {
    static getProvider(config: AIConfig): AIProvider {
        if (config.provider === 'google') {
            return new GeminiProvider(config.apiKey);
        } else if (config.provider === 'openai') {
            return new OpenAIProvider(config.apiKey);
        }
        throw new Error('Unsupported provider');
    }
}
