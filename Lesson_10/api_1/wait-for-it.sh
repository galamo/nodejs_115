#!/usr/bin/env sh

# wait-for-it.sh
# Wait until a host:port is available

set -e

HOST=$1
PORT=$2
TIMEOUT=${3:-30}

echo "⏳ Waiting for $HOST:$PORT (timeout: ${TIMEOUT}s)..."

i=0
while [ "$i" -lt "$TIMEOUT" ]; do
  if nc -z "$HOST" "$PORT"; then
    echo "✅ $HOST:$PORT is available."
    exit 0
  fi

  sleep 1
  i=$((i + 1))
done




echo "❌ Timeout reached while waiting for $HOST:$PORT"
exit 1
