import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import ProblemDetail from '../../src/pages/ProblemDetail';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ProgressProvider } from '../../src/context/ProgressContext';

import { ThemeProvider } from '../../src/context/ThemeContext';

// Mock dependencies
vi.mock('../../src/lib/problems', () => ({
    getProblem: vi.fn().mockResolvedValue({
        slug: 'two-sum',
        title: 'Two Sum',
        difficulty: 'Easy',
        tags: ['Array'],
        source: 'LeetCode',
        date: '2023-01-01',
        content: '# Two Sum\nProblem content',
        starterCode: { javascript: 'console.log("start")' }
    })
}));

vi.mock('react-markdown', () => ({
    default: ({ children }: { children: string }) => <div>{children}</div>
}));

// Mock Monaco Editor to avoid canvas issues in jsdom
vi.mock('@monaco-editor/react', () => ({
    default: () => <textarea data-testid="monaco-editor" />
}));

describe('ProblemDetail Page', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders problem details', async () => {
        render(
            <ProgressProvider>
                <ThemeProvider>
                    <MemoryRouter initialEntries={['/problem/two-sum']}>
                        <Routes>
                            <Route path="/problem/:slug" element={<ProblemDetail />} />
                        </Routes>
                    </MemoryRouter>
                </ThemeProvider>
            </ProgressProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('Two Sum')).toBeInTheDocument();
            expect(screen.getByText('Easy')).toBeInTheDocument();
        });
    });
});
