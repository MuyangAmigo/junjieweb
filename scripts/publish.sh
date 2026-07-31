#!/usr/bin/env bash
# Publish blog posts: transform notes → commit → push
# Vault lives at VAULT_PATH (set in .env). Images are already site-relative /images/ URLs.
# Usage: ./scripts/publish.sh

set -euo pipefail
cd "$(dirname "$0")/.."

# Load local env (sets VAULT_PATH etc.)
if [ -f .env ]; then
    set -a; source .env; set +a
fi

if [ -z "${VAULT_PATH:-}" ]; then
    echo "Error: VAULT_PATH is not set. Add it to .env (see .env.example)."
    exit 1
fi

echo "==> Vault: $VAULT_PATH"
echo ""
echo "==> Transforming Obsidian notes to posts..."
python3 scripts/obsidian-to-hugo.py

# Stage and commit generated posts
echo ""
echo "==> Committing and pushing..."
git add site-next/content/posts/
if git diff --cached --quiet; then
    echo "  No changes to commit."
else
    git commit -m "Publish blog posts $(date +%Y-%m-%d)"
    git push origin main
    echo ""
    echo "==> Pushed! CI/CD will deploy shortly."
fi
