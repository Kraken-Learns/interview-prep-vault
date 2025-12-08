import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
    chart: string;
}

// Helper to get current theme
const isDarkMode = () => document.documentElement.classList.contains('dark');

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [svg, setSvg] = useState<string>('');
    const [isDark, setIsDark] = useState(isDarkMode());
    const [isZoomed, setIsZoomed] = useState(false);

    // Listen for theme changes
    useEffect(() => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    setIsDark(isDarkMode());
                }
            });
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const renderChart = async () => {
            if (containerRef.current && chart) {
                try {
                    // Unique ID for this diagram
                    const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

                    const theme = 'base';
                    const variables = isDark
                        ? {
                            // Dark Mode - High Contrast Fix
                            darkMode: true,
                            background: 'transparent',
                            // CRITICAL FIX: To handle hardcoded pastel nodes in dark mode, text MUST be dark.
                            primaryTextColor: '#0f172a', // Dark Slate 900
                            nodeTextColor: '#0f172a',
                            textColor: '#0f172a',
                            noteTextColor: '#0f172a',

                            // Structural elements needs to be visible against dark bg
                            lineColor: '#94a3b8',     // Slate 400
                            primaryColor: '#e2e8f0',  // Fallback node bg (Light)
                            primaryBorderColor: '#64748b',
                            fontSize: '15px',
                        }
                        : {
                            // Light Mode - Clean
                            darkMode: false,
                            background: 'transparent',
                            primaryTextColor: '#0f172a',
                            nodeTextColor: '#0f172a',
                            textColor: '#0f172a',
                            noteTextColor: '#0f172a',
                            lineColor: '#64748b',
                            primaryColor: '#ffffff',
                            primaryBorderColor: '#94a3b8',
                            fontSize: '15px',
                        };

                    // Re-initialize for this render
                    mermaid.initialize({
                        startOnLoad: false,
                        theme: theme,
                        securityLevel: 'loose',
                        themeVariables: variables,
                        fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
                        flowchart: {
                            htmlLabels: true,
                            curve: 'basis',
                        },
                    });

                    // Render
                    const { svg } = await mermaid.render(id, chart);

                    // Post-process to ensure transparency and scaling
                    // max-w-2xl allows a good medium size
                    const cleanSvg = svg
                        .replace(/style="[^"]*background-color:[^;"]*;?[^"]*"/g, 'style="background-color: transparent;"')
                        .replace(/id="[^"]*"/, `id="${id}" style="background: transparent; max-width: 100%;"`);

                    setSvg(cleanSvg);
                } catch (error) {
                    console.error('Failed to render mermaid chart:', error);
                    setSvg(`<div class="text-red-500 font-mono text-sm p-4">Failed to render diagram</div>`);
                }
            }
        };

        renderChart();
    }, [chart, isDark]);

    return (
        <>
            <div
                ref={containerRef}
                onClick={() => setIsZoomed(true)}
                className={`
                    flex justify-center my-8 p-6 rounded-xl overflow-x-auto transition-colors duration-300 max-w-2xl mx-auto cursor-pointer hover:ring-2 hover:ring-blue-500/20
                    ${isDark
                        ? 'bg-white/5 border border-white/10'
                        : 'bg-white border border-slate-200'
                    }
                `}
                dangerouslySetInnerHTML={{ __html: svg }}
                title="Click to zoom"
            />

            {/* Zoom Overlay */}
            {isZoomed && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
                    onClick={() => setIsZoomed(false)}
                >
                    <div
                        className="relative max-w-[90vw] max-h-[90vh] overflow-auto bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setIsZoomed(false)}
                            className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                        <div dangerouslySetInnerHTML={{ __html: svg }} className="min-w-[50vw]" />
                    </div>
                </div>
            )}
        </>
    );
};

export default MermaidDiagram;
