import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownRendererProps {
    content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
    return (
        <div className="prose dark:prose-invert prose-slate max-w-none 
            prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900 dark:prose-headings:text-white
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline 
            prose-code:text-primary-dark dark:prose-code:text-primary-light prose-code:bg-black/5 dark:prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none 
            prose-strong:text-slate-900 dark:prose-strong:text-white 
            prose-p:text-slate-600 dark:prose-p:text-slate-300 
            prose-li:text-slate-600 dark:prose-li:text-slate-300">
            <ReactMarkdown
                components={{
                    code({ node, inline, className, children, ...props }: any) {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                            <div className="rounded-xl overflow-hidden my-6 shadow-lg border border-white/10 bg-[#1e1e1e]">
                                <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-white/5">
                                    <div className="flex space-x-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                                    </div>
                                    <div className="text-xs text-slate-500 font-mono uppercase tracking-wider">
                                        {match[1]}
                                    </div>
                                </div>
                                <SyntaxHighlighter
                                    {...props}
                                    style={vscDarkPlus}
                                    language={match[1]}
                                    PreTag="div"
                                    showLineNumbers={true}
                                    customStyle={{
                                        margin: 0,
                                        padding: '1.5rem',
                                        background: 'transparent',
                                        fontSize: '0.9rem',
                                        lineHeight: '1.6',
                                    }}
                                >
                                    {String(children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                            </div>
                        ) : (
                            <code {...props} className={className}>
                                {children}
                            </code>
                        );
                    },
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownRenderer;
