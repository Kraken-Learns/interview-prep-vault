import React from 'react';
import Editor from '@monaco-editor/react';
import { useTheme } from '@/context/ThemeContext';

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
    const { theme } = useTheme();

    const handleEditorChange = (value: string | undefined) => {
        if (value !== undefined && onChange) {
            onChange(value);
        }
    };

    return (
        <div className="h-full w-full rounded-xl overflow-hidden border border-slate-200 dark:border-white/5 bg-white dark:bg-[#1e1e1e] shadow-inner">
            <Editor
                height="100%"
                language={language}
                value={initialCode}
                onChange={handleEditorChange}
                theme={theme === 'dark' ? 'vs-dark' : 'light'}
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                    lineNumbers: 'on',
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 4,
                    insertSpaces: true,
                    wordWrap: 'on',
                    readOnly: readOnly,
                    padding: { top: 20, bottom: 20 },
                    renderLineHighlight: 'all',
                    cursorBlinking: 'smooth',
                    smoothScrolling: true,
                    contextmenu: true,
                    folding: true,
                    lineDecorationsWidth: 20,
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
                    scrollbar: {
                        vertical: 'visible',
                        horizontal: 'visible',
                        verticalScrollbarSize: 10,
                        horizontalScrollbarSize: 10,
                        useShadows: false,
                    }
                }}
            />
        </div>
    );
};

export default CodeEditor;
