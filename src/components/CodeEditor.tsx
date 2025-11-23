import React from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
    initialCode?: string;
    onChange?: (code: string) => void;
    readOnly?: boolean;
    language?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
    initialCode = '',
    onChange,
    readOnly = false,
    language = 'python'
}) => {
    const handleEditorChange = (value: string | undefined) => {
        if (value !== undefined && onChange) {
            onChange(value);
        }
    };

    const getExtension = (lang: string) => {
        switch (lang) {
            case 'python': return 'py';
            case 'cpp': return 'cpp';
            case 'java': return 'java';
            case 'javascript': return 'js';
            default: return 'txt';
        }
    };

    return (
        <div className="rounded-xl overflow-hidden border border-slate-700 shadow-2xl">
            {/* Editor Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d30] border-b border-slate-700">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="ml-3 text-xs text-slate-400 font-mono">solution.{getExtension(language)}</span>
                </div>
                <span className="text-xs text-slate-400 uppercase">{language}</span>
            </div>

            {/* Monaco Editor */}
            <Editor
                height="400px"
                language={language}
                value={initialCode}
                onChange={handleEditorChange}
                theme="vs-dark"
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    fontFamily: "'Fira Code', 'Consolas', monospace",
                    lineNumbers: 'on',
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 4,
                    insertSpaces: true,
                    wordWrap: 'on',
                    readOnly: readOnly,
                    padding: { top: 16, bottom: 16 },
                    renderLineHighlight: 'all',
                    cursorBlinking: 'smooth',
                    smoothScrolling: true,
                    contextmenu: true,
                    folding: true,
                    lineDecorationsWidth: 10,
                    lineNumbersMinChars: 3,
                    glyphMargin: false,
                    renderWhitespace: 'selection',
                    bracketPairColorization: {
                        enabled: true,
                    },
                    guides: {
                        indentation: true,
                        bracketPairs: true,
                    },
                    suggest: {
                        showKeywords: true,
                        showSnippets: true,
                    },
                    quickSuggestions: {
                        other: true,
                        comments: false,
                        strings: false,
                    },
                }}
            />
        </div>
    );
};

export default CodeEditor;
