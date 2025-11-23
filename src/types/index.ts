export interface TestCase {
    input: string;
    output: string;
    explanation?: string;
}

export interface Problem {
    slug: string;
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    tags: string[];
    source: string;
    date: string;
    content: string; // The full markdown content
    testCases?: TestCase[];
    starterCode?: Record<string, string>;
}
