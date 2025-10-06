#!/usr/bin/env python3
"""
Timeline Step Placeholder Image Generator
Generates professional gradient placeholder images for My Private Tutor Online timeline steps

CONTEXT7 SOURCE: /python-pillow/pillow - Image creation, ImageDraw text overlay, gradient backgrounds
IMPLEMENTATION REASON: Professional placeholder images for St Saviours timeline layout with brand consistency
"""

from PIL import Image, ImageDraw, ImageFont
import os

# Project configuration
PROJECT_ROOT = "/home/jack/Documents/my_private_tutor_online"
OUTPUT_DIR = os.path.join(PROJECT_ROOT, "public/images/timeline")

# Image specifications
IMAGE_WIDTH = 400
IMAGE_HEIGHT = 300
IMAGE_FORMAT = "JPEG"
IMAGE_QUALITY = 85

# Brand colors (My Private Tutor Online)
# CONTEXT7 SOURCE: /python-pillow/pillow - RGB color format for image creation
COLOR_GREY = (241, 245, 249)  # #f1f5f9 - Light grey base
COLOR_GOLD = (245, 158, 11)   # #f59e0b - Premium gold accent
COLOR_TEXT_DARK = (30, 41, 59) # #1e293b - Dark text for contrast
COLOR_WHITE = (255, 255, 255)  # White for highlights

# Timeline step content
TIMELINE_STEPS = [
    {
        "number": "1",
        "title": "Initial Consultation",
        "filename": "timeline-step-1.jpg"
    },
    {
        "number": "2",
        "title": "Tiered Tutoring Options",
        "filename": "timeline-step-2.jpg"
    },
    {
        "number": "3",
        "title": "Expert Tutor Matching",
        "filename": "timeline-step-3.jpg"
    },
    {
        "number": "4",
        "title": "Progress Reports & Support",
        "filename": "timeline-step-4.jpg"
    },
    {
        "number": "5",
        "title": "Ongoing Support &\nEducational Partnership",
        "filename": "timeline-step-5.jpg"
    }
]

def create_gradient_background(width, height, color_start, color_end):
    """
    Create a linear gradient background from top to bottom

    CONTEXT7 SOURCE: /python-pillow/pillow - Image.new() for creating new images
    IMPLEMENTATION: Vertical gradient from grey to gold for premium aesthetic

    Args:
        width: Image width in pixels
        height: Image height in pixels
        color_start: RGB tuple for top color
        color_end: RGB tuple for bottom color

    Returns:
        PIL.Image: Image with gradient background
    """
    # CONTEXT7 SOURCE: /python-pillow/pillow - Image.new() creates new image with RGB mode
    image = Image.new("RGB", (width, height))
    draw = ImageDraw.Draw(image)

    # Create vertical gradient by drawing horizontal lines
    # CONTEXT7 SOURCE: /python-pillow/pillow - ImageDraw for drawing shapes on images
    for y in range(height):
        # Calculate interpolation factor (0.0 at top, 1.0 at bottom)
        ratio = y / height

        # Interpolate between start and end colors
        r = int(color_start[0] * (1 - ratio) + color_end[0] * ratio)
        g = int(color_start[1] * (1 - ratio) + color_end[1] * ratio)
        b = int(color_start[2] * (1 - ratio) + color_end[2] * ratio)

        # Draw horizontal line with interpolated color
        draw.line([(0, y), (width, y)], fill=(r, g, b))

    return image

