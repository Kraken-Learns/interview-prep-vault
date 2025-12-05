import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface ProgressContextType {
    completedProblems: string[];
    toggleProblemCompletion: (slug: string) => void;
    isProblemCompleted: (slug: string) => boolean;
    readSystemDesignArticles: string[];
    toggleSystemDesignArticleRead: (id: string) => void;
    isSystemDesignArticleRead: (id: string) => boolean;
    clearAllProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const useProgress = () => {
    const context = useContext(ProgressContext);
    if (!context) {
        throw new Error('useProgress must be used within a ProgressProvider');
    }
    return context;
};

interface ProgressProviderProps {
    children: ReactNode;
}

export const ProgressProvider: React.FC<ProgressProviderProps> = ({ children }) => {
    const [completedProblems, setCompletedProblems] = useState<string[]>(() => {
        const saved = localStorage.getItem('completedProblems');
        return saved ? JSON.parse(saved) : [];
    });

    const [readSystemDesignArticles, setReadSystemDesignArticles] = useState<string[]>(() => {
        const saved = localStorage.getItem('readSystemDesignArticles');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('completedProblems', JSON.stringify(completedProblems));
    }, [completedProblems]);

    useEffect(() => {
        localStorage.setItem('readSystemDesignArticles', JSON.stringify(readSystemDesignArticles));
    }, [readSystemDesignArticles]);

    const toggleProblemCompletion = (slug: string) => {
        setCompletedProblems((prev) => {
            if (prev.includes(slug)) {
                return prev.filter((s) => s !== slug);
            } else {
                return [...prev, slug];
            }
        });
    };

    const toggleSystemDesignArticleRead = (id: string) => {
        setReadSystemDesignArticles((prev) => {
            if (prev.includes(id)) {
                return prev.filter((s) => s !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    const isProblemCompleted = (slug: string) => {
        return completedProblems.includes(slug);
    };

    const isSystemDesignArticleRead = (id: string) => {
        return readSystemDesignArticles.includes(id);
    };

    const clearAllProgress = () => {
        setCompletedProblems([]);
        setReadSystemDesignArticles([]);
    };

    return (
        <ProgressContext.Provider
            value={{
                completedProblems,
                toggleProblemCompletion,
                isProblemCompleted,
                readSystemDesignArticles,
                toggleSystemDesignArticleRead,
                isSystemDesignArticleRead,
                clearAllProgress,
            }}
        >
            {children}
        </ProgressContext.Provider>
    );
};
