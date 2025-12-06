
import React from 'react';
import { render } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import MarkdownRenderer from '../../src/components/MarkdownRenderer';

// Mock MermaidDiagram to inspect props
vi.mock('../../src/components/MermaidDiagram', () => ({
    default: ({ chart }: { chart: string }) => {
        console.log('CAPTURED_MERMAID_CHART:', JSON.stringify(chart));
        return <div data-testid="mermaid-mock">{chart}</div>;
    }
}));

// Mock SyntaxHighlighter to avoid issues
vi.mock('react-syntax-highlighter', () => ({
    Prism: ({ children }: any) => <div>{children}</div>
}));

vi.mock('react-syntax-highlighter/dist/esm/styles/prism', () => ({
    vscDarkPlus: {}
}));

describe('MarkdownRenderer Mermaid Debug', () => {
    it('passes correct string to MermaidDiagram', () => {
        const markdown = `
# Test

\`\`\`mermaid
graph TD
    A[Client] --> B[Load Balancer]
\`\`\`
`;
        render(<MarkdownRenderer content={markdown} />);
    });
});
