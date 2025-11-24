import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const Header: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <header className="sticky top-0 z-50 glass border-b border-white/5 dark:border-white/5 border-black/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="relative p-2 rounded-xl bg-gradient-to-br from-primary to-accent-blue group-hover:shadow-glow transition-all duration-300">
                        <Code2 className="w-5 h-5 text-white" />
                        <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white group-hover:text-primary-glow transition-colors">
                        Prep<span className="text-primary">Vault</span>
                    </span>
                </Link>
                <nav className="flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-black/5 dark:border-white/10 transition-all duration-300 group"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? (
                            <Sun className="w-5 h-5 text-yellow-400 group-hover:rotate-90 transition-transform" />
                        ) : (
                            <Moon className="w-5 h-5 text-slate-600 group-hover:-rotate-12 transition-transform" />
                        )}
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Header;
