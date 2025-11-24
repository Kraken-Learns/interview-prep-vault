import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronUp, Eye, EyeOff, Bot, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getProblem } from '@/lib/problems';
import type { Problem } from '@/types';
import { useProgress } from '@/context/ProgressContext';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import CodeEditor from '@/components/CodeEditor';
import AIGuidance from '@/components/AIGuidance';

const ProblemDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [problem, setProblem] = useState<Problem | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedLanguage, setSelectedLanguage] = useState('python');
    const [userCode, setUserCode] = useState('');
    const [showSolution, setShowSolution] = useState(false);
    const [approachExpanded, setApproachExpanded] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [showAIGuidance, setShowAIGuidance] = useState(false);
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
                if (data) {
                    data.tags = data.tags.filter(t => t.toLowerCase() !== 'hellointerview');
                }
                setProblem(data);
                if (data?.starterCode && typeof data.starterCode === 'object') {
                    setUserCode(data.starterCode[selectedLanguage] || '');
                }
                setLoading(false);
            });
        }
    }, [slug]);

    // Update code when language changes
    useEffect(() => {
        if (problem?.starterCode && typeof problem.starterCode === 'object') {
            setUserCode(problem.starterCode[selectedLanguage] || '');
        }
    }, [selectedLanguage, problem]);

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
    const hintsSection = sections.find(s => s.startsWith('## Hints')) || '';

    // Parse solution for selected language
    const getSolutionForLanguage = () => {
        if (!solutionSection) return '';

        // Split solution section by language headers (### Language)
        const solutionParts = solutionSection.split(/(?=^###\s)/m);

        // Find the part that matches the selected language
        // Map internal keys to display names if necessary, or just use case-insensitive match
        const languageMap: Record<string, string> = {
            'python': 'Python',
            'cpp': 'C++',
            'java': 'Java',
            'javascript': 'JavaScript'
        };

        const targetHeader = `### ${languageMap[selectedLanguage]}`;
        const specificSolution = solutionParts.find(s => s.trim().startsWith(targetHeader));

        if (specificSolution) {
            return specificSolution.replace(targetHeader, '').trim();
        }

        // Fallback: if no specific language section found, return the whole thing or a default
        // For now, let's try to return the first code block if no specific section matches, 
        // or just return the whole section if it doesn't look like it has language subsections
        if (solutionParts.length <= 1) return solutionSection.replace('## Solution', '');

        return 'Solution not available for this language.';
    };

    const displayedSolution = getSolutionForLanguage();

    const handleToggleSolution = () => {
        setShowSolution(!showSolution);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-dark-bg pb-20 transition-colors duration-300">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-blue/5 rounded-full blur-[120px]" />
            </div>

            <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Back Button */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white mb-8 transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Problems</span>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-8rem)]">
                    {/* Left Column: Problem Description */}
                    <div className="space-y-6 overflow-y-auto custom-scrollbar pr-2 pb-20">
                        {/* Title Card */}
                        <div className="relative bg-white dark:bg-dark-layer1 rounded-2xl p-8 border border-black/5 dark:border-white/5 shadow-lg overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors duration-500" />

                            <div className="relative z-10">
                                <div className="flex flex-col gap-4 mb-6">
                                    <div className="flex items-start justify-between gap-4">
                                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
                                            {problem.title}
                                        </h1>
                                        <button
                                            onClick={handleToggleCompletion}
                                            className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all duration-300 ${isCompleted
                                                ? 'bg-green-500/20 text-green-600 dark:text-green-400 border border-green-500/50'
                                                : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-black/5 dark:border-white/10 hover:bg-green-500/10 hover:text-green-600 dark:hover:text-green-400 hover:border-green-500/30'
                                                }`}
                                        >
                                            {isCompleted ? (
                                                <>
                                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                                    <span>Solved</span>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500 group-hover:bg-green-500 transition-colors" />
                                                    <span>Mark Solved</span>
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        <div className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border ${problem.difficulty === 'Hard'
                                            ? 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20'
                                            : problem.difficulty === 'Medium'
                                                ? 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20'
                                                : 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20'
                                            }`}>
                                            {problem.difficulty}
                                        </div>
                                        {problem.tags.map(tag => (
                                            <span key={tag} className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 text-xs font-medium border border-black/5 dark:border-white/10">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Problem Content */}
                        <div className="space-y-8">
                            <section className="max-w-none">
                                <div className="bg-white dark:bg-dark-layer1 rounded-2xl p-6 border border-black/5 dark:border-white/5 shadow-sm">
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                        <div className="w-1 h-6 bg-primary rounded-full" />
                                        Problem Description
                                    </h2>
                                    <MarkdownRenderer content={problemSection.replace('## Problem', '')} />
                                </div>
                            </section>

                            {testCasesSection && (
                                <section className="bg-white dark:bg-dark-layer1 rounded-2xl p-6 border border-black/5 dark:border-white/5 shadow-sm">
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                        <div className="w-1 h-6 bg-accent-blue rounded-full" />
                                        Test Cases
                                    </h2>
                                    <MarkdownRenderer content={testCasesSection.replace('## Test Cases', '')} />
                                </section>
                            )}

                            {hintsSection && (
                                <section className="bg-white dark:bg-dark-layer1 rounded-2xl border border-black/5 dark:border-white/5 shadow-sm overflow-hidden">
                                    <button
                                        onClick={() => setShowHint(!showHint)}
                                        className="w-full flex items-center justify-between p-6 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                                    >
                                        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                            <div className="w-1 h-6 bg-yellow-500 rounded-full" />
                                            Hints
                                        </h2>
                                        {showHint ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
                                    </button>
                                    {showHint && (
                                        <div className="p-6 pt-0 border-t border-black/5 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02]">
                                            <MarkdownRenderer content={hintsSection.replace('## Hints', '')} />
                                        </div>
                                    )}
                                </section>
                            )}

                            {approachSection && (
                                <section className="bg-white dark:bg-dark-layer1 rounded-2xl border border-black/5 dark:border-white/5 shadow-sm overflow-hidden">
                                    <button
                                        onClick={() => setApproachExpanded(!approachExpanded)}
                                        className="w-full flex items-center justify-between p-6 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                                    >
                                        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                            <div className="w-1 h-6 bg-purple-500 rounded-full" />
                                            Approach & Strategy
                                        </h2>
                                        {approachExpanded ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
                                    </button>
                                    {approachExpanded && (
                                        <div className="p-6 pt-0 border-t border-black/5 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02]">
                                            <MarkdownRenderer content={approachSection.replace('## Approach', '')} />
                                        </div>
                                    )}
                                </section>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Code Editor */}
                    <div className="h-full overflow-hidden">
                        <div className="h-full bg-[#1e1e1e] rounded-2xl border border-black/5 dark:border-white/5 shadow-2xl flex flex-col overflow-hidden">
                            {/* Editor Header */}
                            <div className="flex items-center justify-between p-4 border-b border-white/5 bg-[#252526]">
                                <div className="flex items-center gap-3">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                                        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                                    </div>
                                    <span className="text-sm font-medium text-slate-400 ml-2">Solution Editor</span>
                                </div>
                                <div className="relative">
                                    <select
                                        value={selectedLanguage}
                                        onChange={(e) => setSelectedLanguage(e.target.value)}
                                        className="appearance-none bg-[#1e1e1e] border border-white/10 text-slate-300 py-1.5 pl-3 pr-8 rounded-lg text-sm font-medium focus:outline-none focus:border-primary hover:border-white/20 transition-colors cursor-pointer"
                                    >
                                        <option value="python">Python</option>
                                        <option value="cpp">C++</option>
                                        <option value="java">Java</option>
                                        <option value="javascript">JavaScript</option>
                                    </select>
                                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
                                </div>
                            </div>

                            {/* Main Content Area (Editor + Solution) */}
                            <div className="flex-1 flex flex-col min-h-0 relative">
                                {/* Editor */}
                                <div className={`${showSolution ? 'h-1/2 border-b border-white/5' : 'h-full'} relative transition-all duration-300`}>
                                    <CodeEditor
                                        initialCode={userCode}
                                        onChange={setUserCode}
                                        language={selectedLanguage}
                                    />
                                </div>

                                {/* Solution View */}
                                {showSolution && displayedSolution && (
                                    <div className="h-1/2 flex flex-col bg-white dark:bg-dark-layer1 animate-fade-in">
                                        <div className="flex items-center justify-between p-4 border-b border-black/5 dark:border-white/5 bg-slate-50 dark:bg-dark-layer2">
                                            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                                <Sparkles className="w-4 h-4 text-primary" />
                                                Official Solution
                                            </h3>
                                            <span className="text-xs font-mono text-slate-500 uppercase">{selectedLanguage}</span>
                                        </div>
                                        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                                            <MarkdownRenderer content={displayedSolution} />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Editor Actions */}
                            <div className="p-4 border-t border-white/5 bg-[#252526] flex gap-3 z-10">
                                <button
                                    onClick={handleToggleSolution}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#1e1e1e] border border-white/10 text-slate-300 font-semibold rounded-xl hover:bg-white/5 hover:text-white transition-all"
                                >
                                    {showSolution ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    <span>{showSolution ? 'Hide Solution' : 'View Solution'}</span>
                                </button>
                                <button
                                    onClick={() => setShowAIGuidance(true)}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all shadow-glow hover:shadow-glow-strong"
                                >
                                    <Bot className="w-4 h-4" />
                                    <span>AI Guidance</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* AI Guidance Sidebar */}
            {showAIGuidance && problem && (
                <AIGuidance
                    problem={problem}
                    userCode={userCode}
                    language={selectedLanguage}
                    onClose={() => setShowAIGuidance(false)}
                />
            )}
        </div>
    );
};

export default ProblemDetail;
