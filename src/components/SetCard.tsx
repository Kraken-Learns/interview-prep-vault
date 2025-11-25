import React from 'react';
import type { Problem } from '@/types';
import { useProgress } from '@/context/ProgressContext';
import { FolderOpen, ChevronRight } from 'lucide-react';

interface SetCardProps {
    setName: string;
    problems: Problem[];
    onClick: () => void;
}

const SetCard: React.FC<SetCardProps> = ({ setName, problems, onClick }) => {
    const { completedProblems } = useProgress();

    // Calculate progress for this set
    const completedCount = problems.filter(p => completedProblems.includes(p.slug)).length;
    const totalCount = problems.length;
    const progressPercent = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

    // Format set name: "set1" -> "Set 1", "set2" -> "Set 2"
    const formatSetName = (name: string) => {
        return name.replace(/set(\d+)/i, 'Set $1');
    };

    return (
        <button
            onClick={onClick}
            className="w-full group"
        >
            <div className="relative bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 dark:from-primary/10 dark:via-purple-500/10 dark:to-pink-500/10 rounded-2xl p-6 border border-primary/20 dark:border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

                <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                        {/* Icon */}
                        <div className="p-3 bg-primary/10 dark:bg-primary/20 rounded-xl border border-primary/20 dark:border-primary/30 group-hover:scale-110 transition-transform">
                            <FolderOpen className="w-6 h-6 text-primary" />
                        </div>

                        <div className="flex-1 text-left">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                {formatSetName(setName)}
                                <ChevronRight className="w-5 h-5 text-slate-500 group-hover:translate-x-1 transition-transform" />
                            </h2>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                {totalCount} {totalCount === 1 ? 'problem' : 'problems'}
                            </p>
                        </div>
                    </div>

                    {/* Progress Display */}
                    <div className="flex items-center gap-6">
                        {/* Progress Bar */}
                        <div className="hidden md:flex flex-col items-end gap-2 min-w-[200px]">
                            <div className="flex items-center gap-3 w-full">
                                <div className="flex-1 h-3 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-full transition-all duration-500 ease-out"
                                        style={{ width: `${progressPercent}%` }}
                                    ></div>
                                </div>
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300 min-w-[3rem] text-right">
                                    {progressPercent}%
                                </span>
                            </div>
                            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                {completedCount} / {totalCount} completed
                            </span>
                        </div>

                        {/* Mobile Progress Circle */}
                        <div className="md:hidden relative w-16 h-16">
                            <svg className="w-16 h-16 transform -rotate-90">
                                <circle
                                    cx="32"
                                    cy="32"
                                    r="28"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    fill="none"
                                    className="text-slate-200 dark:text-white/10"
                                />
                                <circle
                                    cx="32"
                                    cy="32"
                                    r="28"
                                    stroke="url(#gradient)"
                                    strokeWidth="4"
                                    fill="none"
                                    strokeDasharray={`${2 * Math.PI * 28}`}
                                    strokeDashoffset={`${2 * Math.PI * 28 * (1 - progressPercent / 100)}`}
                                    strokeLinecap="round"
                                    className="transition-all duration-500"
                                />
                                <defs>
                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#3b82f6" />
                                        <stop offset="50%" stopColor="#8b5cf6" />
                                        <stop offset="100%" stopColor="#ec4899" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xs font-bold text-slate-900 dark:text-white">
                                    {progressPercent}%
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </button>
    );
};

export default SetCard;
