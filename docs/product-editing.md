# Product editing

Products live in `src/data/products.ts`.

To add a product:
1. Add a complete Product object with all required fields.
2. Map functional zones and rooms.
3. Configure colorways (finish/upholstery/orientation).
4. Set shipping class and package fields.
5. Add image credit in `data/image-credits.ts`.
6. Add safety record in `data/product-safety.ts`.
7. Map workspace compatibility IDs.
8. Keep `productionReady: false` until images, specs and safety are verified.
9. Store images in `public/products/[slug]/`.
10. Confirm catalog count rules for launches.

Incomplete products cannot enter live checkout.
