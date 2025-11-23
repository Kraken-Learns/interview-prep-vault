import type { AIGuidanceSession } from '@/types';

const STORAGE_KEY = 'ai_guidance_sessions';

export const logger = {
    saveSession: (session: AIGuidanceSession) => {
        try {
            const existingSessionsStr = localStorage.getItem(STORAGE_KEY);
            const sessions: AIGuidanceSession[] = existingSessionsStr ? JSON.parse(existingSessionsStr) : [];

            const index = sessions.findIndex(s => s.id === session.id);
            if (index >= 0) {
                sessions[index] = session;
            } else {
                sessions.push(session);
            }

            localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
        } catch (error) {
            console.error('Failed to save AI session:', error);
        }
    },

    getSessions: (): AIGuidanceSession[] => {
        try {
            const sessionsStr = localStorage.getItem(STORAGE_KEY);
            return sessionsStr ? JSON.parse(sessionsStr) : [];
        } catch (error) {
            console.error('Failed to get AI sessions:', error);
            return [];
        }
    },

    exportSessions: () => {
        const sessions = logger.getSessions();
        const blob = new Blob([JSON.stringify(sessions, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ai-sessions-${new Date().toISOString()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
};
