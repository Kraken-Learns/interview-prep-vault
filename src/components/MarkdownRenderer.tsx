import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { AlertCircle, AlertTriangle, Lightbulb, Info, Flame, CheckCircle } from 'lucide-react';
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
                    title: 'Tip',
                    className: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-900 dark:text-emerald-200',
                    iconColor: 'text-emerald-500'
                };
            case 'note':
                return {
                    icon: Info,
                    title: 'Note',
                    className: 'bg-blue-500/10 border-blue-500/20 text-blue-900 dark:text-blue-200',
                    iconColor: 'text-blue-500'
                };
            case 'important':
                return {
                    icon: AlertCircle,
                    title: 'Important',
                    className: 'bg-purple-500/10 border-purple-500/20 text-purple-900 dark:text-purple-200',
                    iconColor: 'text-purple-500'
                };
            case 'warning':
                return {
                    icon: AlertTriangle,
                    title: 'Warning',
                    className: 'bg-amber-500/10 border-amber-500/20 text-amber-900 dark:text-amber-200',
                    iconColor: 'text-amber-500'
                };
            case 'caution':
                return {
                    icon: Flame,
                    title: 'Caution',
                    className: 'bg-red-500/10 border-red-500/20 text-red-900 dark:text-red-200',
                    iconColor: 'text-red-500'
                };
            default:
                return {
                    icon: Info,
                    title: 'Note',
                    className: 'bg-slate-500/10 border-slate-500/20 text-slate-900 dark:text-slate-200',
                    iconColor: 'text-slate-500'
                };
        }
    };

    const config = getAlertConfig(type);
    const Icon = config.icon;

    return (
        <div className={`my-6 rounded-lg border p-4 ${config.className}`}>
            <div className="flex items-start gap-3">
                <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${config.iconColor}`} />
                <div className="text-base leading-7">
                    {/* Add title if needed, or just content */}
                    {/* <div className={`font-bold mb-1 ${config.iconColor}`}>{config.title}</div> */}
                    <div className="[&>p:first-child]:mt-0 [&>p:last-child]:mb-0">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
    return (
        <div className="markdown-content prose dark:prose-invert prose-slate max-w-none 
            prose-headings:font-bold prose-headings:tracking-tight 
            prose-h1:text-4xl prose-h1:mb-8 prose-h1:text-slate-900 dark:prose-h1:text-white prose-h1:border-b prose-h1:border-slate-200 dark:prose-h1:border-white/10 prose-h1:pb-4
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-slate-800 dark:prose-h2:text-slate-100
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-slate-800 dark:prose-h3:text-slate-200
            prose-p:text-lg prose-p:leading-8 prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-p:my-6
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:font-medium
            prose-code:text-primary-dark dark:prose-code:text-primary-light prose-code:bg-primary/5 dark:prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none prose-code:font-mono prose-code:text-sm
            prose-strong:text-slate-900 dark:prose-strong:text-white prose-strong:font-bold
            prose-li:text-lg prose-li:text-slate-600 dark:prose-li:text-slate-300 prose-li:my-2
            prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
            prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
            prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:pl-6 prose-blockquote:py-2 prose-blockquote:pr-4 prose-blockquote:rounded-r-lg prose-blockquote:italic prose-blockquote:text-slate-700 dark:prose-blockquote:text-slate-300
            [&>p]:my-6 [&>ul]:my-6 [&>ol]:my-6 [&>ul>li]:my-2 [&>ol>li]:my-2
            
            /* Table Styles */
            prose-table:w-full prose-table:my-8 prose-table:border-collapse prose-table:text-left
            prose-th:font-bold prose-th:text-slate-900 dark:prose-th:text-slate-100 prose-th:border-b prose-th:border-slate-200 dark:prose-th:border-white/10 prose-th:p-4 prose-th:bg-slate-50 dark:prose-th:bg-white/5
            prose-td:border-b prose-td:border-slate-200 dark:prose-td:border-white/10 prose-td:p-4 prose-td:text-slate-600 dark:prose-td:text-slate-300 prose-td:align-top
            ">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    blockquote({ node, children, ...props }: any) {
                        // Check for alerts
                        const childArray = React.Children.toArray(children);

                        // Find the first paragraph-like element
                        let alertType = null;
                        let alertContent = children;

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
