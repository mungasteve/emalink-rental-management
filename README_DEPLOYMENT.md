# Emalink - Property Management Platform

A modern property management platform for Kenya built with Next.js, TypeScript, Tailwind CSS, and PostgreSQL.

## Features

- **Property Management** - List, manage, and track properties
- **Tenant Portal** - Rent payments, maintenance requests, communication
- **Owner Dashboard** - Portfolio overview, financials, maintenance tracking
- **Admin Panel** - User management, role assignment
- **M-Pesa Integration** - Automated rent collection via Daraja API
- **Blog** - Property guides and market insights
- **Contact Form** - Lead capture with database storage

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS v4
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth v5 (Auth.js)
- **Payments**: M-Pesa Daraja API
- **Animations**: Framer Motion
- **UI Components**: shadcn/ui, Radix UI

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- M-Pesa Daraja credentials (optional)

### Local Development

1. Clone the repository
```bash
git clone <repo-url>
cd emalink
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your values
```

4. Set up database
```bash
npx prisma migrate dev
npx prisma db push
```

5. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions to Vercel.

### Quick Deploy to Vercel

1. Push code to GitHub
2. Go to vercel.com/new and import repository
3. Add environment variables (see DEPLOYMENT.md)
4. Deploy

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Auth pages (login, register)
│   ├── api/               # API routes
│   ├── admin/             # Admin dashboard
│   ├── owner/             # Owner portal
│   ├── tenant/            # Tenant portal
│   ├── blog/              # Blog pages
│   ├── properties/        # Property listings
│   └── contact/           # Contact page
├── components/            # React components
│   ├── home/             # Homepage sections
│   ├── layout/           # Layout components
│   ├── ui/               # UI components
│   └── properties/       # Property components
├── lib/                  # Utilities
│   ├── auth.ts          # NextAuth configuration
│   ├── prisma.ts        # Prisma client
│   └── rate-limit.ts    # Rate limiting
└── styles/              # Global styles
```

## Environment Variables

```
DATABASE_URL              # PostgreSQL connection string
AUTH_SECRET              # NextAuth secret (min 32 chars)
NEXTAUTH_URL             # Your app URL
MPESA_CONSUMER_KEY       # M-Pesa Daraja key
MPESA_CONSUMER_SECRET    # M-Pesa Daraja secret
MPESA_SHORTCODE          # M-Pesa shortcode
MPESA_PASSKEY            # M-Pesa passkey
```

## Database Schema

Key models:
- **User** - Authentication and roles
- **Property** - Property listings
- **Unit** - Individual rental units
- **Tenant** - Tenant information
- **Payment** - Rent payments
- **MaintenanceRequest** - Maintenance tickets
- **Lead** - Contact form submissions

## API Routes

### Public
- `GET /api/leads` - Submit contact form
- `GET /properties` - List properties

### Protected (Auth Required)
- `GET /api/owner/properties` - Owner's properties
- `GET /api/tenant/payments` - Tenant's payments
- `POST /api/mpesa` - Initiate M-Pesa payment
- `POST /api/mpesa/callback` - M-Pesa callback

### Admin Only
- `GET /api/admin/users` - List all users
- `PATCH /api/admin/users` - Update user role

## Security

- Rate limiting on API routes
- CORS headers configured
- XSS protection enabled
- CSRF tokens on forms
- SQL injection prevention via Prisma
- Password hashing with bcrypt

## Performance

- Image optimization via Next.js
- CSS-in-JS with Tailwind
- Code splitting and lazy loading
- Optimized animations with Framer Motion
- Database query optimization

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

Proprietary - Emalink

## Support

For issues or questions, contact: info@emalink.co.ke

## Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] Automated maintenance scheduling
- [ ] Tenant screening integration
- [ ] Multi-currency support
- [ ] API for third-party integrations
