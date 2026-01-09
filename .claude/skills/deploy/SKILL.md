---
name: deploy
description: Deploy to Vercel, check deployment status, and manage production settings. Use when deploying the app or checking deployment status.
allowed-tools: Bash, Read, WebFetch
---

# Deploy Skill

Manages deployments to Vercel for the MUN Interactive Map.

## Prerequisites

- Vercel CLI installed: `bun add -g vercel`
- Logged in: `vercel login`
- Project linked: `vercel link`

## Common Operations

### First-Time Setup
```bash
# Install Vercel CLI
bun add -g vercel

# Login to Vercel
vercel login

# Link project (run in project root)
vercel link
```

### Deploy to Preview
```bash
vercel
```

### Deploy to Production
```bash
vercel --prod
```

### Check Deployment Status
```bash
vercel ls
```

### View Deployment Logs
```bash
vercel logs <deployment-url>
```

### Environment Variables
```bash
# Add env var
vercel env add VARIABLE_NAME

# List env vars
vercel env ls

# Pull env vars to local .env
vercel env pull
```

## Deployment Checklist

Before deploying, verify:
- [ ] `bun run build` succeeds locally
- [ ] No TypeScript errors
- [ ] All environment variables set in Vercel
- [ ] GeoJSON files in `public/geo/`

## Vercel Configuration

Create `vercel.json` if custom config needed:
```json
{
  "buildCommand": "bun run build",
  "outputDirectory": ".next",
  "framework": "nextjs"
}
```

## Troubleshooting

### Build Fails
1. Check build logs: `vercel logs <url>`
2. Verify `bun run build` works locally
3. Check for missing environment variables

### Static Files Not Loading
- Ensure files are in `public/` directory
- Check file paths are correct (case-sensitive)

## After Deployment

1. Test all map interactions
2. Verify country data loads
3. Check mobile responsiveness
4. Update context file with deployment URL
