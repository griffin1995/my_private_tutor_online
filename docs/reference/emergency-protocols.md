# Emergency Protocols

Critical procedures for handling system failures and recovery situations.

## Homepage Recovery Protocol

### Immediate Response (Critical)

If homepage loading failures occur, follow this emergency procedure immediately.

#### Step 1: Immediate Diagnosis (< 2 minutes)

```bash
# Check current git status
git status

# Verify build locally
npm run build
```

**Look for these failure symptoms:**
- Loading spinners that never resolve
- ".map is not a function" errors
- Missing homepage sections
- useState/useEffect for static JSON content

#### Step 2: CMS Pattern Audit (< 5 minutes)

**Check for forbidden async patterns:**

1. Search for async CMS functions:
   ```bash
   grep -r "async.*CMS\|Promise.*CMS" src/
   ```

2. Search for useState with content:
   ```bash
   grep -r "useState.*content\|useState.*cms" src/
   ```

3. Search for useEffect with loading:
   ```bash
   grep -r "useEffect.*load\|useEffect.*cms" src/
   ```

#### Step 3: Emergency Recovery (< 10 minutes)

**If async patterns found:**

1. **Convert to synchronous immediately:**
   ```typescript
   // ❌ Remove this pattern
   const [content, setContent] = useState(null);
   useEffect(() => {
     loadContent();
   }, []);

   // ✅ Replace with this pattern
   import cmsContent from '../content/cms-content.json';
   const content = cmsContent;
   ```

2. **Remove dynamic imports:**
   ```typescript
   // ❌ Remove this
   const content = await import('../content/data.json');

   // ✅ Replace with this
   import content from '../content/data.json';
   ```

3. **Eliminate loading states:**
   ```typescript
   // ❌ Remove loading states for static data
   if (loading) return <Spinner />;

   // ✅ Direct rendering
   return <div>{content.title}</div>;
   ```

#### Step 4: Verification (< 5 minutes)

```bash
# Build verification
npm run build

# Local development test
npm run dev
```

**Verify:**
- Homepage loads immediately without spinners
- All sections render on first paint
- No console errors
- CMS data loads synchronously

---

## Build Failure Recovery

### TypeScript Compilation Errors

#### Common Issues and Solutions

**Missing Type Definitions:**
```bash
# Install missing types
npm install @types/[package-name]

# Or add type declarations
echo "declare module '[package-name]';" >> src/types/global.d.ts
```

**Import/Export Errors:**
```bash
# Check for circular dependencies
npm run build 2>&1 | grep -i "circular"

# Verify import paths
grep -r "import.*from.*\.\." src/
```

### CSS Build Failures

**Tailwind Configuration Issues:**
```bash
# Verify Tailwind config
npx tailwindcss init --verify

# Check content configuration
grep -A 5 "content:" tailwind.config.*
```

**@layer base Issues:**
```bash
# Verify globals.css structure
head -20 src/app/globals.css | grep -E "@layer|@tailwind"
```

---

## Performance Emergency Response

### Build Time Exceeding 11.0s

**Immediate Investigation:**
```bash
# Time the build process
time npm run build

# Check route generation
npm run build 2>&1 | grep -i "route\|generating"
```

**Common Causes:**
- Large bundle sizes from unused imports
- Synchronous processing blocking build pipeline
- Memory issues from recursive operations

**Quick Fixes:**
```bash
# Clear Next.js cache
rm -rf .next

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Runtime Performance Issues

**Memory Leaks Detection:**
```bash
# Monitor during development
npm run dev

# Watch for memory patterns in browser DevTools
# Look for increasing memory usage over time
```

**Image Optimisation Issues:**
```bash
# Check image imports
grep -r "\.jpg\|\.png\|\.webp" src/

# Verify Next.js Image component usage
grep -r "next/image" src/
```

---

## Deployment Emergency Recovery

### Vercel Deployment Failures

**Immediate Rollback:**
```bash
# Revert last commit
git revert HEAD
git push origin main

# Redeploy previous version
vercel --prod
```

**Alternative Rollback via Vercel Dashboard:**
1. Go to Vercel project dashboard
2. Find previous successful deployment
3. Click "Promote to Production"
4. Verify homepage functionality

### Production Environment Issues

**Cache-Related Problems:**
```bash
# Purge CDN cache
vercel cache purge --type=cdn

# Verify cache headers
curl -I https://[your-domain.vercel.app]
```

**Environment Variable Issues:**
```bash
# Check Vercel environment variables
vercel env list

# Verify local environment
cat .env.local
```

---

## Security Emergency Response

### Suspected Security Breach

**Immediate Actions:**
1. **Revoke API keys and tokens immediately**
2. **Check recent commits for malicious code**
3. **Verify no sensitive data in repository**

```bash
# Search for potential secrets
grep -r "api.*key\|secret\|password\|token" . --exclude-dir=node_modules

# Check recent commits
git log --oneline -10

# Verify no malicious files
find . -name "*.zip" -o -name "virus*" -o -name "malware*"
```

### Suspicious File Changes

**Investigation Commands:**
```bash
# Check uncommitted changes
git status
git diff

# Check recent file modifications
find . -type f -mtime -1 -not -path "./node_modules/*"

# Verify file integrity
git log --stat -10
```

---

## Contact Information and Escalation

### Emergency Response Priority

1. **Homepage Failure**: Immediate response required (< 10 minutes)
2. **Build Failures**: High priority (< 30 minutes)
3. **Deployment Issues**: Medium priority (< 1 hour)
4. **Performance Issues**: Low priority (< 4 hours)

### Recovery Documentation

After any emergency response:

1. **Document the issue** in incident log
2. **Record the solution** applied
3. **Update prevention measures** if needed
4. **Review emergency protocol effectiveness**

### Post-Incident Review

**Required Actions:**
- Root cause analysis
- Prevention measure implementation
- Documentation updates
- Team notification of lessons learned

## Related Documentation

- [CMS Patterns (Critical)](../standards/cms-patterns.md)
- [Development Standards](../standards/development-standards.md)
- [Deployment Procedures](../technical/deployment.md)
- [Agent Specialisation](agent-specialisation.md)