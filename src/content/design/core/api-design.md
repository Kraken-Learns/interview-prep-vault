---
title: "API Design"
category: "core-concepts"
order: 4
---

# API Design

API design is the art of defining how your system exposes its capabilities to the world (or to other internal services). A well-designed API is intuitive, performant, and scales with your business. In system design interviews, your choice of API paradigm and handling of cross-cutting concerns like pagination and rate limiting are strong signals of seniority.

## 1. API Paradigms

There isn't a "one size fits all" API style. The three dominant paradigms you must know are **REST**, **GraphQL**, and **RPC (gRPC)**.

```mermaid
graph TD
    Client[Client]
    
    REST["**REST**<br>JSON over HTTP<br>Resource Management<br>"]
    GraphQL["**GraphQL**<br>Granular resource<br>fetch<br>"]
    RPC["**RPC**<br>gRPC or Apache Thrift<br>Binary over HTTP2<br>"]

    Client -->|"GET /users/123"| REST
    Client -->|"POST /graphql { user(id: 123) ... }"| GraphQL
    Client -->|"GetUser(id=123)"| RPC
    
    style REST fill:#e0f2fe,stroke:#0284c7
    style GraphQL fill:#f0fdf4,stroke:#16a34a
    style RPC fill:#fff7ed,stroke:#ea580c
```

### Comparative Analysis

| Feature | REST | GraphQL | gRPC |
| :--- | :--- | :--- | :--- |
| **Philosophy** | **Resource-oriented.** Everything is a noun (User, Order). | **Data-oriented.** Client asks for exactly what it needs. | **Action-oriented.** Remote Procedure Calls (GetUsers, CreateOrder). |
| **Transport** | HTTP/1.1 or HTTP/2 (JSON). | HTTP/1.1 or HTTP/2 (JSON). | **HTTP/2** (Binary Protobuf). |
| **Coupling** | Loosely coupled. | Tightly coupled to schema. | Tightly coupled to `.proto` contract. |
| **Pros** | Caching, standard HTTP tooling, scalability. | **No over/under-fetching**, flexible for frontend. | **Performance**, strict type safety, polyglot. |
| **Cons** | Multiple round-trips, over-fetching data. | Complexity, caching is hard, rate-limiting is hard. | Browser support requires proxy, not human-readable. |
| **Best For** | Public APIs, simple CRUD apps. | Mobile apps, complex dashboard UIs. | **Internal Microservices**, Application-to-backend. |

---

## 2. Pagination

When an API endpoint returns a list (e.g., `GET /products`), returning *all* records is a recipe for disaster. You must paginate.

### Offset-Based (The "Old School" Way)
Client sends `limit` and `offset`. Database skips `N` rows and returns the next `M`.
*   **Request**: `GET /products?limit=20&offset=100`
*   **SQL**: `SELECT * FROM products LIMIT 20 OFFSET 100;`

> [!WARNING]
> **Performance Killer**: The database still reads and discards the skipped rows. `OFFSET 1,000,000` is incredibly slow. Also, if a new item is inserted while paging, users might see duplicates or miss items.

### Cursor-Based (The "State of the Art")
Client sends a pointer (cursor) to the *last item* it saw. The server simply fetches items *after* that point. Reliability and performance are O(1) or O(log N).
*   **Request**: `GET /products?limit=20&after_cursor=LastSeenID_Encoded`
*   **SQL**: `SELECT * FROM products WHERE id > LastSeenID LIMIT 20;`

```mermaid
graph TD
    %% Nodes
    subgraph "Step 1: Initial Request"
    Req1["**Client**<br>GET /items?limit=5"] --> SQL1["**Server/DB**<br>SELECT * FROM items LIMIT 5"]
    SQL1 --> Res1["**Response**<br>{ data: [1-5], cursor: 'id_5' }"]
    end
    
    subgraph "Step 2: Next Page (User Scrolls)"
    Req2["**Client**<br>GET /items?limit=5&cursor='id_5'"] --> SQL2["**Server/DB**<br>SELECT ... WHERE id > 'id_5'"]
    SQL2 --> Res2["**Response**<br>{ data: [6-10], cursor: 'id_10' }"]
    end
    
    Res1 -.-> Req2

    %% Styles
    style Req1 fill:#f9fafb,stroke:#6b7280,stroke-width:2px
    style SQL1 fill:#f0fdf4,stroke:#16a34a,stroke-width:2px
    style Res1 fill:#e0f2fe,stroke:#0284c7,stroke-width:2px
    
    style Req2 fill:#f9fafb,stroke:#6b7280,stroke-width:2px
    style SQL2 fill:#f0fdf4,stroke:#16a34a,stroke-width:2px
    style Res2 fill:#e0f2fe,stroke:#0284c7,stroke-width:2px
```

---

## 3. Rate Limiting

Protect your services from being overwhelmed (intentional DDoS or accidental bugs).

### Token Bucket vs. Leaky Bucket

| Algorithm | Concept | Use Case |
| :--- | :--- | :--- |
| **Token Bucket** | A bucket fills with tokens at a constant rate. Each request costs a token. **Allows bursts** if tokens are accumulated. | **User-facing APIs.** Allows users to do a quick burst of activity (e.g., loading a dashboard). |
| **Leaky Bucket** | Requests enter a queue and leak out at a constant rate. **Smoothes traffic** to a steady flow. | **Write-heavy services.** Protecting a database or queue that can only handle a fixed write throughput. |

```mermaid
graph LR
    subgraph "Token Bucket (Allows Bursts)"
        TB_Tokens((Token)) --> TB_Bucket[Bucket]
        TB_Req[Request] --> TB_Decision{Tokens?}
        TB_Decision -- Yes --> TB_Pass[Pass & Remove]
        TB_Decision -- No --> TB_Drop[Drop Request]
    end
    
    style TB_Bucket fill:#fefce8,stroke:#eab308
```

---

## 4. Versioning

APIs evolve. You will eventually need to make a breaking change. How do you handle it?

1.  **URL Versioning** (Most Common): `GET /v1/users`
    *   **Pros**: Explicit, easy to see, easy to cache.
    *   **Cons**: "Pollutes" the URL namespace.
2.  **Header Versioning**: `GET /users` with header `X-API-Version: 1`
    *   **Pros**: Clean URLs.
    *   **Cons**: Harder to test in browser, cache fragmentation.
3.  **Media Type Versioning**: `Accept: application/vnd.company.v1+json`
    *   **Pros**: The "Pure REST" way.
    *   **Cons**: Complex to implement and debug.

> [!TIP]
> **Recommendation**: Stick to **URL Versioning** (`/v1/resource`) for most system design interviews. It's pragmatic, widely understood, and "good enough" for giants like Stripe and Twitter.

---

## 5. Security Checklist

*   **Authentication (Who are you?)**:
    *   **API Keys**: Simple, but risky if leaked. Use for machine-to-machine.
    *   **JWT (JSON Web Tokens)**: Stateless. Good for microservices.
    *   **OAuth 2.0**: The standard for user authorization (e.g., "Log in with Google").
*   **Authorization (What can you do?)**:
    *   **RBAC (Role-Based Access Control)**: "Admins can delete, Users can read."
*   **HTTPS Only**: Never expose an API over plain HTTP.
