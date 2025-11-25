import React from 'react';
import { Trash2, Trophy, Sparkles } from 'lucide-react';

interface ProgressRingProps {
    total: number;
    completed: number;
    onClearProgress: () => void;
}

const ProgressRing: React.FC<ProgressRingProps> = ({ total, completed, onClearProgress }) => {
    const radius = 70;
    const stroke = 8;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = total === 0 ? circumference : circumference - (completed / total) * circumference;
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

    return (
        <div className="relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:shadow-glow group bg-purple-50/50 dark:bg-dark-layer1 border border-purple-100 dark:border-white/5">
            {/* Distinct Background with Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 z-0"></div>

            {/* Glitter/Sparkle Effects */}
            <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-2 right-4 text-yellow-400 animate-pulse" style={{ animationDuration: '2s' }}>
                    <Sparkles className="w-4 h-4 opacity-60" />
                </div>
                <div className="absolute bottom-6 left-4 text-blue-400 animate-pulse" style={{ animationDuration: '3s', animationDelay: '0.5s' }}>
                    <Sparkles className="w-3 h-3 opacity-50" />
                </div>
                <div className="absolute top-1/2 right-2 text-purple-400 animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '1s' }}>
                    <Sparkles className="w-2 h-2 opacity-40" />
                </div>
                {/* Animated Orbs */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl animate-float"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent-purple/10 dark:bg-accent-purple/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
            </div>

            <div className="relative z-10 flex flex-col items-center">
                <div className="relative mb-4">
                    {/* Glow effect behind the ring */}
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full transform scale-90"></div>

                    <svg
                        height={radius * 2}
                        width={radius * 2}
                        className="transform -rotate-90 transition-all duration-1000 ease-out drop-shadow-lg"
                    >
                        {/* Background Circle */}
                        <circle
                            stroke="currentColor"
                            strokeWidth={stroke}
                            fill="transparent"
                            r={normalizedRadius}
                            cx={radius}
                            cy={radius}
                            className="text-purple-200 dark:text-white/10"
                        />
                        {/* Progress Circle */}
                        <circle
                            stroke="url(#progressGradient)"
                            strokeWidth={stroke}
                            strokeDasharray={circumference + ' ' + circumference}
                            style={{ strokeDashoffset }}
                            strokeLinecap="round"
                            fill="transparent"
                            r={normalizedRadius}
                            cx={radius}
                            cy={radius}
                            className="transition-all duration-1000 ease-out"
                        />
                        {/* Gradient Definition */}
                        <defs>
                            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#3b82f6" />
                                <stop offset="50%" stopColor="#8b5cf6" />
                                <stop offset="100%" stopColor="#ec4899" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Center Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-black text-slate-900 dark:text-white drop-shadow-md">
                            {percentage}%
                        </span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mt-0.5">Done</span>
                    </div>
                </div>

                <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-2 mb-1">
                        <div className="p-1.5 bg-slate-100 dark:bg-white/10 rounded-full shadow-inner border border-slate-200 dark:border-white/10">
                            <Trophy className="w-3.5 h-3.5 text-yellow-500 dark:text-yellow-400" />
                        </div>
                        <span className="font-bold text-lg text-slate-900 dark:text-white">{completed} <span className="text-slate-500 text-sm font-medium">/ {total}</span></span>
                    </div>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Problems Solved</p>
                </div>

                {completed > 0 && (
                    <button
                        onClick={onClearProgress}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-red-50 dark:hover:bg-red-500/20 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-all duration-300 text-xs font-bold border border-slate-200 dark:border-white/10 hover:border-red-200 dark:hover:border-red-500/50 shadow-lg hover:shadow-red-500/10 group/btn backdrop-blur-sm"
                    >
                        <Trash2 className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
                        Reset Progress
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProgressRing;
