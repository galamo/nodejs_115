
# Elasticsearch README

## Overview

Elasticsearch is a distributed, RESTful search and analytics engine capable of solving a growing number of use cases. It is part of the Elastic Stack (Elasticsearch, Kibana, Beats, Logstash) and is widely used for full-text search, log and event data analysis, and real-time analytics.

### Key Concepts

* **Cluster**: A collection of one or more nodes that together hold your entire data and provide indexing and search capabilities.
* **Node**: A single server that is part of the cluster. Nodes can hold data and participate in the cluster’s indexing and search capabilities.
* **Index**: A collection of documents that have somewhat similar characteristics. It is like a database in a relational database.
* **Document**: A basic unit of information that can be indexed. It is expressed in JSON format.
* **Shard**: Elasticsearch provides the ability to subdivide your index into multiple pieces called shards. Each shard is a fully functional and independent "index" that can be hosted on any node in the cluster.
* **Replica**: A copy of a shard, providing redundancy and high availability.

---

## Docker Compose Setup

You can run Elasticsearch locally using Docker Compose.

```yaml
version: '3.8'
services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.11.2
    container_name: elasticsearch
    environment:
      - discovery.type=single-node
      - ES_JAVA_OPTS=-Xms512m -Xmx512m
      - xpack.security.enabled=false
    ports:
      - "9200:9200"
      - "9300:9300"
    networks:
      - esnet

networks:
  esnet:
    driver: bridge
```

To start Elasticsearch, run:

```bash
docker-compose up -d
```

Check if it is running:

```bash
curl http://localhost:9200
```

---

## Node.js Code Example

Install dependencies:

```bash
npm init -y
npm install @elastic/elasticsearch
```

Create `index.js`:

```javascript
const { Client } = require('@elastic/elasticsearch');

// Connect to Elasticsearch
const client = new Client({ node: 'http://localhost:9200' });

async function run() {
  // Create an index
  await client.indices.create({
    index: 'users'
  }, { ignore: [400] });

  // Index a document
  await client.index({
    index: 'users',
    document: {
      name: 'John Doe',
      age: 30,
      email: 'john.doe@example.com'
    }
  });

  // Refresh index
  await client.indices.refresh({ index: 'users' });

  // Search for a document
  const result = await client.search({
    index: 'users',
    query: {
      match: { name: 'John' }
    }
  });

  console.log(result.hits.hits);
}

run().catch(console.log);
```

Run the script:

```bash
node index.js
```

---

## Exercises

1. **Create an index for blog posts**:
   Create an index called `blog` with documents containing `title`, `author`, `content`, and `tags`. Insert at least 5 documents and search for blog posts containing a specific tag.

2. **Advanced Search Queries**:
   Using the `users` index, perform a query to find all users whose age is greater than 25 and whose name starts with the letter "J".

---

If you want, I can also add a **bonus section for bulk indexing and updating documents** to make it more practical for learning.

Do you want me to include that?
