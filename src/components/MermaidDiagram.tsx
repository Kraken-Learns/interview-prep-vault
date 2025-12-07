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
        <div
            ref={containerRef}
            className={`
                flex justify-center my-8 p-6 rounded-xl overflow-x-auto transition-colors duration-300 max-w-2xl mx-auto
                ${isDark
                    ? 'bg-white/5 border border-white/10'
                    : 'bg-white border border-slate-200'
                }
            `}
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    );
};

export default MermaidDiagram;
