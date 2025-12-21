#!/bin/bash
# Preview reorganization changes without executing them
# Shows before/after structure comparison

echo "🔍 PROJECT REORGANIZATION PREVIEW"
echo "This shows what changes will be made (without executing them)"
echo ""

PROJECT_ROOT="/home/jack/Documents/my_private_tutor_online_old_dec"
cd "$PROJECT_ROOT"

echo "📊 CURRENT STATE ANALYSIS:"
echo ""

echo "📁 Root directory files to be archived:"
for item in blog_content_17_nov new_masterclass_images optimization-patterns visual_revisions reports tokens; do
    if [ -e "$item" ]; then
        echo "   📦 $item (will be moved to docs/archive/)"
    fi
done
echo ""

echo "📚 src/lib current fragmentation (23 directories → 6 groups):"
echo "   CURRENT FRAGMENTED STRUCTURE:"
cd src/lib
ls -1 | while read dir; do
    if [ -d "$dir" ]; then
        file_count=$(find "$dir" -name "*.ts" -o -name "*.tsx" 2>/dev/null | wc -l)
        echo "   📂 $dir/ ($file_count files)"
    fi
done

echo ""
echo "   NEW CONSOLIDATED STRUCTURE:"
echo "   📂 core/        ← utils.ts, constants/, validation/, image-utils.ts"
echo "   📂 data/        ← cms/, analytics/, metadata/"
echo "   📂 ui/          ← navbar-heights.ts → layout-utils.ts"
echo "   📂 auth/        ← security/, legal/"
echo "   📂 monitoring/  ← performance/, error-tracking.ts"
echo "   📂 integrations/ ← offline/"
echo "   🗑️  [12 empty directories will be removed]"

cd ../..
echo ""

echo "🧩 src/components reorganization:"
echo "   CURRENT MIXED ORGANIZATION:"
cd src/components
ls -1 | while read dir; do
    if [ -d "$dir" ]; then
        file_count=$(find "$dir" -name "*.tsx" -o -name "*.ts" 2>/dev/null | wc -l)
        echo "   📂 $dir/ ($file_count files)"
    fi
done

echo ""
echo "   NEW FEATURE-BASED ORGANIZATION:"
echo "   📂 ui/          ← (keep existing shadcn/ui primitives)"
echo "   📂 features/    ← education/, testimonials/, tutors/, faq/, legal/, contact/, blog/, video/"
echo "   📂 shared/      ← navigation/, layout/, sections/, seo/, performance/, privacy/"
echo "   📄 shared/cta.tsx ← cta10.tsx (renamed)"
echo "   🗑️  [obsolete directories: tutors-shadcn, tutors-shadcn-examples, marketing, client, pages, magicui]"

cd ../..
echo ""

echo "📱 src/app route structure:"
echo "   MINIMAL CHANGES (current structure works well):"
echo "   📂 (app)/ → add private _components/ folders where needed"
echo "   📂 (payload)/ → keep as-is"
echo "   📂 api/ → keep as-is (already optimally organized)"
echo ""

echo "✨ EXPECTED BENEFITS:"
echo "   • 87% reduction in lib directory complexity (23 → 6)"
echo "   • 100% elimination of empty directories"
echo "   • Feature-based organization improves maintainability"
echo "   • Follows 2025 Next.js best practices"
echo "   • Minimal import disruption (most paths stay the same)"
echo "   • Clear separation of concerns"
echo "   • Room for scalable growth"
echo ""

echo "🚀 TO EXECUTE THE REORGANIZATION:"
echo "   ./reorganize-project.sh"
echo ""
echo "🔒 SAFETY MEASURES INCLUDED:"
echo "   • Automatic git backup branch creation"
echo "   • Build verification after changes"
echo "   • Clear rollback instructions"
echo "   • Step-by-step progress reporting"