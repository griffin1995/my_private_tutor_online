#!/bin/bash
# Script to generate base64 data for all images
images=(
    "image.png:image-1"
    "image-2.png:image-2"
    "image-3.png:image-3"
    "image-5.png:image-5"
    "image-6.png:image-6"
    "image-9.png:image-9"
    "image-10.png:image-10"
    "image-11.png:image-11"
    "image-12.png:image-12"
    "image-13.png:image-13"
    "image-14.png:image-14"
    "image-15.png:image-15"
    "image-16.png:image-16"
    "image-17.png:image-17"
    "image-25.png:image-25"
    "image-26.png:image-26"
    "image-26-edit.png:image-26-edit"
    "image-27.png:image-27"
    "image-28.png:image-28"
)

for entry in "${images[@]}"; do
    file="${entry%%:*}"
    id="${entry##*:}"
    if [ -f "$file" ]; then
        echo "Processing $file for $id..."
        base64_data=$(base64 -w 0 "$file")
        echo "data:image/png;base64,$base64_data" > "${id}.base64"
    fi
done
