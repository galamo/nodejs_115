#!/usr/bin/env sh

# entrypoint.sh
# Waits for MySQL and starts the Node.js app

set -e

# Wait for MySQL (host:port from env or default)
HOST=${DB_HOST:-mysql}
PORT=${DB_PORT:-3306}
TIMEOUT=${WAIT_TIMEOUT:-30}
ls
pwd
# Wait for it
/app/wait-for-it.sh "$HOST" "$PORT" "$TIMEOUT"

# Run your app
echo "🚀 Starting the app..."
exec node dist/index.js
