import matter from 'gray-matter';

export interface SystemDesignTopic {
    id: string;
    title: string;
    category: 'core-concepts' | 'deep-dives' | 'problem-set';
    content: string;
    date: string;
    order?: number;
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
            order: data.order,
        });
    }

    // Sort by order if present, otherwise fallback to date or title
    return topics.sort((a, b) => {
        if (a.order !== undefined && b.order !== undefined) {
            return a.order - b.order;
        }
        if (a.order !== undefined) return -1;
        if (b.order !== undefined) return 1;

        // Fallback to title
        return a.title.localeCompare(b.title);
    });
}
