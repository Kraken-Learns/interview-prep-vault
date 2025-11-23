export interface Problem {
    slug: string;
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    tags: string[];
    source: string;
    date: string;
    content: string; // The full markdown content
}
