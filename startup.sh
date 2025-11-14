#!/bin/bash

# === CONFIGURATION ===
BACKEND_REPO_URL="git@github.com:Bilvantis-NeoAI/Billgo-RAG.git"
FRONTEND_REPO_URL="git@github.com:Bilvantis-NeoAI/Billgo-RAG-Frontend.git"

BACKEND_DIR="backend"
FRONTEND_DIR="frontend"

BACKEND_BRANCH="sql_manual_query"
FRONTEND_BRANCH="Billgo-RAG-Chat-Intergation-07052025"

BACKEND_PORT=1000
FRONTEND_PORT=80
BACKEND_URL="http://localhost:$BACKEND_PORT/"
ENV_FILE="bilgo-frontend/.env"

VERSION="v1.0.0"
FRONTEND_IMAGE="neo-ai-frontend:$VERSION"
FRONTEND_CONTAINER="neo-frontend"

# === Function: Kill process using a port ===
kill_port() {
    PORT=$1
    PID=$(lsof -ti tcp:$PORT)
    if [ -n "$PID" ]; then
        echo "⚠️ Port $PORT is in use by PID $PID. Killing it..."
        kill -9 $PID || echo "❌ Failed to kill PID $PID"
    else
        echo "✅ Port $PORT is free."
    fi
}

# === Step 0: Kill processes using backend/frontend ports ===
kill_port $BACKEND_PORT
kill_port $FRONTEND_PORT

# === Step 1: Clone and Start Backend ===
if [ -d "$BACKEND_DIR" ]; then
    echo "📁 Backend directory exists. Pulling latest..."
    cd "$BACKEND_DIR" && git checkout "$BACKEND_BRANCH" && git pull origin "$BACKEND_BRANCH"
else
    echo "📥 Cloning backend repository..."
    git clone -b "$BACKEND_BRANCH" "$BACKEND_REPO_URL" "$BACKEND_DIR"
    cd "$BACKEND_DIR"
fi

echo "🚀 Starting backend using docker-compose..."
docker-compose down
docker-compose up -d

# === Step 2: Wait for Backend to be Ready ===
echo "⏳ Waiting for backend to be available at port $BACKEND_PORT..."
until nc -z localhost $BACKEND_PORT; do
    printf "."
    sleep 1
done
echo -e "\n✅ Backend is running at $BACKEND_URL"

cd ..

# === Step 3: Clone and Prepare Frontend ===
if [ -d "$FRONTEND_DIR" ]; then
    echo "📁 Frontend directory exists. Pulling latest..."
    cd "$FRONTEND_DIR" && git checkout "$FRONTEND_BRANCH" && git pull origin "$FRONTEND_BRANCH"
else
    echo "📥 Cloning frontend repository..."
    git clone -b "$FRONTEND_BRANCH" "$FRONTEND_REPO_URL" "$FRONTEND_DIR"
    cd "$FRONTEND_DIR"
fi

# === Step 4: Update or Create .env File ===
echo "🔧 Updating $ENV_FILE with backend URL as REACT_APP_IP..."
touch "$ENV_FILE"

if grep -q "^REACT_APP_IP=" "$ENV_FILE"; then
    sed -i "s|^REACT_APP_IP=.*|REACT_APP_IP=\"$BACKEND_URL\"|" "$ENV_FILE"
else
    echo "REACT_APP_IP=\"$BACKEND_URL\"" >> "$ENV_FILE"
fi

echo "📄 Final $ENV_FILE content:"
cat "$ENV_FILE"

# === Step 5: Build Frontend Docker Image ===
echo "🐳 Building frontend Docker image with tag $VERSION..."
docker build -t "$FRONTEND_IMAGE" -f bilgo-frontend/dockerfile bilgo-frontend/

# === Step 6: Remove Previous Frontend Container (if exists) ===
echo "🧹 Removing old frontend container (if any)..."
docker rm -f "$FRONTEND_CONTAINER" 2>/dev/null

# === Step 7: Run Frontend Container ===
echo "🚀 Running frontend container on port $FRONTEND_PORT..."
docker run -d \
    --name "$FRONTEND_CONTAINER" \
    -p "$FRONTEND_PORT:80" \
    --env-file "$ENV_FILE" \
    "$FRONTEND_IMAGE"

echo "🎉 Deployment complete!"
echo "🔗 Frontend: http://localhost:$FRONTEND_PORT"
echo "🔗 Backend:  $BACKEND_URL"

