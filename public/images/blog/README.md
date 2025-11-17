# Blog Images Directory

## Education Insights Header Image - Placement Instructions

### Current Status
The Education Insights page (`/blog`) is currently using a placeholder header image.

### Required Action
To replace the placeholder with the new header image from Google Drive:

#### Step 1: Download the Image
- Access the Google Drive link provided by the content team
- Download the high-resolution header image

#### Step 2: Prepare the Image File
**Filename**: `education-insights-header.jpg` (or `.webp` for better performance)

**Recommended Specifications**:
- **Minimum width**: 1920px (for desktop displays)
- **Aspect ratio**: 16:9 or wider (landscape orientation)
- **Format**: WebP (preferred) or JPEG
- **File size**: Under 500KB (optimised for web performance)
- **Subject matter**: Professional education/tutoring setting with warm, premium aesthetic
- **Quality**: High resolution, professionally photographed

#### Step 3: Place the Image
1. Save the downloaded image as `education-insights-header.jpg` (or `.webp`)
2. Place the file in this directory: `/public/images/blog/`
3. Verify the file is accessible at: `http://localhost:3000/images/blog/education-insights-header.jpg`

#### Step 4: Update the Code
1. Open: `/src/app/blog/page.tsx`
2. Locate the `SimpleHero` component (around line 152)
3. Update the `backgroundImage` prop from:
   ```tsx
   backgroundImage='/images/pexels-polina-tankilevitch-6929349.jpg'
   ```
   to:
   ```tsx
   backgroundImage='/images/blog/education-insights-header.jpg'
   ```

#### Step 5: Test and Deploy
1. Run `npm run dev` locally to verify the image displays correctly
2. Check responsiveness across mobile, tablet, and desktop viewports
3. Run `npm run build` to ensure production build succeeds
4. Deploy using `vercel --prod` when satisfied

---

## Additional Blog Images

Place any additional blog post hero images in this directory using the following naming convention:
- `blog-post-[id]-[slug].jpg` (e.g., `blog-post-25-westminster-school-guide.jpg`)
- Maintain consistent image specifications as outlined above
- WebP format preferred for optimal performance

---

## Image Optimisation Tips

### Converting to WebP (Recommended)
Using ImageMagick (if installed):
```bash
convert education-insights-header.jpg -quality 85 education-insights-header.webp
```

Using online tools:
- [Squoosh](https://squoosh.app/) - Google's image optimisation tool
- [TinyPNG](https://tinypng.com/) - Compression tool with WebP output

### Verifying Image Dimensions
```bash
file education-insights-header.jpg
```

---

**Last Updated**: November 13, 2025
**Contact**: Development team for technical support
