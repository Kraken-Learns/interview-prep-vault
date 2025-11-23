import React from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
    initialCode?: string;
    onChange?: (code: string) => void;
    readOnly?: boolean;
}

const LANGUAGES = [
    { id: 'python', name: 'Python', ext: 'py' },
    { id: 'cpp', name: 'C++', ext: 'cpp' },
    { id: 'java', name: 'Java', ext: 'java' },
    { id: 'javascript', name: 'JavaScript', ext: 'js' },
];

const CodeEditor: React.FC<CodeEditorProps> = ({
    initialCode = '',
    onChange,
    readOnly = false
}) => {
    const [language, setLanguage] = React.useState(LANGUAGES[0]);

    const handleEditorChange = (value: string | undefined) => {
        if (value !== undefined && onChange) {
            onChange(value);
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
                    <span className="ml-3 text-xs text-slate-400 font-mono">solution.{language.ext}</span>
                </div>

                {!readOnly ? (
                    <select
                        value={language.id}
                        onChange={(e) => setLanguage(LANGUAGES.find(l => l.id === e.target.value) || LANGUAGES[0])}
                        className="bg-[#3e3e42] text-slate-300 text-xs rounded px-2 py-1 border border-slate-600 focus:outline-none focus:border-blue-500"
                    >
                        {LANGUAGES.map(lang => (
                            <option key={lang.id} value={lang.id}>{lang.name}</option>
                        ))}
                    </select>
                ) : (
                    <span className="text-xs text-slate-400">{language.name}</span>
                )}
            </div>

            {/* Monaco Editor */}
            <Editor
                height="400px"
                language={language.id}
                defaultValue={initialCode}
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
