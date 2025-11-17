# Payload CMS Backend Implementation Guide
## Quick Start for My Private Tutor Online

**Estimated Time**: 2-3 hours for complete setup
**Prerequisite Knowledge**: Basic terminal/command line usage
**Cost**: £14-20/month (after free tiers)

---

## Prerequisites Checklist

Before starting, ensure you have:

- [ ] GitHub account with repository access
- [ ] Vercel account (already set up for frontend)
- [ ] Credit card for Railway (£5/month minimum, includes credits)
- [ ] Node.js 20.x installed locally
- [ ] Git installed locally
- [ ] Terminal/command line access

---

## Phase 1: Database Setup (15 minutes)

### Step 1.1: Create MongoDB Atlas Account

1. Navigate to https://www.mongodb.com/cloud/atlas/register
2. Sign up with email (no credit card required for free tier)
3. Choose "Shared" cluster (M0 Free Tier)
4. Select cloud provider: **AWS**
5. Select region: **London (eu-west-2)** (closest to UK users)
6. Cluster name: `my-tutor-online-prod`
7. Click "Create Cluster" (takes 3-5 minutes to provision)

### Step 1.2: Configure Database Security

1. **Network Access**:
   - Click "Network Access" in left sidebar
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"
   - Note: This is required because Railway uses dynamic IPs

2. **Database User**:
   - Click "Database Access" in left sidebar
   - Click "Add New Database User"
   - Authentication Method: "Password"
   - Username: `payload-cms-user`
   - Password: Click "Autogenerate Secure Password" (copy this!)
   - Database User Privileges: "Atlas Admin" (or "Read and write to any database")
   - Click "Add User"

### Step 1.3: Get Connection String

