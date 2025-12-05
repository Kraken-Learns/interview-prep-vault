import matter from 'gray-matter';

export interface SystemDesignTopic {
    id: string;
    title: string;
    category: 'core-concepts' | 'deep-dives' | 'problem-set';
    content: string;
    date: string;
}

export async function getAllSystemDesignTopics(): Promise<SystemDesignTopic[]> {
    const modules = import.meta.glob('/src/content/design/**/*.md', { as: 'raw' });
    const topics: SystemDesignTopic[] = [];

    for (const path in modules) {
        const rawContent = await modules[path]();
        const { data, content } = matter(rawContent);

        // Path format: /src/content/design/core/load-balancing.md
        const parts = path.split('/');
        const filename = parts.pop() || '';
        // const folder = parts.pop(); // e.g., 'core', 'dives', 'set'
        const id = filename.replace('.md', '');

        if (!id || !data.title) {
            console.warn(`Skipping invalid system design file: ${path}`);
            continue;
        }

        topics.push({
            id,
            title: data.title,
            category: data.category || 'core-concepts',
            content,
            date: data.date || new Date().toISOString(),
        });
    }

    return topics;
}
