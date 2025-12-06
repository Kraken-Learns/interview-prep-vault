import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { AlertCircle, AlertTriangle, Lightbulb, Info, Flame } from 'lucide-react';
import MermaidDiagram from './MermaidDiagram';
import './MarkdownRenderer.css';

interface MarkdownRendererProps {
    content: string;
}

const AlertBlock = ({ type, children }: { type: string, children: React.ReactNode }) => {
    const getAlertConfig = (type: string) => {
        switch (type.toLowerCase()) {
            case 'tip':
                return {
                    icon: Lightbulb,
                    title: 'Pro Tip',
                    className: 'bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-200',
                    iconColor: 'text-emerald-600 dark:text-emerald-400',
                    titleColor: 'text-emerald-800 dark:text-emerald-300'
                };
            case 'note':
                return {
                    icon: Info,
                    title: 'Note',
                    className: 'bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-500/10 dark:border-blue-500/20 dark:text-blue-200',
                    iconColor: 'text-blue-600 dark:text-blue-400',
                    titleColor: 'text-blue-800 dark:text-blue-300'
                };
            case 'important':
                return {
                    icon: AlertCircle,
                    title: 'Important',
                    className: 'bg-purple-50 border-purple-200 text-purple-900 dark:bg-purple-500/10 dark:border-purple-500/20 dark:text-purple-200',
                    iconColor: 'text-purple-600 dark:text-purple-400',
                    titleColor: 'text-purple-800 dark:text-purple-300'
                };
            case 'warning':
                return {
                    icon: AlertTriangle,
                    title: 'Warning',
                    className: 'bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-200',
                    iconColor: 'text-amber-600 dark:text-amber-400',
                    titleColor: 'text-amber-800 dark:text-amber-300'
                };
            case 'caution':
                return {
                    icon: Flame,
                    title: 'Caution',
                    className: 'bg-red-50 border-red-200 text-red-900 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-200',
                    iconColor: 'text-red-600 dark:text-red-400',
                    titleColor: 'text-red-800 dark:text-red-300'
                };
            default:
                return {
                    icon: Info,
                    title: 'Note',
                    className: 'bg-slate-50 border-slate-200 text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200',
                    iconColor: 'text-slate-600 dark:text-slate-400',
                    titleColor: 'text-slate-800 dark:text-slate-300'
                };
        }
    };

    const config = getAlertConfig(type);
    const Icon = config.icon;

    return (
        <div className={`my-8 rounded-xl border p-5 transition-all duration-300 hover:shadow-sm ${config.className}`}>
            <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg bg-white/50 dark:bg-white/5 shadow-sm ring-1 ring-inset ring-black/5 dark:ring-white/5`}>
                    <Icon className={`w-5 h-5 ${config.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                    <div className={`text-sm font-bold uppercase tracking-wider mb-2 ${config.titleColor}`}>
                        {config.title}
                    </div>
                    <div className="text-base leading-relaxed [&>p:first-child]:mt-0 [&>p:last-child]:mb-0 relative">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
    return (
        <div className="markdown-content prose dark:prose-invert max-w-none
            
            /* Text & Headings - Optimized for readability and hierarchy */
            prose-headings:font-bold prose-headings:tracking-tight 
            prose-h1:text-4xl prose-h1:font-extrabold prose-h1:mb-8 prose-h1:text-slate-900 dark:prose-h1:text-white 
            prose-h1:border-b prose-h1:border-slate-200 dark:prose-h1:border-white/10 prose-h1:pb-6
            
            prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-slate-800 dark:prose-h2:text-slate-100
            prose-h2:border-b prose-h2:border-slate-100 dark:prose-h2:border-white/5 prose-h2:pb-2
            
            prose-h3:text-2xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-slate-800 dark:prose-h3:text-slate-200
            
            prose-p:text-lg prose-p:leading-8 prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-p:my-6
            
            /* Links */
            prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-a:font-medium prose-a:transition-colors
            
            /* Inline Code */
            prose-code:text-slate-800 dark:prose-code:text-slate-200 
            prose-code:bg-slate-100 dark:prose-code:bg-white/10 
            prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md 
            prose-code:before:content-none prose-code:after:content-none 
            prose-code:font-mono prose-code:text-sm prose-code:font-medium
            
            /* Strong/Bold */
            prose-strong:text-slate-900 dark:prose-strong:text-white prose-strong:font-bold
            
            /* Lists */
            prose-li:text-lg prose-li:text-slate-600 dark:prose-li:text-slate-300 prose-li:my-2
            prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6 prose-ul:marker:text-slate-400 dark:prose-ul:marker:text-slate-500
            prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6 prose-ol:marker:text-slate-400 dark:prose-ol:marker:text-slate-500
            
            /* Blockquotes */
            prose-blockquote:border-l-4 prose-blockquote:border-blue-500 
            prose-blockquote:bg-slate-50 dark:prose-blockquote:bg-white/5 
            prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:pr-4 
            prose-blockquote:rounded-r-lg prose-blockquote:italic 
            prose-blockquote:text-slate-700 dark:prose-blockquote:text-slate-300
            prose-blockquote:not-italic
            
            /* Images */
            prose-img:rounded-xl prose-img:shadow-lg prose-img:border prose-img:border-slate-200 dark:prose-img:border-white/10
            
            /* Spacing overrides */
            [&>p]:my-6 [&>ul]:my-6 [&>ol]:my-6 [&>ul>li]:my-2 [&>ol>li]:my-2
            
            /* Table Styles - Modern & Clean */
            prose-table:w-full prose-table:my-8 prose-table:border-collapse prose-table:text-left prose-table:overflow-hidden prose-table:rounded-lg prose-table:shadow-sm prose-table:border prose-table:border-slate-200 dark:prose-table:border-white/10
            
            prose-th:font-semibold prose-th:text-sm prose-th:uppercase prose-th:tracking-wider prose-th:text-slate-700 dark:prose-th:text-slate-200 
            prose-th:border-b prose-th:border-slate-200 dark:prose-th:border-white/10 
            prose-th:p-4 prose-th:bg-slate-50 dark:prose-th:bg-white/5
            
            prose-td:border-b prose-td:border-slate-200 dark:prose-td:border-white/5 
            prose-td:p-4 prose-td:text-slate-600 dark:prose-td:text-slate-300 
            prose-td:align-top prose-td:text-base selection:bg-blue-100 dark:selection:bg-blue-900
            ">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    blockquote({ node, children, ...props }: any) {
                        // Check for alerts
                        const childArray = React.Children.toArray(children);

                        // Helper to traverse and find the text content
                        const findAlertPattern = (nodes: React.ReactNode[]): { type: string | null, remainingContent: React.ReactNode[] } | null => {
                            for (let i = 0; i < nodes.length; i++) {
                                const child = nodes[i];
                                // Skip whitespace strings provided they are just newlines/spaces
                                if (typeof child === 'string' && !child.trim()) {
                                    continue;
                                }

                                if (React.isValidElement(child) && child.type === 'p') {
                                    const pChildren = React.Children.toArray(child.props.children);
                                    const firstPChild = pChildren[0];

                                    if (typeof firstPChild === 'string') {
                                        const match = firstPChild.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/i);
                                        if (match) {
                                            const type = match[1];
                                            // Ensure we remove the tag and the following newline/space
                                            let newText = firstPChild.slice(match[0].length);
                                            // Remove leading newline/space if present right after tag
                                            newText = newText.replace(/^\s+/, '');

                                            // Reconstruct the paragraph
                                            const newPChildren = [newText, ...pChildren.slice(1)];
                                            const newP = React.cloneElement(child, {
                                                ...child.props,
                                                children: newPChildren
                                            } as any);

                                            // Return the type and the modified children array
                                            // We replace the current 'p' with 'newP' in the original list
                                            const newNodes = [...nodes];
                                            newNodes[i] = newP;
                                            return { type, remainingContent: newNodes };
                                        }
                                    }
                                }
                                // If we hit a non-empty string or non-p element that isn't whitespace, stop searching
                                // Alerts must be at the start of the blockquote
                                return null;
                            }
                            return null;
                        };

                        const result = findAlertPattern(childArray);

                        if (result && result.type) {
                            return (
                                <AlertBlock type={result.type}>
                                    {result.remainingContent}
                                </AlertBlock>
                            );
                        }

                        // Default blockquote
                        return (
                            <blockquote {...props}>
                                {children}
                            </blockquote>
                        );
                    },
                    code({ node, inline, className, children, ...props }: any) {
                        const match = /language-(\w+)/i.exec(className || '');
                        const language = match ? match[1].toLowerCase() : '';

                        // Extract text content from children (handle string or array)
                        let codeString = '';
                        if (typeof children === 'string') {
                            codeString = children;
                        } else if (Array.isArray(children)) {
                            codeString = children.join('');
                        } else {
                            codeString = String(children || '');
                        }

                        // Clean up: remove trailing newline
                        codeString = codeString.replace(/\n$/, '');

                        if (!inline && language === 'mermaid') {
                            return <MermaidDiagram chart={codeString} />;
                        }

                        return !inline && match ? (
                            <div className="rounded-xl overflow-hidden my-6 shadow-lg border border-white/10 bg-[#1e1e1e]">
                                <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-white/5">
                                    <div className="flex space-x-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                                    </div>
                                    <div className="text-xs text-slate-500 font-mono uppercase tracking-wider">
                                        {language || 'text'}
                                    </div>
                                </div>
                                <SyntaxHighlighter
                                    {...props}
                                    style={vscDarkPlus}
                                    language={language}
                                    PreTag="div"
                                    showLineNumbers={true}
                                    codeTagProps={{
                                        style: {
                                            backgroundColor: 'transparent',
                                            padding: 0,
                                            margin: 0,
                                        },
                                        className: '!bg-transparent !p-0 !m-0 !box-border'
                                    }}
                                    customStyle={{
                                        margin: 0,
                                        padding: '1.5rem',
                                        background: 'transparent',
                                        fontSize: '0.9rem',
                                        lineHeight: '1.6',
                                    }}
                                >
                                    {codeString}
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
