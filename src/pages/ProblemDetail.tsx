import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProblem } from '@/lib/problems';
import type { Problem } from '@/types';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import CodeEditor from '@/components/CodeEditor';
import { useProgress } from '@/context/ProgressContext';
import { ArrowLeft, Tag, ChevronDown, ChevronUp, Eye, EyeOff, Code2, TestTube, Lightbulb, Sparkles, CheckCircle, Circle } from 'lucide-react';
import confetti from 'canvas-confetti';

const ProblemDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [problem, setProblem] = useState<Problem | null>(null);
    const [loading, setLoading] = useState(true);
    const [userCode, setUserCode] = useState('');
    const [showSolution, setShowSolution] = useState(false);
    const [approachExpanded, setApproachExpanded] = useState(false);
    const { isProblemCompleted, toggleProblemCompletion } = useProgress();

    const isCompleted = slug ? isProblemCompleted(slug) : false;

    const handleToggleCompletion = () => {
        if (slug) {
            toggleProblemCompletion(slug);
            if (!isCompleted) {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }
        }
    };

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
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-blue-600"></div>
            </div>
        );
    }

    if (!problem) {
        return (
            <div className="text-center py-20">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Problem not found</h2>
                <p className="text-slate-600 mb-6">The problem you're looking for doesn't exist.</p>
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
                >
                    <ArrowLeft className="w-4 h-4" />
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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
                {/* Back Button */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 mb-10 transition-all group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Problems</span>
                </Link>

                <div className="space-y-8">
                    {/* Title and Tags - Hero Section */}
                    <div className="relative bg-gradient-to-br from-white to-slate-50/50 rounded-3xl p-10 border border-slate-200/60 shadow-xl shadow-slate-200/50 overflow-hidden">
                        {/* Decorative gradient orb */}
                        <div className="absolute -top-20 -right-20 w-48 h-48 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>

                        <div className="relative">
                            <div className="flex items-start justify-between mb-6">
                                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight pr-4">
                                    {problem.title}
                                </h1>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={handleToggleCompletion}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all duration-300 shadow-md hover:scale-105 active:scale-95 ${isCompleted
                                                ? 'bg-green-500 text-white hover:bg-green-600 shadow-green-200'
                                                : 'bg-white text-slate-500 hover:text-slate-700 border-2 border-slate-200 hover:border-slate-300'
                                            }`}
                                    >
                                        {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                                        <span>{isCompleted ? 'Completed' : 'Mark Complete'}</span>
                                    </button>
                                    <Sparkles className="w-8 h-8 text-purple-500 flex-shrink-0 mt-1" />
                                </div>
                            </div>

                            {/* Elegant divider */}
                            <div className="h-px bg-gradient-to-r from-slate-200 via-slate-300 to-transparent mb-6"></div>

                            <div className="flex flex-wrap gap-3">
                                <span className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-transform hover:scale-105 ${problem.difficulty === 'Easy'
                                    ? 'bg-gradient-to-br from-green-50 to-emerald-50 text-green-700 border-2 border-green-200' :
                                    problem.difficulty === 'Medium'
                                        ? 'bg-gradient-to-br from-yellow-50 to-amber-50 text-yellow-700 border-2 border-yellow-200' :
                                        'bg-gradient-to-br from-red-50 to-rose-50 text-red-700 border-2 border-red-200'
                                    }`}>
                                    {problem.difficulty}
                                </span>
                                <span className="inline-flex items-center gap-2 text-slate-700 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl border-2 border-slate-200 shadow-sm">
                                    <Tag className="w-4 h-4 text-slate-500" />
                                    <span className="font-medium">{problem.tags.join(', ')}</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Problem Statement */}
                    {problemSection && (
                        <div className="bg-white rounded-3xl p-10 border border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                                    <Code2 className="w-5 h-5 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900">Problem</h2>
                            </div>

                            {/* Subtle gradient divider */}
                            <div className="h-px bg-gradient-to-r from-blue-200 via-blue-100 to-transparent mb-8"></div>

                            <div className="prose prose-slate prose-lg max-w-none">
                                <MarkdownRenderer content={problemSection.replace('## Problem', '')} />
                            </div>
                        </div>
                    )}

                    {/* Test Cases */}
                    {testCasesSection && (
                        <div className="bg-white rounded-3xl p-10 border border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
                                    <TestTube className="w-5 h-5 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900">Test Cases</h2>
                            </div>

                            {/* Subtle gradient divider */}
                            <div className="h-px bg-gradient-to-r from-purple-200 via-purple-100 to-transparent mb-8"></div>

                            <div className="prose prose-slate prose-lg max-w-none">
                                <MarkdownRenderer content={testCasesSection.replace('## Test Cases', '')} />
                            </div>
                        </div>
                    )}

                    {/* Code Editor */}
                    <div className="bg-gradient-to-br from-white to-slate-50/50 rounded-3xl p-10 border border-slate-200/60 shadow-xl">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg">
                                    <Code2 className="w-5 h-5 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900">Your Solution</h2>
                            </div>
                        </div>

                        {/* Subtle gradient divider */}
                        <div className="h-px bg-gradient-to-r from-emerald-200 via-emerald-100 to-transparent mb-8"></div>

                        <CodeEditor
                            initialCode={userCode}
                            onChange={setUserCode}
                        />

                        {/* Action Button */}
                        <div className="flex gap-4 mt-8 pt-8 border-t border-slate-200">
                            <button
                                onClick={handleToggleSolution}
                                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-2xl hover:scale-105 active:scale-100"
                            >
                                {showSolution ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                <span>{showSolution ? 'Hide Solution' : 'View Solution'}</span>
                            </button>
                        </div>
                    </div>

                    {/* Solution Display - View Mode */}
                    {showSolution && solutionSection && (
                        <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-10 border border-slate-700 shadow-2xl overflow-hidden">
                            {/* Animated gradient top border */}
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse"></div>

                            {/* Decorative gradient orbs */}
                            <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>

                            <div className="relative">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="h-12 w-1.5 bg-gradient-to-b from-green-400 to-emerald-500 rounded-full shadow-lg shadow-green-500/50"></div>
                                    <h2 className="text-3xl font-bold text-white">Official Solution</h2>
                                    <div className="ml-auto">
                                        <Sparkles className="w-6 h-6 text-purple-400" />
                                    </div>
                                </div>

                                {/* Elegant divider */}
                                <div className="h-px bg-gradient-to-r from-slate-700 via-slate-600 to-transparent mb-8"></div>

                                <div className="prose prose-invert prose-lg max-w-none">
                                    <MarkdownRenderer content={solutionSection.replace('## Solution', '')} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Approach - Collapsible */}
                    {approachSection && (
                        <div className="bg-white rounded-3xl border border-slate-200/60 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                            <button
                                onClick={() => setApproachExpanded(!approachExpanded)}
                                className="w-full flex items-center justify-between p-10 text-left hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50/30 transition-all duration-300 group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 bg-gradient-to-br rounded-xl shadow-lg transition-all duration-300 ${approachExpanded
                                        ? 'from-orange-500 to-amber-600'
                                        : 'from-blue-500 to-indigo-600'
                                        }`}>
                                        <Lightbulb className="w-5 h-5 text-white" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900">Approach & Strategy</h2>
                                </div>
                                <div className={`p-2 rounded-xl transition-all duration-300 ${approachExpanded ? 'bg-slate-100' : 'bg-slate-50 group-hover:bg-slate-100'
                                    }`}>
                                    {approachExpanded ? (
                                        <ChevronUp className="w-6 h-6 text-slate-600" />
                                    ) : (
                                        <ChevronDown className="w-6 h-6 text-slate-600" />
                                    )}
                                </div>
                            </button>

                            {approachExpanded && (
                                <div className="px-10 pb-10">
                                    {/* Gradient divider */}
                                    <div className="h-px bg-gradient-to-r from-orange-200 via-amber-100 to-transparent mb-8"></div>

                                    <div className="prose prose-slate prose-lg max-w-none">
                                        <MarkdownRenderer content={approachSection.replace('## Approach', '')} />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProblemDetail;
