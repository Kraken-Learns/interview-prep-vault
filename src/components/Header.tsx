import React from 'react';
import { Link } from 'react-router-dom';
import { Code2 } from 'lucide-react';

const Header: React.FC = () => {
    return (
        <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-slate-200/50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-slate-200 transition-colors">
                        <Code2 className="w-5 h-5 text-slate-700" />
                    </div>
                    <span className="font-semibold text-slate-800 tracking-tight">PrepVault</span>
                </Link>
                <nav className="flex gap-4">
                    {/* Add more links here if needed */}
                </nav>
            </div>
        </header>
    );
};

export default Header;
