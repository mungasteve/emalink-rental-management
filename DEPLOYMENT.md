# Deployment Guide - Emalink to Vercel

## Prerequisites
- Vercel account (vercel.com)
- GitHub account with repo pushed
- Database (Supabase or Vercel Postgres recommended)
- M-Pesa credentials (optional, for payments)

## Step 1: Set Up Database

### Option A: Supabase (Recommended)
1. Go to supabase.com and create a project
2. Copy the connection string from Settings → Database → Connection Pooling
3. Format: `postgresql://user:password@host:port/database?schema=public`

### Option B: Vercel Postgres
1. In Vercel dashboard, go to Storage → Create Database → Postgres
2. Copy the connection string

## Step 2: Push Code to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

## Step 3: Deploy to Vercel
1. Go to vercel.com/new
2. Import your GitHub repository
3. Select "Next.js" framework
4. In Environment Variables, add:

```
DATABASE_URL=postgresql://...
AUTH_SECRET=<generate-32-char-random-string>
NEXTAUTH_URL=https://your-domain.vercel.app
MPESA_CONSUMER_KEY=<your-key>
MPESA_CONSUMER_SECRET=<your-secret>
MPESA_SHORTCODE=174379
MPESA_PASSKEY=<your-passkey>
```

## Step 4: Run Database Migrations
After deployment, run in Vercel CLI or dashboard terminal:
```bash
npx prisma migrate deploy
npx prisma db push
```

## Step 5: Set Custom Domain (Optional)
1. In Vercel dashboard → Settings → Domains
2. Add your custom domain (e.g., emalink.co.ke)
3. Update DNS records as instructed

## Environment Variables Checklist
- [ ] DATABASE_URL set and tested
- [ ] AUTH_SECRET generated (min 32 chars)
- [ ] NEXTAUTH_URL matches your domain
- [ ] M-Pesa credentials added (if using payments)

## Post-Deployment Checks
- [ ] Homepage loads without errors
- [ ] Contact form submits successfully
- [ ] Login/Register pages work
- [ ] Properties page displays
- [ ] Blog pages load
- [ ] 404 page shows on invalid routes

## Troubleshooting

### Database Connection Error
- Verify DATABASE_URL is correct
- Check IP whitelist in database settings
- Ensure schema is "public"

### Auth Not Working
- Verify AUTH_SECRET is set
- Check NEXTAUTH_URL matches your domain
- Clear browser cookies and try again

### API Routes Returning 500
- Check Vercel logs: vercel.com → your-project → Deployments → Logs
- Verify all environment variables are set
- Check database connection

## Monitoring
- Set up error tracking: Sentry.io
- Monitor performance: Vercel Analytics
- Check logs regularly

## Next Steps
1. Set up custom email domain for contact form responses
2. Configure M-Pesa for production
3. Add analytics (Google Analytics, Mixpanel)
4. Set up automated backups for database
