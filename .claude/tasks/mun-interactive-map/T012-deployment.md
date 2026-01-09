# Task T012: Vercel Deployment

## Overview
| Field | Value |
|-------|-------|
| **Task ID** | T012 |
| **Phase** | 4 - Deployment |
| **Priority** | P0 (Critical) |
| **Agent** | `git-manager` |
| **Estimated Complexity** | Low |
| **Can Run In Parallel** | No (final task) |

## Description
Deploy the application to Vercel for production hosting.

## Prerequisites
- All Phase 1-3 tasks completed
- T011 tests passing
- Code reviewed and merged to main

## Acceptance Criteria
- [ ] Vercel project created
- [ ] GitHub repo connected
- [ ] Auto-deploy on push to main
- [ ] Production URL accessible
- [ ] Build completes without errors
- [ ] Site loads in < 2 seconds

## Implementation Steps

### Step 1: Prepare for Deployment
```bash
# Ensure build works locally
bun run build

# Check for any build warnings
```

### Step 2: Configure Vercel (via CLI or Dashboard)

#### Option A: CLI
```bash
# Install Vercel CLI
bun add -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts to link/create project
```

#### Option B: Dashboard
1. Go to vercel.com
2. Click "Import Project"
3. Select GitHub repo: `gabi0632/interactive-map-mun`
4. Configure:
   - Framework: Next.js
   - Build Command: `bun run build`
   - Install Command: `bun install`
5. Deploy

### Step 3: Configure Environment (if needed)
```bash
# If any env variables needed
vercel env add NEXT_PUBLIC_MAP_URL
```

### Step 4: Set Up Auto-Deploy
- Ensure GitHub integration is enabled
- Main branch auto-deploys to production
- PR branches create preview deployments

### Step 5: Configure Domain (Optional)
```bash
# Add custom domain
vercel domains add mun-map.yourdomain.com
```

### Step 6: Verify Deployment
- [ ] Visit production URL
- [ ] Test map loads correctly
- [ ] Test country click → panel flow
- [ ] Test on mobile (should show warning)
- [ ] Check performance in Lighthouse

## Output Artifacts
- `vercel.json` (if custom config needed)
- Production URL
- Preview URL pattern

## Verification
```bash
# Check deployment status
vercel ls

# Open production site
vercel open
```

## Post-Deployment
- Share production URL with team
- Set up monitoring (optional)
- Configure alerts for build failures

## Notes
- Vercel auto-detects Next.js and Bun
- No server required - static/SSG export
- Free tier sufficient for this project
