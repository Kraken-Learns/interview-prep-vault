---
title: "Load Balancing"
category: "core-concepts"
---

# Load Balancing

Load balancing is a critical component of any distributed system. It helps to distribute incoming network traffic across multiple servers to ensure no single server bears too much load.

## Algorithms
- **Round Robin**: Requests are distributed sequentially.
- **Least Connections**: Request is sent to the server with the fewest active connections.
- **IP Hash**: The IP address of the client is used to determine which server receives the request.
