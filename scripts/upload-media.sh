#!/usr/bin/env bash
# Upload a media file to Azure Blob Storage and print the markdown embed.
# Usage: ./scripts/upload-media.sh path/to/file.png
#        ./scripts/upload-media.sh path/to/video.mp4
#        ./scripts/upload-media.sh path/to/doc.pdf

set -euo pipefail

STORAGE_ACCOUNT="junjieblob"
CONTAINER="images"
BLOB_BASE="https://${STORAGE_ACCOUNT}.blob.core.windows.net/${CONTAINER}"

if [ $# -eq 0 ]; then
    echo "Usage: $0 <file-path>"
    exit 1
fi

FILE="$1"
if [ ! -f "$FILE" ]; then
    echo "Error: file not found: $FILE"
    exit 1
fi

FNAME=$(basename "$FILE")
EXT="${FNAME##*.}"
EXT_LOWER=$(echo "$EXT" | tr '[:upper:]' '[:lower:]')

# Determine blob path prefix based on file type
case "$EXT_LOWER" in
    mp4|mov|avi|mkv|webm)
        BLOB_NAME="videos/${FNAME}"
        ;;
    pdf|docx|xlsx|pptx|doc|xls|csv)
        BLOB_NAME="documents/${FNAME}"
        ;;
    *)
        BLOB_NAME="${FNAME}"
        ;;
esac

BLOB_URL="${BLOB_BASE}/${BLOB_NAME}"

# Check if already uploaded
if az storage blob show --account-name "$STORAGE_ACCOUNT" --container-name "$CONTAINER" --name "$BLOB_NAME" &>/dev/null; then
    echo "Already exists on Azure."
else
    echo "Uploading ${FNAME}..."
    az storage blob upload --account-name "$STORAGE_ACCOUNT" --container-name "$CONTAINER" \
        --file "$FILE" --name "$BLOB_NAME" --only-show-errors
    echo "Uploaded."
fi

echo ""
echo "Markdown:"
echo "![${FNAME%.*}](${BLOB_URL})"
echo ""
echo "URL:"
echo "${BLOB_URL}"
