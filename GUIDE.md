# Emalink Property Management Platform - Complete Guide

## 📋 Project Overview

Emalink is a Next.js-based property management platform for Kenya. It enables property owners to manage rental portfolios, collect rent via M-Pesa, handle maintenance requests, and screen tenants. The platform features a public property listing site and private owner/tenant portals.

**Tech Stack**: Next.js 16.2.9, TypeScript, Tailwind CSS v4, shadcn/ui, Prisma v7, PostgreSQL, NextAuth v5, Framer Motion

**Design**: Navy Blue (#1a2332) + Gold (#c9a84c), Playfair Display (headings) + Inter (body)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Installation
```bash
# Clone and install
git clone <repo>
cd emalink
npm install

# Setup environment
cp .env.example .env
# Edit .env with your database URL and secrets

# Run migrations
npx prisma migrate deploy

# Seed database with sample properties
npm run seed

# Start development server
npm run dev
```

Open http://localhost:3000

---

## 📁 Project Structure

```
src/
├── app/                          # Next.js app directory
│   ├── api/                      # API routes
│   │   ├── properties/           # Property listing endpoints
│   │   ├── leads/                # Lead capture
│   │   ├── auth/                 # Authentication
│   │   ├── mpesa/                # M-Pesa integration
│   │   └── [other routes]/
│   ├── properties/               # Public property pages
│   ├── wishlist/                 # Saved properties
│   ├── [other pages]/
│   └── layout.tsx
├── components/
│   ├── properties/               # Property-specific components
│   │   ├── property-carousel.tsx # Image gallery
│   │   ├── price-range-filter.tsx # Price filter
│   │   ├── wishlist-button.tsx   # Save to wishlist
│   │   └── property-image.tsx
│   ├── layout/                   # Navigation, footer
│   ├── home/                     # Homepage sections
│   └── ui/                       # shadcn/ui components
├── lib/
│   ├── prisma.ts                 # Database client
│   ├── auth.ts                   # NextAuth config
│   └── db-init.ts                # Database initialization
└── styles/
    └── globals.css               # Tailwind + design tokens
```

---

## ✨ Key Features Implemented

### 1. **Property Listing & Discovery**
- Browse 500+ properties across Kenya
- Filter by price range, type, bedrooms, location
- Featured properties section
- Property details with professional descriptions
- Image carousel with thumbnails

### 2. **Wishlist / Saved Properties**
- Heart icon to save favorites
- Persistent storage (localStorage)
- Dedicated wishlist page
- No login required

### 3. **Lead Capture**
- Contact form on homepage
- Property inquiry forms
- All submissions saved to database
- Email validation and error handling

### 4. **Authentication**
- NextAuth v5 with credentials provider
- JWT sessions
- Bcrypt password hashing
- Owner and tenant portals
- Admin dashboard

### 5. **M-Pesa Integration**
- Daraja API integration
- STK push for rent payments
- Callback handling
- Payment status tracking

### 6. **Database**
- PostgreSQL with Prisma ORM
- Connection pooling (5-20 connections)
- SSL/TLS encryption
- 30-second query timeout
- Automatic retry logic
- Rate limiting (5 requests/hour)

---

## 🔧 API Endpoints

### Properties
- `GET /api/properties` - List all properties
- `GET /api/properties/[id]` - Get property details

### Leads
- `POST /api/leads` - Submit inquiry/contact form

### Authentication
- `POST /api/auth/signin` - Login
- `POST /api/auth/signout` - Logout
- `POST /api/register` - Register new user

### M-Pesa
- `POST /api/mpesa` - Initiate STK push
- `POST /api/mpesa/callback` - Handle payment callback

### Owner Portal
- `GET /api/owner/properties` - List owner's properties
- `POST /api/owner/add-property` - Add new property
- `GET /api/owner/financials` - Financial reports
- `GET /api/owner/maintenance` - Maintenance requests

### Tenant Portal
- `POST /api/tenant/payments` - Record payment
- `POST /api/tenant/maintenance` - Submit maintenance request

---

## 🎨 Design System

### Colors
- **Navy**: #1a2332 (primary)
- **Gold**: #c9a84c (accent)
- **Cream**: #f5f3f0 (background)
- **White**: #ffffff (surfaces)

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### Spacing Scale
- xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px

### Responsive Breakpoints
- Mobile: 375px (iPhone SE)
- Tablet: 768px (iPad)
- Desktop: 1024px+

---

## 📊 Database Schema

### Core Models
- **User**: Authentication and profile
- **Property**: Rental properties
- **Unit**: Individual units within properties
- **Tenant**: Tenant profiles
- **Owner**: Property owner profiles
- **Lease**: Lease agreements
- **Payment**: Rent payments
- **Maintenance**: Maintenance requests
- **Lead**: Contact form submissions

See `prisma/schema.prisma` for full schema.

---

## 🔐 Security Features

- **Authentication**: NextAuth v5 with JWT
- **Password Hashing**: Bcrypt (10 rounds)
- **Database**: SSL/TLS encryption, connection pooling
- **API**: Rate limiting, input validation, error handling
- **Environment**: Secrets in .env (never committed)
- **CORS**: Configured for production domains

---

## 📱 Responsive Design

All components are mobile-first and tested on:
- 375px (iPhone SE)
- 390px (iPhone 12)
- 768px (iPad)
- 1024px (iPad Pro)
- 1440px (Desktop)

---

## 🚢 Deployment

### Environment Variables Required
```
DATABASE_URL=postgresql://user:pass@host:5432/emalink
AUTH_SECRET=<generate-secure-random-string>
NEXTAUTH_URL=https://yourdomain.com
MPESA_CONSUMER_KEY=<daraja-key>
MPESA_CONSUMER_SECRET=<daraja-secret>
MPESA_SHORTCODE=174379
MPESA_PASSKEY=<daraja-passkey>
```

### Build & Deploy
```bash
npm run build
npm start
```

Recommended: Deploy on Vercel (native Next.js support)

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] Properties page loads and filters work
- [ ] Wishlist saves/removes properties
- [ ] Contact form submits successfully
- [ ] Property details page displays correctly
- [ ] Mobile responsive on all breakpoints
- [ ] Authentication flows work
- [ ] M-Pesa integration (sandbox)

