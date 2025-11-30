import React from 'react';
import { Link } from 'react-router-dom';
import type { Problem } from '@/types';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useProgress } from '@/context/ProgressContext';

interface ProblemCardProps {
    problem: Problem;
}

const ProblemCard: React.FC<ProblemCardProps> = ({ problem }) => {
    const { isProblemCompleted } = useProgress();
    const isCompleted = isProblemCompleted(problem.slug);

    const difficultyConfig = {
        Easy: {
            text: 'text-green-600 dark:text-green-400',
            bg: 'bg-green-100 dark:bg-green-400/10',
            border: 'border-green-200 dark:border-green-400/20',
            glow: 'group-hover:shadow-[0_0_20px_rgba(74,222,128,0.2)]'
        },
        Medium: {
            text: 'text-yellow-600 dark:text-yellow-400',
            bg: 'bg-yellow-100 dark:bg-yellow-400/10',
            border: 'border-yellow-200 dark:border-yellow-400/20',
            glow: 'group-hover:shadow-[0_0_20px_rgba(250,204,21,0.2)]'
        },
        Hard: {
            text: 'text-red-600 dark:text-red-400',
            bg: 'bg-red-100 dark:bg-red-400/10',
            border: 'border-red-200 dark:border-red-400/20',
            glow: 'group-hover:shadow-[0_0_20px_rgba(248,113,113,0.2)]'
        },
    } as const;

    const config = difficultyConfig[problem.difficulty as keyof typeof difficultyConfig] || {
        text: 'text-slate-600 dark:text-slate-400',
        bg: 'bg-slate-100 dark:bg-slate-400/10',
        border: 'border-slate-200 dark:border-slate-400/20',
        glow: ''
    };

    if (!difficultyConfig[problem.difficulty as keyof typeof difficultyConfig]) {
        console.warn(`Invalid difficulty for problem ${problem.title}: ${problem.difficulty}`);
    }

    return (
        <Link to={`/problem/${problem.set}/${problem.slug}`} className="block group">
            <div className={`relative bg-white dark:bg-dark-layer1 rounded-2xl p-6 border border-slate-200 dark:border-white/5 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 dark:hover:border-white/10 overflow-hidden ${config.glow}`}>
                {/* Shimmer Effect on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-100/50 dark:via-white/5 to-transparent animate-shimmer"></div>
                </div>

                {/* Completion Indicator Strip */}
                {isCompleted && (
                    <div className="absolute top-0 left-0 w-1 h-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                )}

                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex-1 pr-4">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors duration-300 mb-2 flex items-center gap-2">
                                {problem.title}
                                {isCompleted && <CheckCircle className="w-5 h-5 text-green-500" />}
                            </h3>
                        </div>
                        <span className={`shrink-0 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${config.bg} ${config.text} ${config.border}`}>
                            {problem.difficulty}
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {problem.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-2.5 py-1 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 text-xs font-medium rounded-lg border border-slate-200 dark:border-white/5 group-hover:border-primary/20 dark:group-hover:border-white/10 transition-colors"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center text-sm font-bold text-slate-500 group-hover:text-primary transition-colors duration-300">
                        View Problem
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProblemCard;
