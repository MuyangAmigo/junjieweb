#!/usr/bin/env bash
# Publish blog posts: transform → upload images → commit → push
# Usage: ./scripts/publish.sh

set -euo pipefail
cd "$(dirname "$0")/.."

STORAGE_ACCOUNT="junjieblob"
CONTAINER="images"
ATTACHMENTS_DIR="Attachments/Images"
IMAGE_EXTENSIONS="png|jpg|jpeg|gif|webp|svg|heic"

echo "==> Transforming Obsidian notes to Hugo posts..."
python3 scripts/obsidian-to-hugo.py

# Collect referenced images from generated posts
echo ""
echo "==> Checking for images to upload..."
images=()
for post in site/content/posts/*.md; do
    [ -f "$post" ] || continue
    while IFS= read -r img; do
        images+=("$img")
    done < <(grep -oE "https://${STORAGE_ACCOUNT}\.blob\.core\.windows\.net/${CONTAINER}/[^ )\"]+""" "$post" | sed "s|.*/${CONTAINER}/||" || true)
done

# Deduplicate
IFS=$'\n' read -r -d '' -a unique_images < <(printf '%s\n' "${images[@]}" | sort -u && printf '\0') || true

uploaded=0
for img in "${unique_images[@]}"; do
    [ -z "$img" ] && continue
    local_path="${ATTACHMENTS_DIR}/${img}"
    if [ ! -f "$local_path" ]; then
        echo "  WARNING: ${img} not found locally, skipping"
        continue
    fi
    # Check if blob already exists
    if az storage blob show --account-name "$STORAGE_ACCOUNT" --container-name "$CONTAINER" --name "$img" &>/dev/null; then
        echo "  ✓ ${img} (already uploaded)"
    else
        echo "  ↑ Uploading ${img}..."
        az storage blob upload --account-name "$STORAGE_ACCOUNT" --container-name "$CONTAINER" \
            --file "$local_path" --name "$img" --only-show-errors
        uploaded=$((uploaded + 1))
    fi
done
echo "  ${uploaded} new image(s) uploaded."

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
