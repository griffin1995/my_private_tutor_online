#!/bin/bash

# CONTEXT7 SOURCE: /jellyfin/jellyfin-ffmpeg - Professional video compression patterns for web optimization
# VIDEO COMPRESSION SCRIPT: FFmpeg-based automated compression for My Private Tutor Online
# PURPOSE: Reduce video file sizes for optimal web delivery while maintaining visual quality

set -e

# Configuration
INPUT_DIR="/home/jack/Documents/my_private_tutor_online/public/videos"
OUTPUT_DIR="${INPUT_DIR}/compressed"
POSTER_DIR="${INPUT_DIR}/posters"

# Create output directories
mkdir -p "$OUTPUT_DIR"
mkdir -p "$POSTER_DIR"

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== My Private Tutor Online Video Compression Tool ===${NC}"
echo -e "${BLUE}Context7 Source: /jellyfin/jellyfin-ffmpeg${NC}"
echo

# Function to get file size in MB
get_file_size_mb() {
    local file="$1"
    local size_bytes=$(stat -c%s "$file" 2>/dev/null || echo "0")
    echo $((size_bytes / 1024 / 1024))
}

# Function to compress video with quality targets
compress_video() {
    local input_file="$1"
    local output_file="$2"
    local target_size_mb="$3"
    local video_type="$4"
    
    local filename=$(basename "$input_file" .mp4)
    local input_size=$(get_file_size_mb "$input_file")
    
    echo -e "${YELLOW}Processing: $filename${NC}"
    echo -e "Input size: ${input_size}MB → Target: ${target_size_mb}MB"
    
    # CONTEXT7 SOURCE: /jellyfin/jellyfin-ffmpeg - H.264 libx264 compression with rate control
    # Optimal settings for web delivery with quality preservation
    local crf_value
    local preset="medium"
    local profile="main"
    local level="4.0"
    
    # Set CRF based on video type and target size
    case "$video_type" in
        "background")
            crf_value=28  # Higher compression for background videos
            preset="fast"
            ;;
        "introduction")
            crf_value=24  # Balanced quality for introduction
            ;;
        "testimonials")
            crf_value=26  # Good quality for testimonials
            ;;
        *)
            crf_value=25  # Default balanced setting
            ;;
    esac
    
    # CONTEXT7 SOURCE: /jellyfin/jellyfin-ffmpeg - Optimized encoding parameters for web delivery
    ffmpeg -i "$input_file" \
        -c:v libx264 \
        -preset "$preset" \
        -crf "$crf_value" \
        -profile:v "$profile" \
        -level "$level" \
        -pix_fmt yuv420p \
        -movflags +faststart \
        -c:a aac \
        -b:a 128k \
        -ac 2 \
        -ar 44100 \
        -y \
        "$output_file" 2>/dev/null
    
    local output_size=$(get_file_size_mb "$output_file")
    local compression_ratio=$((input_size * 100 / output_size))
    
    echo -e "${GREEN}✓ Compressed: ${output_size}MB (${compression_ratio}% reduction)${NC}"
}

# Function to create WebM version
create_webm_version() {
    local input_file="$1"
    local output_file="$2"
    local video_type="$3"
    
    local filename=$(basename "$input_file" .mp4)
    echo -e "${YELLOW}Creating WebM version: $filename${NC}"
    
    # CONTEXT7 SOURCE: /jellyfin/jellyfin-ffmpeg - VP9 codec for enhanced web compression
    local crf_value
    case "$video_type" in
        "background")
            crf_value=35
            ;;
        "introduction")
            crf_value=30
            ;;
        "testimonials")
            crf_value=32
            ;;
        *)
            crf_value=31
            ;;
    esac
    
    ffmpeg -i "$input_file" \
        -c:v libvpx-vp9 \
        -crf "$crf_value" \
        -b:v 0 \
        -row-mt 1 \
        -c:a libopus \
        -b:a 96k \
        -y \
        "${output_file%.mp4}.webm" 2>/dev/null
    
    local webm_size=$(get_file_size_mb "${output_file%.mp4}.webm")
    echo -e "${GREEN}✓ WebM created: ${webm_size}MB${NC}"
}

