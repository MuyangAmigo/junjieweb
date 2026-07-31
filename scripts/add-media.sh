#!/usr/bin/env bash
# Add a media file to the site and print the markdown embed.
#
# Media used to live in Azure Blob Storage; it now ships from the repo at
# site-next/public/images, so "publishing" an image is just a copy plus an
# optimization pass.
#
# Usage: ./scripts/add-media.sh path/to/file.png

set -euo pipefail
cd "$(dirname "$0")/.."

IMAGES_DIR="site-next/public/images"

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
EXT_LOWER=$(echo "${FNAME##*.}" | tr '[:upper:]' '[:lower:]')

case "$EXT_LOWER" in
    png | jpg | jpeg | gif | webp | svg) ;;
    *)
        echo "Error: unsupported type .${EXT_LOWER}. Images only —"
        echo "host video and documents somewhere with real bandwidth."
        exit 1
        ;;
esac

if [ -e "${IMAGES_DIR}/${FNAME}" ]; then
    echo "Error: ${IMAGES_DIR}/${FNAME} already exists. Rename the file first."
    exit 1
fi

cp "$FILE" "${IMAGES_DIR}/${FNAME}"
echo "Copied to ${IMAGES_DIR}/${FNAME}"

# Only PNG/JPEG go through sharp; the optimizer ignores everything else.
(cd site-next && npm run --silent optimize:images)

echo ""
echo "Markdown:"
echo "![${FNAME%.*}](/images/${FNAME})"
