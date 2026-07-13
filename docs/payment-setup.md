# Payment setup

1. Create a Stripe account.
2. Add test keys to `.env.local`.
3. Configure webhook endpoint `/api/webhooks/stripe`.
4. Verify signature with `STRIPE_WEBHOOK_SECRET`.
5. Enable live mode only after product, shipping, tax, email and legal readiness.

Never collect card numbers in ordinary form inputs.