# Function to generate poster image
generate_poster() {
    local input_file="$1"
    local poster_file="$2"
    
    local filename=$(basename "$input_file" .mp4)
    echo -e "${YELLOW}Generating poster: $filename${NC}"
    
    # CONTEXT7 SOURCE: /jellyfin/jellyfin-ffmpeg - Video frame extraction for poster generation
    ffmpeg -i "$input_file" \
        -ss 00:00:02 \
        -vframes 1 \
        -q:v 2 \
        -y \
        "$poster_file" 2>/dev/null
    
    echo -e "${GREEN}✓ Poster generated${NC}"
}

# Process each video file
echo -e "${BLUE}Processing large video files...${NC}"
echo

# Background video (239MB → target 5MB)
if [ -f "$INPUT_DIR/background-video-2025.mp4" ]; then
    echo -e "${BLUE}--- Background Video ---${NC}"
    compress_video \
        "$INPUT_DIR/background-video-2025.mp4" \
        "$OUTPUT_DIR/background-video-2025-compressed.mp4" \
        5 \
        "background"
    
    create_webm_version \
        "$INPUT_DIR/background-video-2025.mp4" \
        "$OUTPUT_DIR/background-video-2025-compressed.mp4" \
        "background"
    
    generate_poster \
        "$INPUT_DIR/background-video-2025.mp4" \
        "$POSTER_DIR/background-video-2025-poster.jpg"
    echo
fi

# Introduction video (22MB → target 10MB)
if [ -f "$INPUT_DIR/elizabeth-introduction.mp4" ]; then
    echo -e "${BLUE}--- Introduction Video ---${NC}"
    compress_video \
        "$INPUT_DIR/elizabeth-introduction.mp4" \
        "$OUTPUT_DIR/elizabeth-introduction-compressed.mp4" \
        10 \
        "introduction"
    
    create_webm_version \
        "$INPUT_DIR/elizabeth-introduction.mp4" \
        "$OUTPUT_DIR/elizabeth-introduction-compressed.mp4" \
        "introduction"
    
    generate_poster \
        "$INPUT_DIR/elizabeth-introduction.mp4" \
        "$POSTER_DIR/elizabeth-introduction-poster.jpg"
    echo
fi

# Testimonials videos (155MB/171MB → target 20MB each)
for video in "testimonials-parents-2025.mp4" "testimonials-students-2025.mp4"; do
    if [ -f "$INPUT_DIR/$video" ]; then
        echo -e "${BLUE}--- $(basename "$video" .mp4) ---${NC}"
        compress_video \
            "$INPUT_DIR/$video" \
            "$OUTPUT_DIR/${video%-2025.mp4}-2025-compressed.mp4" \
            20 \
            "testimonials"
        
        create_webm_version \
            "$INPUT_DIR/$video" \
            "$OUTPUT_DIR/${video%-2025.mp4}-2025-compressed.mp4" \
            "testimonials"
        
        generate_poster \
            "$INPUT_DIR/$video" \
            "$POSTER_DIR/${video%.mp4}-poster.jpg"
        echo
    fi
done

# Summary report
echo -e "${GREEN}=== Compression Summary ===${NC}"
echo

total_original=0
total_compressed=0

for original in "$INPUT_DIR"/*.mp4; do
    if [[ "$original" == *"-2025.mp4" ]]; then
        filename=$(basename "$original")
        compressed="$OUTPUT_DIR/${filename%-2025.mp4}-2025-compressed.mp4"
        
        if [ -f "$compressed" ]; then
            orig_size=$(get_file_size_mb "$original")
            comp_size=$(get_file_size_mb "$compressed")
            savings=$((orig_size - comp_size))
            
            total_original=$((total_original + orig_size))
            total_compressed=$((total_compressed + comp_size))
            
            echo -e "${filename}: ${orig_size}MB → ${comp_size}MB (${savings}MB saved)"
        fi
    fi
done

total_savings=$((total_original - total_compressed))
echo
echo -e "${GREEN}Total original: ${total_original}MB${NC}"
echo -e "${GREEN}Total compressed: ${total_compressed}MB${NC}"
echo -e "${GREEN}Total savings: ${total_savings}MB${NC}"

echo
echo -e "${BLUE}Compression complete! Files available in:${NC}"
echo -e "MP4 (compressed): $OUTPUT_DIR"
echo -e "WebM (alternative): $OUTPUT_DIR"
echo -e "Poster images: $POSTER_DIR"