# Order processing

Orders store non-guessable references, line snapshots, shipping class and verification status.
Payment confirmation requires Stripe session verification and preferably webhook confirmation.
Success pages must not trust query parameters alone without server verification.
