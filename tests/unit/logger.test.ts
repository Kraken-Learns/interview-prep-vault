import { describe, it, expect, beforeEach, vi } from 'vitest';
import { logger } from '../../src/lib/logger';
import { AIGuidanceSession } from '../../src/types';

describe('Logger Service', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
    });

    const mockSession: AIGuidanceSession = {
        id: 'test-id',
        problemSlug: 'two-sum',
        language: 'typescript',
        messages: [],
        userCode: 'console.log("hi")',
        timestamp: Date.now()
    };

    it('should save a new session', () => {
        logger.saveSession(mockSession);
        const sessions = logger.getSessions();
        expect(sessions).toHaveLength(1);
        expect(sessions[0]).toEqual(mockSession);
    });

    it('should update an existing session', () => {
        logger.saveSession(mockSession);

        const updatedSession = {
            ...mockSession,
            messages: [{ role: 'user' as const, content: 'hi', timestamp: Date.now() }]
        };
        logger.saveSession(updatedSession); // Should update

        const sessions = logger.getSessions();
        expect(sessions).toHaveLength(1);
        expect(sessions[0].messages).toHaveLength(1);
    });

    it('should retrieve empty array if no sessions', () => {
        const sessions = logger.getSessions();
        expect(sessions).toEqual([]);
    });
});
