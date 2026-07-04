# 🚀 QUICK DEPLOYMENT REFERENCE

## 5-Minute Setup

### 1. Database (Choose One)
```bash
# Option A: Supabase (Recommended)
# Go to supabase.com → Create Project → Copy Connection String

# Option B: Vercel Postgres
# In Vercel Dashboard → Storage → Create Database
```

### 2. Generate AUTH_SECRET
```bash
# Generate 32+ character random string
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. Push to GitHub
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### 4. Deploy to Vercel
```
1. Go to vercel.com/new
2. Import your GitHub repository
3. Add Environment Variables:
   - DATABASE_URL
   - AUTH_SECRET
   - NEXTAUTH_URL (your domain)
4. Click Deploy
```

### 5. Run Migrations
```bash
# After deployment, in Vercel CLI or dashboard:
npx prisma migrate deploy
npx prisma db push
```

## Environment Variables

```env
DATABASE_URL="postgresql://user:pass@host:5432/db?schema=public"
AUTH_SECRET="<32-char-random-string>"
NEXTAUTH_URL="https://yourdomain.com"
MPESA_CONSUMER_KEY="<optional>"
MPESA_CONSUMER_SECRET="<optional>"
MPESA_SHORTCODE="174379"
MPESA_PASSKEY="<optional>"
```

## Verification Checklist

- [ ] Build passes locally: `npm run build`
- [ ] No TypeScript errors
- [ ] Database connection works
- [ ] Homepage loads
- [ ] Contact form works
- [ ] Login/Register works
- [ ] 404 page shows

## Common Issues

| Issue | Solution |
|-------|----------|
| Database connection error | Check DATABASE_URL format and IP whitelist |
| Auth not working | Verify AUTH_SECRET is set and NEXTAUTH_URL matches domain |
| API 500 errors | Check Vercel logs and environment variables |
| Build fails | Run `npm run build` locally to debug |

## Useful Commands

```bash
# Local testing
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server

# Database
npx prisma studio   # Open Prisma Studio
npx prisma migrate dev --name <name>  # Create migration

# Deployment
vercel deploy       # Deploy via CLI
vercel logs         # View logs
```

## Documentation Files

| File | Purpose |
|------|---------|
| DEPLOYMENT.md | Step-by-step guide |
| README_DEPLOYMENT.md | Project documentation |
| DEPLOYMENT_CHECKLIST.md | Verification checklist |
| DEPLOYMENT_SUMMARY.md | Changes overview |
| DEPLOYMENT_STATUS.md | Current status |

## Support

- **Docs**: See DEPLOYMENT.md
- **Issues**: Check Vercel logs
- **Database**: Verify connection string
- **Auth**: Check AUTH_SECRET and NEXTAUTH_URL

---

**Status**: ✅ Ready to Deploy
**Time to Deploy**: ~15 minutes
**Estimated Uptime**: 99.9%
