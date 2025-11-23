import React, { useState } from 'react';
import MarkdownRenderer from './MarkdownRenderer';

interface Topic {
    id: string;
    title: string;
    content: string;
}

const TOPICS: Topic[] = [
    {
        id: 'load-balancing',
        title: 'Load Balancing',
        content: `# Load Balancing

Load balancing is a critical component of any distributed system. It helps to distribute incoming network traffic across multiple servers to ensure no single server bears too much load.

## Algorithms
- **Round Robin**: Requests are distributed sequentially.
- **Least Connections**: Request is sent to the server with the fewest active connections.
- **IP Hash**: The IP address of the client is used to determine which server receives the request.
`
    },
    {
        id: 'caching',
        title: 'Caching',
        content: `# Caching

Caching is a technique used to store copies of data in a temporary storage location (cache) so that future requests for that data can be served faster.

## Types of Caching
- **Client-side Caching**: Browser caching.
- **CDN Caching**: Content Delivery Network.
- **Server-side Caching**: Redis, Memcached.
`
    }
];

const SystemDesignView: React.FC = () => {
    const [selectedTopicId, setSelectedTopicId] = useState<string>(TOPICS[0].id);

    const selectedTopic = TOPICS.find(t => t.id === selectedTopicId) || TOPICS[0];

    return (
        <div className="flex flex-col md:flex-row gap-8 min-h-[calc(100vh-20rem)]">
            {/* Sidebar */}
            <aside className="w-full md:w-64 flex-shrink-0">
                <div className="md:sticky md:top-24 space-y-2">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider px-4 mb-4">
                        Topics
                    </h3>
                    {TOPICS.map((topic) => (
                        <button
                            key={topic.id}
                            onClick={() => setSelectedTopicId(topic.id)}
                            className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 font-medium ${selectedTopicId === topic.id
                                ? 'bg-purple-100 text-purple-700 shadow-sm'
                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                        >
                            {topic.title}
                        </button>
                    ))}
                </div>
            </aside>

            {/* Content */}
            <main className="flex-1 min-w-0">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                    <MarkdownRenderer content={selectedTopic.content} />
                </div>
            </main>
        </div>
    );
};

export default SystemDesignView;
