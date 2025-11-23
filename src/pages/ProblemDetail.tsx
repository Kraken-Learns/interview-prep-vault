import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProblem } from '@/lib/problems';
import type { Problem } from '@/types';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import CodeEditor from '@/components/CodeEditor';
import { ArrowLeft, Tag, ChevronDown, ChevronUp, Eye, EyeOff } from 'lucide-react';

const ProblemDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [problem, setProblem] = useState<Problem | null>(null);
    const [loading, setLoading] = useState(true);
    const [userCode, setUserCode] = useState('');
    const [showSolution, setShowSolution] = useState(false);
    const [approachExpanded, setApproachExpanded] = useState(false);

    useEffect(() => {
        if (slug) {
            getProblem(slug).then((data) => {
                setProblem(data);
                setUserCode(data?.starterCode || '');
                setLoading(false);
            });
        }
    }, [slug]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
            </div>
        );
    }

    if (!problem) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-slate-900">Problem not found</h2>
                <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
                    Return to Home
                </Link>
            </div>
        );
    }

    // Split content by headers
    const sections = problem.content.split(/(?=^##\s)/m);
    const problemSection = sections.find(s => s.startsWith('## Problem')) || '';
    const testCasesSection = sections.find(s => s.startsWith('## Test Cases')) || '';
    const approachSection = sections.find(s => s.startsWith('## Approach')) || '';
    const solutionSection = sections.find(s => s.startsWith('## Solution')) || '';

    const handleToggleSolution = () => {
        setShowSolution(!showSolution);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <Link
                to="/"
                className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 mb-8 transition-colors group"
            >
                <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                Back to Problems
            </Link>

            <div className="space-y-6">
                {/* Title and Tags */}
                <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                    <h1 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">{problem.title}</h1>
                    <div className="flex flex-wrap gap-3 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${problem.difficulty === 'Easy' ? 'bg-green-50 text-green-700 border-green-200' :
                            problem.difficulty === 'Medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                'bg-red-50 text-red-700 border-red-200'
                            }`}>
                            {problem.difficulty}
                        </span>
                        <span className="flex items-center text-slate-500 bg-slate-50 px-3 py-1 rounded-full border border-slate-200">
                            <Tag className="w-3.5 h-3.5 mr-1.5" />
                            {problem.tags.join(', ')}
                        </span>
                    </div>
                </div>

                {/* Problem Statement */}
                {problemSection && (
                    <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                        <div className="prose prose-slate max-w-none">
                            <MarkdownRenderer content={problemSection} />
                        </div>
                    </div>
                )}

                {/* Test Cases */}
                {testCasesSection && (
                    <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                        <div className="prose prose-slate max-w-none">
                            <MarkdownRenderer content={testCasesSection} />
                        </div>
                    </div>
                )}

                {/* Code Editor */}
                <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Your Solution</h2>
                    <CodeEditor
                        initialCode={userCode}
                        onChange={setUserCode}
                    />

                    {/* Action Button */}
                    <div className="flex gap-4 mt-6">
                        <button
                            onClick={handleToggleSolution}
                            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                        >
                            {showSolution ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            {showSolution ? 'Hide Solution' : 'View Solution'}
                        </button>
                    </div>
                </div>

                {/* Solution Display - View Mode */}
                {showSolution && solutionSection && (
                    <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 shadow-xl overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                        <div className="flex items-center mb-6 text-white">
                            <div className="h-8 w-1 bg-green-500 rounded-full mr-4"></div>
                            <h2 className="text-2xl font-bold">Official Solution</h2>
                        </div>
                        <div className="prose prose-invert max-w-none">
                            <MarkdownRenderer content={solutionSection.replace('## Solution', '')} />
                        </div>
                    </div>
                )}

                {/* Approach - Collapsible */}
                {approachSection && (
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <button
                            onClick={() => setApproachExpanded(!approachExpanded)}
                            className="w-full flex items-center justify-between p-8 text-left hover:bg-slate-50 transition-colors"
                        >
                            <div className="flex items-center">
                                <div className="h-8 w-1 bg-blue-500 rounded-full mr-4"></div>
                                <h2 className="text-2xl font-bold text-slate-900">Approach</h2>
                            </div>
                            {approachExpanded ? (
                                <ChevronUp className="w-6 h-6 text-slate-500" />
                            ) : (
                                <ChevronDown className="w-6 h-6 text-slate-500" />
                            )}
                        </button>
                        {approachExpanded && (
                            <div className="px-8 pb-8">
                                <div className="prose prose-slate max-w-none">
                                    <MarkdownRenderer content={approachSection.replace('## Approach', '')} />
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProblemDetail;
