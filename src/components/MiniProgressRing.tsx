import React from 'react';

interface MiniProgressRingProps {
    progress: number; // 0 to 100
    size?: number;
    strokeWidth?: number;
}

const MiniProgressRing: React.FC<MiniProgressRingProps> = ({
    progress,
    size = 60,
    strokeWidth = 6
}) => {
    const radius = size / 2;
    const normalizedRadius = radius - strokeWidth * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            {/* Glow effect */}
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full transform scale-90"></div>

            <svg
                height={size}
                width={size}
                className="transform -rotate-90 drop-shadow-lg"
            >
                {/* Background Circle */}
                <circle
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    className="text-slate-200 dark:text-white/10"
                />
                {/* Progress Circle */}
                <circle
                    stroke="url(#miniProgressGradient)"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference + ' ' + circumference}
                    style={{ strokeDashoffset, transition: 'stroke-dashoffset 1s ease-out' }}
                    strokeLinecap="round"
                    fill="transparent"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
                {/* Gradient Definition */}
                <defs>
                    <linearGradient id="miniProgressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="50%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Center Text */}
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {Math.round(progress)}%
                </span>
            </div>
        </div>
    );
};

export default MiniProgressRing;