### Database Testing
```bash
# Test connection
npx prisma db execute --stdin < test.sql

# View data
npx prisma studio
```

---

## 📈 Performance Optimization

- **Images**: Lazy loading, responsive sizes
- **Filtering**: Debounced (300ms) for smooth UX
- **Database**: Connection pooling, query optimization
- **Caching**: Browser cache for static assets
- **Code Splitting**: Automatic with Next.js

---

## 🔄 Development Workflow

### Adding a New Feature
1. Create component in `src/components/`
2. Add API route in `src/app/api/` if needed
3. Update database schema if required
4. Run migrations: `npx prisma migrate dev --name feature_name`
5. Test on mobile and desktop
6. Commit and push

### Database Changes
```bash
# Create migration
npx prisma migrate dev --name add_new_field

# Deploy migration
npx prisma migrate deploy

# Seed data
npm run seed
```

---

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Test connection
psql $DATABASE_URL -c "SELECT 1"

# Check Prisma
npx prisma db push
```

### Build Errors
```bash
# Clear cache
rm -rf .next
npm run build
```

### Seed Script Issues
```bash
# Ensure .env is loaded
export $(cat .env | xargs)
npm run seed
```

---

## 📚 Additional Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [NextAuth.js](https://next-auth.js.org)
- [shadcn/ui](https://ui.shadcn.com)

---

## 🎯 Next Steps

### Phase 1 (Completed)
- ✅ Property listing with real database
- ✅ Price range filter
- ✅ Featured properties
- ✅ Wishlist functionality
- ✅ Professional descriptions

### Phase 2 (Recommended)
- Property reviews & ratings
- Property alerts (new listings, price drops)
- Inquiry tracking dashboard
- Lead management system

### Phase 3 (Future)
- Analytics dashboard
- Automated property matching
- Tenant application workflow
- Video tours integration

---

## 📝 Git Workflow

```bash
# Create feature branch
git checkout -b feature/property-carousel

# Make changes and commit
git add .
git commit -m "feat: add property image carousel"

# Push to GitHub
git push origin feature/property-carousel

# Create Pull Request on GitHub
```

---

## 📞 Support

For issues or questions:
1. Check this guide first
2. Review code comments
3. Check GitHub issues
4. Contact development team

---

**Last Updated**: July 2025
**Version**: 1.0.0
**Status**: Production Ready
