export interface SystemDesignTopic {
    id: string;
    title: string;
    content: string;
    category: 'core-concepts' | 'deep-dives' | 'problem-set';
}

export const SYSTEM_DESIGN_TOPICS: SystemDesignTopic[] = [
    {
        id: 'load-balancing',
        title: 'Load Balancing',
        category: 'core-concepts',
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
        category: 'core-concepts',
        content: `# Caching

Caching is a technique used to store copies of data in a temporary storage location (cache) so that future requests for that data can be served faster.

## Types of Caching
- **Client-side Caching**: Browser caching.
- **CDN Caching**: Content Delivery Network.
- **Server-side Caching**: Redis, Memcached.
`
    }
];
