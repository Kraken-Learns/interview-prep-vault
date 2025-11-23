import React from 'react';
import { Link } from 'react-router-dom';
import type { Problem } from '@/types';
import { ArrowRight } from 'lucide-react';

interface ProblemCardProps {
    problem: Problem;
}

const ProblemCard: React.FC<ProblemCardProps> = ({ problem }) => {
    const difficultyColor = {
        Easy: 'bg-green-100 text-green-700',
        Medium: 'bg-yellow-100 text-yellow-700',
        Hard: 'bg-red-100 text-red-700',
    }[problem.difficulty];

    return (
        <Link to={`/problem/${problem.slug}`} className="block group">
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {problem.title}
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">{problem.source}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColor}`}>
                        {problem.difficulty}
                    </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                    {problem.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="flex items-center text-sm font-medium text-slate-400 group-hover:text-blue-600 transition-colors">
                    View Problem <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
            </div>
        </Link>
    );
};

export default ProblemCard;
