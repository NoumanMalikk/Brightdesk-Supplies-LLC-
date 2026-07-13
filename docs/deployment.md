# Deployment

Deploy to Vercel.

Required before live mode:
- Verified product data and images
- Legal placeholders resolved (`data/legal-config.ts`)
- Stripe live keys + webhook
- Tax configuration
- Email provider
- `NEXT_PUBLIC_STORE_MODE=live`
- Launch checklist complete

Never commit secrets. Use Vercel environment variables.