def add_text_overlay(image, step_number, step_title):
    """
    Add step number and title text overlay to image

    CONTEXT7 SOURCE: /python-pillow/pillow - ImageDraw.text() for text rendering
    IMPLEMENTATION: Large step number with title text, centered alignment

    Args:
        image: PIL.Image to draw on
        step_number: Step number string (e.g., "1", "2")
        step_title: Step title string

    Returns:
        PIL.Image: Image with text overlay
    """
    draw = ImageDraw.Draw(image)

    # CONTEXT7 SOURCE: /python-pillow/pillow - ImageFont.load_default() for system fonts
    # Use default font as TrueType font may not be available on all systems
    # For production, could load TrueType font with ImageFont.truetype()

    # Step number - large and prominent
    step_number_size = 120
    # Using default font with manual size simulation via multiple draws
    # CONTEXT7 SOURCE: /python-pillow/pillow - ImageDraw.text() with fill parameter for text color

    # Position step number in upper portion of image
    number_x = IMAGE_WIDTH // 2
    number_y = 50

    # Draw step number with shadow effect for depth
    # Shadow (offset slightly)
    draw.text(
        (number_x - 2, number_y + 2),
        step_number,
        fill=COLOR_GREY,
        anchor="mm"
    )

    # Main number text
    # CONTEXT7 SOURCE: /python-pillow/pillow - anchor parameter for text alignment
    draw.text(
        (number_x, number_y),
        step_number,
        fill=COLOR_GOLD,
        anchor="mm"
    )

    # Step title - centered below number
    title_x = IMAGE_WIDTH // 2
    title_y = 180

    # CONTEXT7 SOURCE: /python-pillow/pillow - multiline_text for text with newlines
    # Handle multiline titles (like step 5)
    draw.multiline_text(
        (title_x, title_y),
        step_title,
        fill=COLOR_TEXT_DARK,
        anchor="mm",
        align="center",
        spacing=8
    )

    return image

def generate_timeline_image(step_data, output_path):
    """
    Generate a single timeline step placeholder image

    CONTEXT7 SOURCE: /python-pillow/pillow - Complete image generation workflow
    IMPLEMENTATION: Creates gradient background with text overlay and saves as optimized JPEG

    Args:
        step_data: Dictionary with step number, title, and filename
        output_path: Full path where image should be saved
    """
    print(f"Generating {step_data['filename']}...")

    # Create gradient background
    # CONTEXT7 SOURCE: /python-pillow/pillow - Image creation and manipulation
    image = create_gradient_background(
        IMAGE_WIDTH,
        IMAGE_HEIGHT,
        COLOR_GREY,
        COLOR_GOLD
    )

    # Add text overlay
    image = add_text_overlay(
        image,
        step_data["number"],
        step_data["title"]
    )

    # Save as optimized JPEG
    # CONTEXT7 SOURCE: /python-pillow/pillow - Image.save() with quality parameter for JPEG optimization
    image.save(
        output_path,
        IMAGE_FORMAT,
        quality=IMAGE_QUALITY,
        optimize=True,
        progressive=True  # Progressive JPEG for faster perceived loading
    )

    print(f"✓ Created {step_data['filename']} ({IMAGE_WIDTH}x{IMAGE_HEIGHT}px, {IMAGE_QUALITY}% quality)")

def main():
    """
    Main execution function - generates all timeline step images

    CONTEXT7 SOURCE: /python-pillow/pillow - Batch image generation workflow
    IMPLEMENTATION: Processes all 5 timeline steps with consistent styling
    """
    print("=" * 60)
    print("Timeline Step Placeholder Image Generator")
    print("My Private Tutor Online - Professional Gradient Placeholders")
    print("=" * 60)
    print()

    # Ensure output directory exists
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    print(f"Output directory: {OUTPUT_DIR}")
    print()

    # Generate each timeline step image
    for step in TIMELINE_STEPS:
        output_path = os.path.join(OUTPUT_DIR, step["filename"])
        generate_timeline_image(step, output_path)

    print()
    print("=" * 60)
    print(f"✓ Successfully generated {len(TIMELINE_STEPS)} timeline images")
    print("=" * 60)
    print()
    print("Next steps:")
    print("1. Review generated images in public/images/timeline/")
    print("2. Update St Saviours page to use timeline-step-1.jpg through timeline-step-5.jpg")
    print("3. Verify images display correctly with proper gradient and typography")

if __name__ == "__main__":
    main()
