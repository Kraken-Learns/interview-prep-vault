import matter from 'gray-matter';
import type { Problem } from '@/types';

export async function getAllProblems(): Promise<Problem[]> {
    const modules = import.meta.glob('/src/content/problems/**/*.md', { as: 'raw' });

    const promises = Object.entries(modules).map(async ([path, resolver]) => {
        const rawContent = await resolver();
        const { data, content } = matter(rawContent);

        // Path format: /src/content/problems/set1/problem.md
        const parts = path.split('/');
        const filename = parts.pop() || '';
        const set = parts.pop() || 'unknown';
        const slug = filename.replace('.md', '');

        if (!slug || !data.title) {
            console.warn(`Skipping invalid problem file: ${path}`);
            return null;
        }

        return {
            slug,
            title: data.title,
            difficulty: data.difficulty || 'Medium',
            tags: data.tags || [],
            source: data.source || 'Unknown',
            date: data.date || new Date().toISOString(),
            content,
            starterCode: data.starterCode || {},
            set,
        } as Problem;
    });

    const results = await Promise.all(promises);
    const problems = results.filter((p): p is Problem => p !== null);

    return problems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getProblem(set: string, slug: string): Promise<Problem | null> {
    const modules = import.meta.glob('/src/content/problems/**/*.md', { as: 'raw' });
    const path = `/src/content/problems/${set}/${slug}.md`;

    const resolver = modules[path];
    if (!resolver) {
        return null;
    }

    const rawContent = await resolver();
    const { data, content } = matter(rawContent);

    return {
        slug,
        title: data.title,
        difficulty: data.difficulty || 'Medium',
        tags: data.tags || [],
        source: data.source || 'Unknown',
        date: data.date || new Date().toISOString(),
        content,
        starterCode: data.starterCode || {},
        set,
    };
}
