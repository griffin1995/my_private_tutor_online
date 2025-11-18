#!/usr/bin/env node

/**
 * Compile all videos into one master video with title cards
 * Creates black screen title cards between each section
 * Auto-generates page labels from video filenames
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const videosDir = path.join(__dirname, 'videos');
const outputDir = path.join(__dirname, 'compiled_videos');
const finalOutput = path.join(outputDir, 'master_video.mp4');

// Viewport labels
const viewportLabels = {
  'mobile_360x800': 'Mobile (360x800)',
  'iphone14_390x844': 'iPhone 14/15 (390x844)',
  'mobile_landscape_640x767': 'Mobile Landscape (640x767)',
  'tablet_768x1024': 'Tablet (768x1024)',
  'laptop_small_1024x768': 'Laptop Small (1024x768)',
  'laptop_large_1366x768': 'Laptop Large (1366x768)',
  'desktop_1920x1080': 'Desktop (1920x1080)'
};

// Create output directory
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to create title card
function createTitleCard(text, outputPath, duration = 3) {
  console.log(`   🎬 Creating title card: ${text}`);

  const cmd = `ffmpeg -f lavfi -i color=c=black:s=1920x1080:d=${duration} -vf "drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:text='${text}':fontcolor=white:fontsize=72:x=(w-text_w)/2:y=(h-text_h)/2" -y "${outputPath}"`;

  execSync(cmd, { stdio: 'pipe' });
}

// Convert technical page name to readable label
function makeReadableLabel(pageName) {
  return pageName
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Get all video files organized by page
function getVideosByPage() {
  const files = fs.readdirSync(videosDir).filter(f => f.endsWith('.mp4'));
  const organized = {};
  const pageLabels = {};

  files.forEach(file => {
    // Parse filename: PageName_viewport_resolution.mp4
    const nameWithoutExt = file.replace('.mp4', '');

    // Find viewport type by matching known viewport patterns
    let viewport = null;
    let pageName = null;

    for (const [key, label] of Object.entries(viewportLabels)) {
      if (nameWithoutExt.includes(key)) {
        viewport = key;
        // Page name is everything before the viewport
        pageName = nameWithoutExt.substring(0, nameWithoutExt.indexOf(key) - 1);
        break;
      }
    }

    if (!viewport || !pageName) {
      console.log(`⚠️  Could not parse: ${file}`);
      return;
    }

    if (!organized[pageName]) {
      organized[pageName] = [];
      pageLabels[pageName] = makeReadableLabel(pageName);
    }
    organized[pageName].push({
      file,
      viewport,
      fullPath: path.join(videosDir, file)
    });
  });

  // Sort pages alphabetically
  const sortedPageNames = Object.keys(organized).sort();

  return { organized, pageLabels, pageOrder: sortedPageNames };
}

// Main execution
async function main() {
  console.log('🎬 Starting video compilation...\n');

  const { organized, pageLabels, pageOrder } = getVideosByPage();
  const concatList = [];
  let titleCardCount = 0;

  console.log('📊 Creating title cards and building concat list...\n');

  // Process each page
  for (const pageName of pageOrder) {
    const cleanPageName = pageLabels[pageName];
    console.log(`\n📄 ${cleanPageName}`);

    // Create page title card
    const pageTitleCard = path.join(outputDir, `title_${titleCardCount}_page_${pageName}.mp4`);
    createTitleCard(cleanPageName, pageTitleCard, 3);
    concatList.push(pageTitleCard);
    titleCardCount++;

    // Sort videos by viewport order
    const viewportOrder = [
      'mobile_360x800',
      'iphone14_390x844',
      'mobile_landscape_640x767',
      'tablet_768x1024',
      'laptop_small_1024x768',
      'laptop_large_1366x768',
      'desktop_1920x1080'
    ];

    const sortedVideos = organized[pageName].sort((a, b) => {
      return viewportOrder.indexOf(a.viewport) - viewportOrder.indexOf(b.viewport);
    });

    // Add each viewport video with title card
    for (const video of sortedVideos) {
      const viewportLabel = viewportLabels[video.viewport] || video.viewport;

      // Create viewport title card
      const viewportTitleCard = path.join(outputDir, `title_${titleCardCount}_${pageName}_${video.viewport}.mp4`);
      createTitleCard(`${cleanPageName} - ${viewportLabel}`, viewportTitleCard, 2);
      concatList.push(viewportTitleCard);
      titleCardCount++;

      // Add actual video
      concatList.push(video.fullPath);
      console.log(`   ✅ ${viewportLabel}`);
    }
  }

  console.log(`\n📝 Creating concat list file...`);

  // Create concat list file
  const concatListPath = path.join(outputDir, 'concat_list.txt');
  const concatContent = concatList.map(f => `file '${f}'`).join('\n');
  fs.writeFileSync(concatListPath, concatContent);

  console.log(`   Total segments: ${concatList.length}`);
  console.log(`   Title cards: ${titleCardCount}`);
  console.log(`   Videos: ${concatList.length - titleCardCount}`);

  console.log(`\n🎬 Processing videos to 16:9 with black bars... (this may take several minutes)`);

  // First pass: normalize all videos to 16:9 with black bars
  console.log(`\n   Step 1/2: Converting all videos to 16:9...`);
  const normalizedDir = path.join(outputDir, 'normalized');
  if (!fs.existsSync(normalizedDir)) {
    fs.mkdirSync(normalizedDir, { recursive: true });
  }

  const normalizedList = [];
  for (let i = 0; i < concatList.length; i++) {
    const inputFile = concatList[i];
    const outputFile = path.join(normalizedDir, `normalized_${i}.mp4`);

    // FFmpeg filter: scale to fit within 1920x1080, then pad to exact 16:9 with black bars
    // scale=1920:1080:force_original_aspect_ratio=decrease - scale down to fit, maintain aspect
    // pad=1920:1080:(ow-iw)/2:(oh-ih)/2:black - pad to 1920x1080, center, black bars
    const normalizeCmd = `ffmpeg -i "${inputFile}" -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2:black" -c:v libx264 -preset fast -crf 23 -c:a copy -y "${outputFile}"`;

    execSync(normalizeCmd, { stdio: 'pipe' });
    normalizedList.push(outputFile);
    process.stdout.write(`\r   Progress: ${i + 1}/${concatList.length} videos normalized`);
  }
  console.log('\n');

  // Create new concat list with normalized videos
  const normalizedConcatPath = path.join(outputDir, 'concat_list_normalized.txt');
  const normalizedConcatContent = normalizedList.map(f => `file '${f}'`).join('\n');
  fs.writeFileSync(normalizedConcatPath, normalizedConcatContent);

  console.log(`   Step 2/2: Concatenating normalized videos...`);

  // Concatenate all normalized videos (now we can use -c copy since they're all the same format)
  const concatCmd = `ffmpeg -f concat -safe 0 -i "${normalizedConcatPath}" -c copy -y "${finalOutput}"`;

  try {
    execSync(concatCmd, { stdio: 'inherit' });

    console.log(`\n✅ Master video created successfully!`);
    console.log(`📁 Location: ${finalOutput}`);

    // Get file size
    const stats = fs.statSync(finalOutput);
    const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    console.log(`📊 File size: ${fileSizeMB} MB`);

  } catch (error) {
    console.error(`\n❌ Error during concatenation:`, error.message);
    console.log(`\nℹ️  Concat list saved at: ${concatListPath}`);
  }
}

main().catch(console.error);
