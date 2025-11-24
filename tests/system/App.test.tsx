import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../../src/App';

// Mock pages to isolate routing test
vi.mock('../../src/pages/Home', () => ({
    default: () => <div data-testid="home-page">Home Page</div>
}));

vi.mock('../../src/pages/ProblemDetail', () => ({
    default: () => <div data-testid="problem-detail-page">Problem Detail Page</div>
}));

describe('App Routing', () => {
    it('renders home page by default', () => {
        window.history.pushState({}, 'Test page', '/interview-prep-vault/');
        render(<App />);
        expect(screen.getByTestId('home-page')).toBeInTheDocument();
    });

    it('renders problem detail page for valid route', () => {
        window.history.pushState({}, 'Test page', '/interview-prep-vault/problem/two-sum');
        render(<App />);
        expect(screen.getByTestId('problem-detail-page')).toBeInTheDocument();
    });
});
