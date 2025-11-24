import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AIGuidance from '../../src/components/AIGuidance';
import type { Problem } from '../../src/types';

// Mock dependencies
vi.mock('../../src/lib/ai-service', () => ({
    AIService: {
        getProvider: vi.fn().mockReturnValue({
            generateResponse: vi.fn().mockResolvedValue('Mock AI Response'),
            validateApiKey: vi.fn().mockResolvedValue(true)
        })
    }
}));

vi.mock('../../src/lib/logger', () => ({
    logger: {
        saveSession: vi.fn()
    }
}));

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = vi.fn();

describe('AIGuidance Component', () => {
    const mockProblem: Problem = {
        slug: 'two-sum',
        title: 'Two Sum',
        difficulty: 'Easy',
        tags: [],
        source: 'LeetCode',
        date: new Date().toISOString(),
        content: 'Problem content',
        starterCode: {}
    };

    const defaultProps = {
        problem: mockProblem,
        userCode: 'console.log("test")',
        language: 'javascript',
        onClose: vi.fn()
    };

    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
        // Setup API key in localStorage to skip settings screen
        localStorage.setItem('ai_config', JSON.stringify({
            provider: 'google',
            apiKey: 'test-key',
            model: 'gemini-2.5-flash'
        }));
    });

    it('renders the chat interface', () => {
        render(<AIGuidance {...defaultProps} />);
        expect(screen.getByText('AI Guidance')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Ask a follow-up question...')).toBeInTheDocument();
    });

    it('sends a message and displays response', async () => {
        render(<AIGuidance {...defaultProps} />);

        const input = screen.getByPlaceholderText('Ask a follow-up question...');

        fireEvent.change(input, { target: { value: 'Hello AI' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

        await waitFor(() => {
            expect(screen.getByText('Mock AI Response')).toBeInTheDocument();
        });
    });

    it('shows settings if no API key is configured', () => {
        localStorage.clear();
        render(<AIGuidance {...defaultProps} />);
        expect(screen.getByText('AI Setup')).toBeInTheDocument();
    });
});
