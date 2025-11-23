import React from 'react';
import Header from './Header';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-slate-200">
            <Header />
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
            <footer className="py-6 text-center text-slate-400 text-sm">
                <p>© {new Date().getFullYear()} Interview Prep</p>
            </footer>
        </div>
    );
};

export default Layout;
