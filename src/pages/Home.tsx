import React, { useEffect, useState } from 'react';
import { getAllProblems } from '@/lib/problems';
import type { Problem } from '@/types';
import ProblemCard from '@/components/ProblemCard';
import { Search } from 'lucide-react';

const Home: React.FC = () => {
    const [problems, setProblems] = useState<Problem[]>([]);
    const [filteredProblems, setFilteredProblems] = useState<Problem[]>([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        getAllProblems().then((data) => {
            setProblems(data);
            setFilteredProblems(data);
        });
    }, []);

    useEffect(() => {
        const lowerSearch = search.toLowerCase();
        const filtered = problems.filter((p) =>
            p.title.toLowerCase().includes(lowerSearch) ||
            p.tags.some((t) => t.toLowerCase().includes(lowerSearch))
        );
        setFilteredProblems(filtered);
    }, [search, problems]);

    return (
        <div className="space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
                    Interview Prep Vault
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    A collection of coding interview problems and solutions.
                </p>
            </div>

            <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                    type="text"
                    placeholder="Search problems or tags..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all shadow-sm"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProblems.map((problem) => (
                    <ProblemCard key={problem.slug} problem={problem} />
                ))}
            </div>

            {filteredProblems.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                    No problems found matching your search.
                </div>
            )}
        </div>
    );
};

export default Home;
