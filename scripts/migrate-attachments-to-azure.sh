#!/usr/bin/env bash
# One-time migration: upload all attachments to Azure Blob Storage.
# Images → images/ (flat), Videos → videos/, Documents → documents/
# Usage: ./scripts/migrate-attachments-to-azure.sh [--dry-run]

set -euo pipefail
cd "$(dirname "$0")/.."

STORAGE_ACCOUNT="junjieblob"
CONTAINER="images"
DRY_RUN=false

if [[ "${1:-}" == "--dry-run" ]]; then
    DRY_RUN=true
    echo "==> DRY RUN — no uploads will be performed"
fi

upload_dir() {
    local local_dir="$1"
    local blob_prefix="$2"
    local count=0
    local skipped=0
    local uploaded=0

    if [ ! -d "$local_dir" ]; then
        echo "  Directory not found: $local_dir (skipping)"
        return
    fi

    for file in "$local_dir"/*; do
        [ -f "$file" ] || continue
        count=$((count + 1))
        local fname
        fname=$(basename "$file")
        local blob_name="${blob_prefix}${fname}"

        # Check if blob already exists
        if az storage blob show --account-name "$STORAGE_ACCOUNT" --container-name "$CONTAINER" --name "$blob_name" &>/dev/null; then
            echo "  . ${blob_name} (exists)"
            skipped=$((skipped + 1))
        else
            if $DRY_RUN; then
                echo "  + ${blob_name} (would upload)"
            else
                echo "  + Uploading ${blob_name}..."
                az storage blob upload --account-name "$STORAGE_ACCOUNT" --container-name "$CONTAINER" \
                    --file "$file" --name "$blob_name" --only-show-errors
            fi
            uploaded=$((uploaded + 1))
        fi
    done

    echo "  Summary: ${count} files, ${uploaded} uploaded, ${skipped} already existed"
}

echo "==> Uploading Images..."
upload_dir "Attachments/Images" ""

echo ""
echo "==> Uploading Videos..."
upload_dir "Attachments/Videos" "videos/"

echo ""
echo "==> Uploading Documents..."
upload_dir "Attachments/Documents" "documents/"

echo ""
echo "==> Migration complete."
