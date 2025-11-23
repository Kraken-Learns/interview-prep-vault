import matter from 'gray-matter';
import type { Problem } from '@/types';

export async function getAllProblems(): Promise<Problem[]> {
    const modules = import.meta.glob('/src/content/problems/*.md', { as: 'raw' });
    const problems: Problem[] = [];

    for (const path in modules) {
        const rawContent = await modules[path]();
        const { data, content } = matter(rawContent);
        const slug = path.split('/').pop()?.replace('.md', '') || '';

        problems.push({
            slug,
            title: data.title,
            difficulty: data.difficulty,
            tags: data.tags || [],
            source: data.source || 'Unknown',
            date: data.date || new Date().toISOString(),
            content,
        });
    }



    return problems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getProblem(slug: string): Promise<Problem | null> {
    const problems = await getAllProblems();
    return problems.find((p) => p.slug === slug) || null;
}
