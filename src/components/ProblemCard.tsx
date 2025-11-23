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
            gradient: 'from-green-400 to-emerald-500',
            bg: 'bg-green-50',
            text: 'text-green-700',
            glow: 'group-hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]'
        },
        Medium: {
            gradient: 'from-yellow-400 to-orange-500',
            bg: 'bg-yellow-50',
            text: 'text-yellow-700',
            glow: 'group-hover:shadow-[0_0_20px_rgba(251,191,36,0.3)]'
        },
        Hard: {
            gradient: 'from-red-400 to-pink-500',
            bg: 'bg-red-50',
            text: 'text-red-700',
            glow: 'group-hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]'
        },
    }[problem.difficulty];

    return (
        <Link to={`/problem/${problem.slug}`} className="block group">
            <div className={`relative bg-white rounded-2xl p-7 border border-slate-100 shadow-premium hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden ${difficultyConfig.glow}`}>
                {/* Shimmer Effect on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 animate-shimmer"></div>
                </div>

                {/* Completion Indicator Strip */}
                {isCompleted && (
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                )}

                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-5">
                        <div className="flex-1 pr-4">
                            <h3 className="text-xl font-bold text-slate-900 group-hover:gradient-text transition-all duration-300 mb-2 flex items-center gap-2">
                                {problem.title}
                                {isCompleted && <CheckCircle className="w-5 h-5 text-green-500" />}
                            </h3>
                        </div>
                        <span className={`shrink-0 px-4 py-1.5 bg-gradient-to-r ${difficultyConfig.gradient} text-white rounded-full text-xs font-bold uppercase tracking-wide shadow-md`}>
                            {problem.difficulty}
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {problem.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1.5 bg-gradient-to-r from-slate-100 to-slate-50 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 hover:border-slate-300 transition-all duration-200 hover:scale-105"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center text-sm font-bold text-slate-400 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                        View Problem
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-2 text-blue-600" />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProblemCard;
