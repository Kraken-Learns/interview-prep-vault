import React from 'react';
import MiniProgressRing from './MiniProgressRing';
import type { LucideIcon } from 'lucide-react';

interface SystemDesignCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    totalArticles: number;
    readArticles: number;
    onClick: () => void;
}

const SystemDesignCard: React.FC<SystemDesignCardProps> = ({
    title,
    description,
    icon: Icon,
    totalArticles,
    readArticles,
    onClick,
}) => {
    const progress = totalArticles > 0 ? (readArticles / totalArticles) * 100 : 0;

    return (
        <div
            onClick={onClick}
            className="group relative bg-white dark:bg-dark-layer1 rounded-2xl p-6 border border-black/10 dark:border-white/10 hover:border-primary/50 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-glow overflow-hidden"
        >
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <Icon className="w-24 h-24 text-primary" />
            </div>

            <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2.5 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                            <Icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                            {title}
                        </h3>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        {description}
                    </p>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-slate-900 dark:text-white">
                            {readArticles}
                            <span className="text-slate-400 dark:text-slate-500 text-lg font-medium">
                                /{totalArticles}
                            </span>
                        </span>
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Articles Read
                        </span>
                    </div>
                    <div className="scale-100 origin-right">
                        <MiniProgressRing progress={progress} size={60} strokeWidth={6} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SystemDesignCard;
