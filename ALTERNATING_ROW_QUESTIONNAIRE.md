# How It Works - Alternating Row Content Questionnaire

Please fill out this structured questionnaire for each alternating row you want to add after the hero section on the how-it-works page. Copy the template below for each row and provide your answers.

## Row Template (Copy this for each row)

```json
{
  "rowId": "row-1",
  "position": {
    "order": 1,
    "variant": "left | right | auto"
  },
  "content": {
    "heading": {
      "text": "[Your heading text here]",
      "level": 2,
      "includeNumber": true,
      "number": 1
    },
    "description": {
      "text": "[Your main description paragraph(s) here. Use \\n\\n for paragraph breaks]",
      "style": "default | large | compact"
    },
    "bulletPoints": {
      "include": true,
      "style": "default | numbered | icons",
      "items": [
        "[First bullet point]",
        "[Second bullet point]",
        "[Third bullet point]"
      ]
    }
  },
  "visual": {
    "icon": {
      "include": true,
      "name": "MessageSquare | Target | Users | ClipboardCheck | CheckCircle | Star | Award | BookOpen | Shield | Heart",
      "position": "above-heading | beside-heading"
    },
    "image": {
      "src": "[Path to image file]",
      "alt": "[Descriptive alt text for accessibility]",
      "aspectRatio": "4:3 | 16:9 | square | auto",
      "priority": true
    }
  },
  "styling": {
    "background": "white | neutral-50 | accent-50 | transparent",
    "spacing": "tight | normal | loose",
    "shadow": "none | sm | md | lg",
    "border": "none | subtle | accent"
  },
  "accessibility": {
    "ariaLabel": "[Screen reader description]",
    "landmark": "section | article | region"
  }
}
```

## Quick Reference Guide

### Variant Options:
- **"left"**: Image on left, content on right
- **"right"**: Image on right, content on left
- **"auto"**: Automatically alternates (odd numbers left, even numbers right)

### Icon Names Available:
- MessageSquare, Target, Users, ClipboardCheck, CheckCircle
- Star, Award, BookOpen, Shield, Heart
- TrendingUp, BarChart3, Crown, Zap, Lightbulb

### Bullet Point Styles:
- **"default"**: Simple bullet points with brand-colored dots
- **"numbered"**: Numbered list in circular badges
- **"icons"**: Each bullet gets a check mark or custom icon

### Spacing Options:
- **"tight"**: 12-16 spacing units between rows
- **"normal"**: 16-24 spacing units between rows
- **"loose"**: 20-32 spacing units between rows

### Background Options:
- **"white"**: Pure white background
- **"neutral-50"**: Very light grey background
- **"accent-50"**: Very light brand color background
- **"transparent"**: No background (inherits parent)

## Example Filled Out:

```json
{
  "rowId": "introduction-overview",
  "position": {
    "order": 1,
    "variant": "left"
  },
  "content": {
    "heading": {
      "text": "Personalised Learning Journey",
      "level": 2,
      "includeNumber": false,
      "number": null
    },
    "description": {
      "text": "Every child's educational journey is unique. Our approach begins with understanding your child's individual learning style, academic goals, and personal interests to create a truly bespoke tutoring experience.\\n\\nWith 15 years of educational excellence and royal endorsements, we've refined our process to deliver exceptional results for families across the UK and internationally.",
      "style": "default"
    },
    "bulletPoints": {
      "include": true,
      "style": "default",
      "items": [
        "Individual learning style assessment",
        "Bespoke curriculum planning",
        "Royal-standard educational excellence",
        "15+ years of proven results"
      ]
    }
  },
  "visual": {
    "icon": {
      "include": true,
      "name": "Star",
      "position": "above-heading"
    },
    "image": {
      "src": "/images/personalised-learning.jpg",
      "alt": "Student working one-on-one with expert tutor in comfortable learning environment",
      "aspectRatio": "4:3",
      "priority": true
    }
  },
  "styling": {
    "background": "white",
    "spacing": "normal",
    "shadow": "none",
    "border": "none"
  },
  "accessibility": {
    "ariaLabel": "Overview of our personalised learning approach",
    "landmark": "section"
  }
}
```

## Instructions:

1. **Copy the template** above for each row you want to create
2. **Fill in all the fields** with your specific content
3. **Maintain consistent numbering** if using numbered rows
4. **Consider visual flow** - alternate left/right for better visual rhythm
5. **Keep descriptions concise** but informative (2-3 sentences per paragraph)
6. **Limit bullet points** to 3-6 items for optimal readability
7. **Use descriptive alt text** for all images for accessibility compliance

## Questions to Consider:

- **How many rows total** do you want to add?
- **Should they all use the same styling** (background, spacing, etc.) or vary?
- **Do you want numbered sections** (Step 1, Step 2) or descriptive headings?
- **Should images alternate sides** or follow a specific pattern?
- **Do you have all the images ready** or need guidance on image requirements?

Please fill out the templates and I'll implement the alternating row section for your how-it-works page!