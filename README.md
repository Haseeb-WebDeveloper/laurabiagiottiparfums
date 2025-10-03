### Instagram: Webhook + Cache Invalidation

We fetch Instagram posts and profile stats via the Instagram Graph API and keep the UI fast with server caching plus real‑time updates via a webhook.

Endpoints:
- `GET /api/instagram/posts?limit=4` – Cached with Next.js cache tags (`instagram-posts`)
- `GET /api/instagram/stats` – Cached with Next.js cache tags (`instagram-stats`)
- `GET/POST /api/instagram/webhook` – Instagram webhook verification and change notifications. POST invalidates the above cache tags.

Environment variables:
- `INSTAGRAM_ACCESS_TOKEN` – Long‑lived user token for the Instagram Graph API.
- `INSTAGRAM_WEBHOOK_VERIFY_TOKEN` – Arbitrary string you choose and also configure in the Meta app for webhook verification.
- `META_APP_SECRET` – Optional, only needed if you enable webhook signature verification.

Setup steps (Meta Developers):
1. Create a Meta app and connect the Instagram account (Instagram Basic Display does not support webhooks; use Instagram Graph API).
2. In App Dashboard → Webhooks, add a subscription for the appropriate object (Instagram) and set the callback URL to your deployment:
   - Callback URL: `{YOUR_BASE_URL}/api/instagram/webhook`
   - Verify Token: the value of `INSTAGRAM_WEBHOOK_VERIFY_TOKEN`
3. Ensure your endpoint is publicly accessible (use your deployed URL, not localhost).
4. Grant the app required permissions (e.g., `instagram_basic`, `pages_show_list` if routed via a Page) and generate a long‑lived `INSTAGRAM_ACCESS_TOKEN`.
5. Deploy with the environment variables set.

Optional: Signature verification
- Meta sends `X-Hub-Signature-256`. If you want strict verification, compute HMAC SHA‑256 using `META_APP_SECRET` over the raw body and compare. The handler is ready to be extended if you need this.

Behavior:
- On webhook POST, the server invalidates tags `instagram-posts` and `instagram-stats`, so subsequent requests serve fresh data.
- SWR on the client can keep a small refresh interval; cache invalidation ensures near real‑time without heavy polling.


