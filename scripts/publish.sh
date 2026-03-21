#!/usr/bin/env bash
# Publish blog posts: transform notes → commit → push
# Images are already Azure Blob URLs in source notes (no upload needed).
# Usage: ./scripts/publish.sh

set -euo pipefail
cd "$(dirname "$0")/.."

echo "==> Syncing media to Azure..."
python3 scripts/sync-media.py

echo ""
echo "==> Transforming Obsidian notes to Hugo posts..."
python3 scripts/obsidian-to-hugo.py

# Stage and commit generated posts
echo ""
echo "==> Committing and pushing..."
git add site/content/posts/
if git diff --cached --quiet; then
    echo "  No changes to commit."
else
    git commit -m "Publish blog posts $(date +%Y-%m-%d)"
    git push origin main
    echo ""
    echo "==> Pushed! CI/CD will deploy shortly."
fi
