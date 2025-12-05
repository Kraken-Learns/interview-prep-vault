import React, { useState, useMemo } from 'react';
import MarkdownRenderer from './MarkdownRenderer';
import { SYSTEM_DESIGN_TOPICS, type SystemDesignTopic } from '@/data/systemDesign';
import SystemDesignCard from './SystemDesignCard';
import { useProgress } from '@/context/ProgressContext';
import { BookOpen, Layers, BrainCircuit, CheckCircle, Circle, ArrowLeft } from 'lucide-react';

type ViewState = 'categories' | 'topic-list' | 'topic-content';

const SystemDesignView: React.FC = () => {
    const [viewState, setViewState] = useState<ViewState>('categories');
    const [selectedCategory, setSelectedCategory] = useState<SystemDesignTopic['category'] | null>(null);
    const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
    const { toggleSystemDesignArticleRead, isSystemDesignArticleRead } = useProgress();

    const categories = [
        {
            id: 'core-concepts',
            title: 'Core Concepts',
            description: 'Essential building blocks of distributed systems.',
            icon: Layers,
        },
        {
            id: 'deep-dives',
            title: 'Deep Dives',
            description: 'In-depth analysis of specific technologies and patterns.',
            icon: BookOpen,
        },
        {
            id: 'problem-set',
            title: 'Problem Set',
            description: 'Practice problems to test your system design skills.',
            icon: BrainCircuit,
        },
    ] as const;

    const filteredTopics = useMemo(() => {
        if (!selectedCategory) return [];
        return SYSTEM_DESIGN_TOPICS.filter(t => t.category === selectedCategory);
    }, [selectedCategory]);

    const selectedTopic = useMemo(() => {
        if (!selectedTopicId) return null;
        return SYSTEM_DESIGN_TOPICS.find(t => t.id === selectedTopicId);
    }, [selectedTopicId]);

    const handleCategoryClick = (category: SystemDesignTopic['category']) => {
        setSelectedCategory(category);
        setViewState('topic-list');
    };

    const handleTopicClick = (topicId: string) => {
        setSelectedTopicId(topicId);
        setViewState('topic-content');
    };

    const handleBackToCategories = () => {
        setSelectedCategory(null);
        setViewState('categories');
    };

    const handleBackToTopics = () => {
        setSelectedTopicId(null);
        setViewState('topic-list');
    };

    const getCategoryStats = (category: string) => {
        const topics = SYSTEM_DESIGN_TOPICS.filter(t => t.category === category);
        const total = topics.length;
        const read = topics.filter(t => isSystemDesignArticleRead(t.id)).length;
        return { total, read };
    };

    if (viewState === 'categories') {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
                {categories.map((category) => {
                    const stats = getCategoryStats(category.id);
                    return (
                        <SystemDesignCard
                            key={category.id}
                            title={category.title}
                            description={category.description}
                            icon={category.icon}
                            totalArticles={stats.total}
                            readArticles={stats.read}
                            onClick={() => handleCategoryClick(category.id)}
                        />
                    );
                })}
            </div>
        );
    }

    if (viewState === 'topic-list' && selectedCategory) {
        const categoryInfo = categories.find(c => c.id === selectedCategory);
        return (
            <div className="space-y-6 animate-fade-in">
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleBackToCategories}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-dark-layer1 border border-black/10 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-primary/50 transition-all font-semibold shadow-sm hover:shadow-md"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Categories
                    </button>
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                        {categoryInfo?.title}
                    </h2>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {filteredTopics.length > 0 ? (
                        filteredTopics.map((topic) => {
                            const isRead = isSystemDesignArticleRead(topic.id);
                            return (
                                <button
                                    key={topic.id}
                                    onClick={() => handleTopicClick(topic.id)}
                                    className="group flex items-center justify-between p-6 bg-white dark:bg-dark-layer1 rounded-2xl border border-black/10 dark:border-white/10 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-glow text-left"
                                >
                                    <span className="text-lg font-semibold text-slate-700 dark:text-slate-200 group-hover:text-primary transition-colors">
                                        {topic.title}
                                    </span>
                                    {isRead ? (
                                        <CheckCircle className="w-6 h-6 text-green-500" />
                                    ) : (
                                        <Circle className="w-6 h-6 text-slate-300 dark:text-slate-600 group-hover:text-primary/50 transition-colors" />
                                    )}
                                </button>
                            );
                        })
                    ) : (
                        <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/5">
                            <p className="text-xl font-semibold text-slate-400">No topics found</p>
                            <p className="text-slate-500 mt-2">Content for this section is coming soon.</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    if (viewState === 'topic-content' && selectedTopic) {
        const isRead = isSystemDesignArticleRead(selectedTopic.id);
        return (
            <div className="flex flex-col md:flex-row gap-8 min-h-[calc(100vh-20rem)] animate-fade-in">
                {/* Sidebar */}
                <aside className="w-full md:w-64 flex-shrink-0">
                    <div className="md:sticky md:top-24 space-y-4">
                        <button
                            onClick={handleBackToTopics}
                            className="w-full flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-dark-layer1 border border-black/10 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-primary/50 transition-all font-semibold shadow-sm hover:shadow-md mb-6"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to List
                        </button>

                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider px-4 mb-2">
                            Topics
                        </h3>
                        <div className="space-y-1">
                            {filteredTopics.map((topic) => (
                                <button
                                    key={topic.id}
                                    onClick={() => setSelectedTopicId(topic.id)}
                                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 font-medium flex items-center justify-between group ${selectedTopicId === topic.id
                                        ? 'bg-primary/10 text-primary shadow-glow border border-primary/20'
                                        : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                                        }`}
                                >
                                    <span className="truncate">{topic.title}</span>
                                    {isSystemDesignArticleRead(topic.id) && (
                                        <CheckCircle className={`w-4 h-4 ${selectedTopicId === topic.id ? 'text-primary' : 'text-green-500/50'}`} />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Content */}
                <main className="flex-1 min-w-0 space-y-6">
                    <div className="bg-dark-layer1 rounded-2xl shadow-lg border border-white/5 p-8">
                        <MarkdownRenderer content={selectedTopic.content} />
                    </div>

                    <div className="flex justify-end">
                        <button
                            onClick={() => toggleSystemDesignArticleRead(selectedTopic.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg ${isRead
                                ? 'bg-green-500/10 text-green-500 border border-green-500/20 hover:bg-green-500/20'
                                : 'bg-primary text-white hover:bg-primary-dark hover:scale-105 shadow-glow'
                                }`}
                        >
                            {isRead ? (
                                <>
                                    <CheckCircle className="w-5 h-5" />
                                    Marked as Read
                                </>
                            ) : (
                                <>
                                    <CheckCircle className="w-5 h-5" />
                                    Mark as Read
                                </>
                            )}
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    return null;
};

export default SystemDesignView;
