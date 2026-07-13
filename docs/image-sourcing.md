# Image sourcing

Exact product photography is required for every SKU.

Priority:
1. Original Brightdesk inventory photography
2. Licensed supplier media
3. Official manufacturer media approved for retailer use
4. Authorized distributor media
5. Commissioned photography

Do not copy competitor or marketplace images.

Missing images must use the placeholder, set `imageVerificationStatus: "missing"`, keep `productionReady: false`, and block live purchase.

Current catalog: all 26 products include studio-style catalog images at `public/products/[slug]/main.png`.

These are development studio cutouts matched to each product title. Replace with verified physical inventory photography before marking `imageVerificationStatus: "verified"` and `productionReady: true`.
