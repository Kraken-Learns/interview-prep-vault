import React from 'react';
import Header from './Header';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-dark-bg text-slate-900 dark:text-slate-200 font-sans selection:bg-primary selection:text-white overflow-x-hidden transition-colors duration-300">
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accent-blue/10 blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
            </div>

            <Header />

            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>

            <footer className="relative z-10 py-8 text-center text-slate-500 text-sm border-t border-white/5 mt-12">
                <p>© {new Date().getFullYear()} Interview Prep Vault</p>
            </footer>
        </div>
    );
};

export default Layout;
