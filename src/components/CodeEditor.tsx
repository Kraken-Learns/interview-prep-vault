import React, { useState, useRef, type KeyboardEvent } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeEditorProps {
    initialCode?: string;
    onChange?: (code: string) => void;
    readOnly?: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
    initialCode = '',
    onChange,
    readOnly = false
}) => {
    const [code, setCode] = useState(initialCode);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newCode = e.target.value;
        setCode(newCode);
        onChange?.(newCode);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const textarea = textareaRef.current;
            if (!textarea) return;

            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const newCode = code.substring(0, start) + '    ' + code.substring(end);

            setCode(newCode);
            onChange?.(newCode);

            // Set cursor position after the inserted spaces
            setTimeout(() => {
                textarea.selectionStart = textarea.selectionEnd = start + 4;
            }, 0);
        }
    };

    const lineCount = code.split('\n').length;

    return (
        <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-[#1e1e1e] shadow-2xl">
            {/* Editor Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d30] border-b border-slate-700">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="ml-3 text-xs text-slate-400 font-mono">solution.py</span>
                </div>
                <span className="text-xs text-slate-400">Python</span>
            </div>

            {/* Editor Content */}
            <div className="relative">
                {/* Line Numbers */}
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-[#1e1e1e] border-r border-slate-700 pt-4 pb-4 text-right pr-3 select-none pointer-events-none z-10">
                    {Array.from({ length: lineCount }, (_, i) => (
                        <div key={i} className="text-xs text-slate-500 leading-6 font-mono">
                            {i + 1}
                        </div>
                    ))}
                </div>

                {/* Code Display (Syntax Highlighted) */}
                <div className="absolute left-12 top-0 right-0 bottom-0 overflow-hidden pointer-events-none">
                    <SyntaxHighlighter
                        language="python"
                        style={vscDarkPlus}
                        customStyle={{
                            margin: 0,
                            padding: '1rem 1rem',
                            background: 'transparent',
                            fontSize: '0.875rem',
                            lineHeight: '1.5rem',
                            fontFamily: "'Fira Code', 'Consolas', monospace",
                        }}
                        codeTagProps={{
                            style: {
                                fontFamily: "'Fira Code', 'Consolas', monospace",
                            }
                        }}
                    >
                        {code || ' '}
                    </SyntaxHighlighter>
                </div>

                {/* Textarea (Invisible but functional) */}
                <textarea
                    ref={textareaRef}
                    value={code}
                    onChange={handleCodeChange}
                    onKeyDown={handleKeyDown}
                    readOnly={readOnly}
                    spellCheck={false}
                    className="relative block w-full pl-12 pr-4 py-4 bg-transparent text-transparent caret-white outline-none resize-none font-mono text-sm leading-6 z-20"
                    style={{
                        minHeight: '300px',
                        fontFamily: "'Fira Code', 'Consolas', monospace",
                        caretColor: 'white',
                    }}
                />
            </div>
        </div>
    );
};

export default CodeEditor;
