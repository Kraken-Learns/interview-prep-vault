import matter from 'gray-matter';
import type { Problem } from '@/types';

export async function getAllProblems(): Promise<Problem[]> {
    const modules = import.meta.glob('/src/content/problems/**/*.md', { as: 'raw' });
    const problems: Problem[] = [];

    for (const path in modules) {
        const rawContent = await modules[path]();
        const { data, content } = matter(rawContent);

        // Path format: /src/content/problems/set1/problem.md
        const parts = path.split('/');
        const filename = parts.pop() || '';
        const set = parts.pop() || 'unknown';
        const slug = filename.replace('.md', '');

        problems.push({
            slug,
            title: data.title,
            difficulty: data.difficulty,
            tags: data.tags || [],
            source: data.source || 'Unknown',
            date: data.date || new Date().toISOString(),
            content,
            starterCode: data.starterCode || {},
            set,
        });
    }

    return problems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getProblem(set: string, slug: string): Promise<Problem | null> {
    const problems = await getAllProblems();
    return problems.find((p) => p.set === set && p.slug === slug) || null;
}
