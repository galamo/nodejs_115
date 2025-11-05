# MongoDB Setup Guide

This guide explains how to set up MongoDB locally using Docker for the chat application.

## Prerequisites

- Docker and Docker Compose installed on your system
- Node.js and npm installed

## Starting MongoDB with Docker

1. Navigate to the `api` directory:
   ```bash
   cd Lesson_11/api
   ```

2. Start MongoDB using Docker Compose:
   ```bash
   docker-compose up -d
   ```

   This will:
   - Download the MongoDB image (if not already present)
   - Start a MongoDB container named `chat-mongodb`
   - Expose MongoDB on port `27017`
   - Create a database named `chat-app`
   - Persist data in a Docker volume

3. Verify MongoDB is running:
   ```bash
   docker ps
   ```
   You should see a container named `chat-mongodb` running.

## Database Collections

The application uses two MongoDB collections:

### Users Collection
- `id`: String (unique identifier)
- `username`: String (user's name)
- `_id`: MongoDB ObjectId (automatically created)
- `createdAt`, `updatedAt`: Timestamps (automatically managed)

### Rooms Collection
- `id`: String (unique identifier)
- `name`: String (room name)
- `_id`: MongoDB ObjectId (automatically created)
- `createdAt`, `updatedAt`: Timestamps (automatically managed)

## Connection

The application connects to MongoDB at: `mongodb://localhost:27017/chat-app`

You can override this by setting the `MONGODB_URI` environment variable:
```bash
export MONGODB_URI=mongodb://localhost:27017/your-database-name
```

## Stopping MongoDB

To stop the MongoDB container:
```bash
docker-compose down
```

To stop and remove all data (volume):
```bash
docker-compose down -v
```

## Accessing MongoDB Shell

To access the MongoDB shell directly:
```bash
docker exec -it chat-mongodb mongosh
```

## Troubleshooting

**Port 27017 already in use:**
- Check if MongoDB is already running: `docker ps`
- Stop any existing MongoDB instances
- Or change the port in `docker-compose.yml`

**Connection refused:**
- Ensure Docker is running
- Verify the container is up: `docker ps`
- Check logs: `docker-compose logs mongodb`

