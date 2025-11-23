import React from 'react';
import type { Problem } from '@/types';
import { Filter } from 'lucide-react';
import ProgressRing from './ProgressRing';
import { useProgress } from '@/context/ProgressContext';

interface TagSidebarProps {
    allTags: string[];
    selectedTags: string[];
    onTagToggle: (tag: string) => void;
    problems: Problem[];
}

const TagSidebar: React.FC<TagSidebarProps> = ({
    allTags,
    selectedTags,
    onTagToggle,
    problems,
}) => {
    const { completedProblems, clearAllProgress } = useProgress();

    // Calculate problem count for each tag
    const getTagCount = (tag: string) => {
        return problems.filter(problem =>
            problem.tags.some(pTag => pTag.toLowerCase() === tag.toLowerCase())
        ).length;
    };

    const handleClearProgress = () => {
        if (window.confirm('Are you sure you want to clear all progress? This cannot be undone.')) {
            clearAllProgress();
        }
    };

    return (
        <div className="space-y-6 sticky top-6">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Filter className="w-5 h-5 text-slate-600" />
                    <h2 className="text-lg font-semibold text-slate-900">Filter by Tags</h2>
                </div>

                <div className="space-y-2 max-h-[calc(100vh-400px)] overflow-y-auto pr-2 custom-scrollbar">
                    {allTags.map((tag) => {
                        const isSelected = selectedTags.some(
                            selected => selected.toLowerCase() === tag.toLowerCase()
                        );
                        const count = getTagCount(tag);

                        return (
                            <label
                                key={tag}
                                className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all duration-200 ${isSelected
                                    ? 'bg-blue-50 border border-blue-200'
                                    : 'hover:bg-slate-50 border border-transparent'
                                    }`}
                            >
                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                    <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() => onTagToggle(tag)}
                                        className="w-4 h-4 text-blue-600 bg-white border-slate-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                    />
                                    <span
                                        className={`text-sm font-medium truncate ${isSelected ? 'text-blue-700' : 'text-slate-700'
                                            }`}
                                        title={tag}
                                    >
                                        {tag}
                                    </span>
                                </div>
                                <span
                                    className={`text-xs font-medium ml-2 px-2 py-0.5 rounded-full ${isSelected
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'bg-slate-100 text-slate-500'
                                        }`}
                                >
                                    {count}
                                </span>
                            </label>
                        );
                    })}
                </div>

                {selectedTags.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-200">
                        <button
                            onClick={() => selectedTags.forEach(tag => onTagToggle(tag))}
                            className="w-full text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors"
                        >
                            Clear all filters ({selectedTags.length})
                        </button>
                    </div>
                )}
            </div>

            {/* Progress Ring Section */}
            <ProgressRing
                total={problems.length}
                completed={completedProblems.length}
                onClearProgress={handleClearProgress}
            />
        </div>
    );
};

export default TagSidebar;