1. Click "Database" in left sidebar
2. Click "Connect" on your cluster
3. Select "Connect your application"
4. Driver: "Node.js"
5. Version: "5.5 or later"
6. Copy the connection string (looks like: `mongodb+srv://payload-cms-user:<password>@...`)
7. Replace `<password>` with the password you generated in Step 1.2
8. Save this connection string securely (you'll need it for Railway)

**Example**:
```
mongodb+srv://payload-cms-user:YOUR_PASSWORD_HERE@my-tutor-online-prod.abc123.mongodb.net/my-tutor-online?retryWrites=true&w=majority
```

---

## Phase 2: Railway Setup (20 minutes)

### Step 2.1: Create Railway Account

1. Navigate to https://railway.app
2. Click "Start a New Project"
3. Sign in with GitHub (recommended for auto-deploy)
4. Authorise Railway to access your GitHub repositories

### Step 2.2: Create New Project

1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Find and select your repository: `my_private_tutor_online`
4. Railway will detect Node.js project
5. Click "Deploy Now"
6. **Important**: Deployment will fail initially - this is expected (missing environment variables)

### Step 2.3: Configure Environment Variables

1. Click on your service in Railway dashboard
2. Go to "Variables" tab
3. Click "New Variable" and add each of the following:

**Required Variables**:

| Variable Name | Value | How to Generate |
|---------------|-------|-----------------|
| `NODE_ENV` | `production` | Literal value |
| `MONGODB_URI` | Your Atlas connection string | From Phase 1, Step 1.3 |
| `PAYLOAD_SECRET` | `<generate-this>` | Run in terminal: `openssl rand -base64 32` |
| `SESSION_SECRET` | `<generate-this>` | Run in terminal: `openssl rand -base64 32` |
| `ADMIN_EMAIL` | `admin@myprivatetutoronline.co.uk` | Your admin email |
| `ADMIN_PASSWORD` | `<strong-password>` | Create a strong password (12+ chars) |
| `PAYLOAD_PUBLIC_SERVER_URL` | `https://your-service.railway.app` | Copy from Railway dashboard |

**Optional Variables** (can add later):

| Variable Name | Value | Notes |
|---------------|-------|-------|
| `CORS_ALLOWED_ORIGINS` | `https://myprivatetutoronline.com` | Comma-separated domains |
| `GITHUB_WEBHOOK_TOKEN` | `<github-pat>` | For content update webhooks (Phase 4) |
| `BLOB_READ_WRITE_TOKEN` | `<vercel-blob-token>` | For media storage (Phase 3) |

### Step 2.4: Generate Required Secrets

Open your terminal and run:

```bash
# Generate PAYLOAD_SECRET
openssl rand -base64 32

# Generate SESSION_SECRET
openssl rand -base64 32
```

Copy each output and paste into Railway variables.

### Step 2.5: Get Your Railway Service URL

1. In Railway dashboard, click on your service
2. Go to "Settings" tab
3. Scroll to "Networking" section
4. Click "Generate Domain"
5. Railway creates a URL like: `https://my-tutor-online-backend.railway.app`
6. Copy this URL
7. Add it to `PAYLOAD_PUBLIC_SERVER_URL` environment variable

### Step 2.6: Trigger Deployment

1. Click "Deployments" tab in Railway
2. Click "Deploy" button (or push a commit to GitHub)
3. Watch logs for deployment progress (takes 2-3 minutes)
4. Look for success message: "✅ Server listening on port 3001"

### Step 2.7: Verify Deployment

1. Open your Railway service URL in browser: `https://your-service.railway.app`
2. You should be redirected to: `https://your-service.railway.app/admin/cms`
3. Health check should work: `https://your-service.railway.app/api/health`
4. You should see JSON response with `"status": "healthy"`

**If deployment fails**:
- Check Railway logs for error messages
- Verify all environment variables are set correctly
- Ensure MongoDB Atlas connection string is correct (test with `mongosh` if possible)

---

## Phase 3: Vercel Blob Storage Setup (10 minutes)

### Step 3.1: Create Vercel Blob Store

1. Go to Vercel dashboard: https://vercel.com
2. Select your project: `my-tutor-online`
3. Go to "Settings" → "Storage"
4. Click "Create Database"
5. Select "Blob"
6. Name: `my-tutor-online-media`
7. Click "Create"

### Step 3.2: Get Blob Token

1. After creation, click on the Blob store
2. Go to "Settings" tab
3. Copy "Read-Write Token"
4. Add to Railway environment variables:
   - Variable name: `BLOB_READ_WRITE_TOKEN`
   - Value: Your copied token

### Step 3.3: Redeploy Railway Service

1. Go to Railway dashboard
2. Click "Deployments" tab
3. Click "Deploy" to trigger new deployment with Blob token
4. Verify deployment succeeds

---

## Phase 4: Frontend Integration (30 minutes)

### Step 4.1: Update Package.json Scripts

Open `/home/jack/Documents/my_private_tutor_online/package.json` and verify these scripts exist:

```json
{
  "scripts": {
    "build:payload": "payload build",
    "serve:payload": "NODE_ENV=production node server.js",
    "dev:payload": "NODE_ENV=development payload dev",
    "generate:payload-types": "payload generate:types"
  }
}
```

If not present, add them manually.

### Step 4.2: Configure GitHub Secrets

1. Go to your GitHub repository
2. Click "Settings" → "Secrets and variables" → "Actions"
3. Click "New repository secret"
4. Add the following secrets:

| Secret Name | Value | Where to Find |
|-------------|-------|---------------|
| `PAYLOAD_API_URL` | Your Railway URL | Railway dashboard → Settings → Networking |
| `PAYLOAD_API_KEY` | `<generate-in-payload>` | Generate in Phase 4.3 |
| `VERCEL_DEPLOY_HOOK` | `<vercel-hook-url>` | Generate in Phase 4.4 |

### Step 4.3: Generate Payload API Key

1. Navigate to your Railway service URL: `https://your-service.railway.app/admin/cms`
2. Log in with credentials from Railway environment variables:
   - Email: Value of `ADMIN_EMAIL`
   - Password: Value of `ADMIN_PASSWORD`
3. After login, go to "Users" in left sidebar
4. Click on your admin user
5. Scroll to "API Key" section
6. Click "Generate API Key"
7. Label: `GitHub Actions Build`
8. Copy the generated key
9. Add to GitHub repository secrets as `PAYLOAD_API_KEY`

### Step 4.4: Create Vercel Deploy Hook

1. Go to Vercel dashboard
2. Select your project
3. Go to "Settings" → "Git"
4. Scroll to "Deploy Hooks"
5. Click "Create Hook"
6. Name: `CMS Content Update`
7. Branch: `main`
8. Click "Create Hook"
9. Copy the webhook URL
10. Add to GitHub repository secrets as `VERCEL_DEPLOY_HOOK`

### Step 4.5: Verify GitHub Actions Workflow

The workflow file should already exist at:
`/home/jack/Documents/my_private_tutor_online/.github/workflows/sync-cms-data.yml`

If not, it was created in the previous steps. Verify it exists:

```bash
ls -la .github/workflows/sync-cms-data.yml
```

### Step 4.6: Test Content Sync Workflow

1. Go to GitHub repository
2. Click "Actions" tab
3. Click "Sync CMS Data from Payload" workflow
4. Click "Run workflow" dropdown
5. Select branch: `main`
6. Click "Run workflow"
7. Wait for workflow to complete (30-60 seconds)
8. Check if `content/*.json` files are created/updated

**Expected files**:
- `content/testimonials.json`
- `content/faq.json`
- `content/pages.json`
- `content/recognition-cards.json`
- `content/.sync-metadata.json`

---

## Phase 5: Testing (20 minutes)

### Test 1: Create Test Testimonial

1. Navigate to Railway admin panel: `https://your-service.railway.app/admin/cms`
2. Log in with admin credentials
3. Click "Testimonials" in sidebar
4. Click "Create New"
5. Fill in test data:
   - Student Name: "Test Student"
   - Testimonial Text: "This is a test testimonial"
   - Rating: 5
   - Exam Level: "GCSE"
   - Status: "Published" (important!)
6. Click "Save"

### Test 2: Verify GitHub Actions Triggered

1. Go to GitHub repository → Actions tab
2. Verify "Sync CMS Data from Payload" workflow started
3. Click on the workflow run to see logs
4. Verify it completes successfully
5. Check repository for updated `content/testimonials.json`

### Test 3: Verify Vercel Deployment

1. Go to Vercel dashboard
2. Check "Deployments" tab
3. Verify new deployment triggered after GitHub Actions completed
4. Wait for deployment to finish (30-60 seconds)
5. Visit your live site and check if test testimonial appears

### Test 4: Health Checks

```bash
# Test Railway backend health
curl https://your-service.railway.app/api/health

# Expected response:
# {
#   "status": "healthy",
#   "timestamp": "2025-11-13T...",
#   "uptime": 12345,
#   "database": "connected",
#   "collections": 6
# }
```

---

## Phase 6: Production Readiness (15 minutes)

### Step 6.1: Configure Custom Domain (Optional)

**For Railway (Backend)**:
1. Go to Railway dashboard → Settings
2. Scroll to "Networking"
3. Click "Custom Domain"
4. Enter: `cms.myprivatetutoronline.com`
5. Add CNAME record in your DNS provider:
   - Type: CNAME
   - Name: `cms`
   - Value: Your Railway URL (without https://)
6. Wait for DNS propagation (5-60 minutes)
7. Update `PAYLOAD_PUBLIC_SERVER_URL` environment variable to new domain

### Step 6.2: Enable Auto-Backups

**MongoDB Atlas** (already enabled):
- Daily snapshots automatic on free tier
- Retained for 2 days
- Access via: Atlas Dashboard → Backups

**GitHub Actions Weekly Backup** (optional):
Create `.github/workflows/backup-database.yml`:

```yaml
name: Weekly Database Backup

on:
  schedule:
    - cron: '0 3 * * 0'  # Every Sunday at 3 AM UTC
  workflow_dispatch:

jobs:
  backup:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - name: Backup CMS data
        env:
          PAYLOAD_API_URL: ${{ secrets.PAYLOAD_API_URL }}
          PAYLOAD_API_KEY: ${{ secrets.PAYLOAD_API_KEY }}
        run: node scripts/backup-cms-data.mjs
      - uses: actions/upload-artifact@v4
        with:
          name: cms-backup-${{ github.run_number }}
          path: backups/
          retention-days: 90
```

### Step 6.3: Set Up Monitoring

**Railway Monitoring** (built-in):
- Go to Railway dashboard → Metrics
- Monitor CPU, memory, network usage
- Set up alerts for high usage

**MongoDB Atlas Monitoring** (built-in):
- Go to Atlas dashboard → Metrics
- Monitor queries, connections, storage
- Set up alerts:
  - Storage > 400MB (80% of free tier)
  - Connections > 50
  - Query execution time > 1000ms

### Step 6.4: Document Credentials

Create a secure document (e.g., in 1Password, LastPass) with:

- MongoDB Atlas admin credentials
- Railway admin credentials
- Payload CMS admin email/password
- GitHub repository secrets
- Vercel Blob token
- All generated secrets (PAYLOAD_SECRET, SESSION_SECRET)

**Never commit this document to Git!**

---

## Troubleshooting

### Issue: Railway Deployment Fails

**Symptoms**: Build fails or deployment crashes immediately

**Solutions**:
1. Check Railway logs for error messages
2. Verify all environment variables are set correctly
3. Test MongoDB connection string locally:
   ```bash
   mongosh "mongodb+srv://payload-cms-user:PASSWORD@..."
   ```
4. Ensure `railway.toml` file exists in repository root
5. Verify `server.js` file exists in repository root

### Issue: GitHub Actions Workflow Fails

**Symptoms**: Workflow runs but fails to fetch data

**Solutions**:
1. Verify `PAYLOAD_API_URL` secret is correct (no trailing slash)
2. Verify `PAYLOAD_API_KEY` is valid (generate new one if needed)
3. Test API key manually:
   ```bash
   curl -H "Authorization: Bearer YOUR_API_KEY" \
        https://your-service.railway.app/api/testimonials
   ```
4. Check Railway service is running and healthy

### Issue: Frontend Not Updating

**Symptoms**: Content updated in CMS but not appearing on live site

**Solutions**:
1. Verify GitHub Actions workflow completed successfully
2. Check if JSON files in `content/` directory were updated
3. Verify Vercel deployment was triggered
4. Clear Vercel cache: `vercel cache purge --type=cdn`
5. Manually trigger Vercel deployment

### Issue: Admin Panel Not Accessible

**Symptoms**: 404 or 500 error when accessing `/admin/cms`

**Solutions**:
1. Verify Railway service is running (check dashboard)
2. Check Railway logs for errors
3. Verify `PAYLOAD_SECRET` environment variable is set
4. Restart Railway service: Railway dashboard → Click "Restart"

### Issue: Media Upload Fails

**Symptoms**: Images fail to upload in Payload admin panel

**Solutions**:
1. Verify `BLOB_READ_WRITE_TOKEN` is set in Railway
2. Check Vercel Blob storage exists
3. Verify Vercel Blob adapter is configured in `payload.config.ts`
4. Check file size (Vercel Blob has 5MB limit per file)

---

## Cost Monitoring

### Monthly Cost Breakdown

Track your costs to stay within budget:

**Railway**:
- Check usage: Railway Dashboard → Billing
- $5/month included credit
- Estimate: £12-15/month total

**MongoDB Atlas**:
- Check usage: Atlas Dashboard → Billing
- M0 Free Tier: £0/month
- Alert when approaching 512MB storage limit

**Vercel Blob**:
- Check usage: Vercel Dashboard → Storage → Usage
- Pay-as-you-go: ~£2-5/month for typical usage

**Total Expected**: £14-20/month

### Cost Optimisation Tips

1. **Railway**: Enable "Sleep on inactivity" (saves 50-70% but adds cold start delay)
2. **MongoDB**: Regularly clean up draft/archived content to stay under 512MB
3. **Vercel Blob**: Compress images before upload, use WebP format
4. **General**: Monitor usage weekly, set billing alerts

---

## Next Steps

After successful implementation:

1. **Populate Content**: Add real testimonials, FAQs, pages via admin panel
2. **Train Editors**: Create admin guide for content editors (see `BACKEND_ARCHITECTURE_PAYLOAD_RAILWAY.md` Section 6.2)
3. **Customise Collections**: Modify `payload.config.ts` to add custom fields as needed
4. **Implement Webhooks**: Configure Payload hooks to trigger deployments automatically
5. **Monitor Performance**: Review Railway/Atlas metrics weekly, optimise as needed

---

## Support Resources

- **Payload CMS Documentation**: https://payloadcms.com/docs
- **Railway Documentation**: https://docs.railway.app
- **MongoDB Atlas Documentation**: https://www.mongodb.com/docs/atlas
- **GitHub Actions Documentation**: https://docs.github.com/en/actions
- **Vercel Blob Documentation**: https://vercel.com/docs/storage/vercel-blob

---

## Success Checklist

After completing all phases, verify:

- [ ] MongoDB Atlas cluster running and accessible
- [ ] Railway service deployed and healthy (`/api/health` returns 200)
- [ ] Admin panel accessible at Railway URL
- [ ] Can log in to admin panel with credentials
- [ ] Vercel Blob storage configured and tokens set
- [ ] GitHub Actions workflow configured with all secrets
- [ ] Test content creates successfully in admin panel
- [ ] GitHub Actions workflow runs and updates JSON files
- [ ] Vercel deployment triggers automatically
- [ ] Frontend displays updated content
- [ ] All health checks passing
- [ ] Monitoring dashboards accessible
- [ ] Credentials documented securely

**Congratulations!** Your Payload CMS backend is now fully operational.

---

**Implementation Status**: ✅ READY TO EXECUTE
**Estimated Total Time**: 2-3 hours
**Total Monthly Cost**: £14-20
**Next Phase**: Content population and editor training
