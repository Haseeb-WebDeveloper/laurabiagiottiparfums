import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

// Instagram Webhooks (Graph API):
// - GET: Verification handshake (hub.challenge)
// - POST: Change notifications

export async function GET(request: Request) {
  const url = new URL(request.url);
  const mode = url.searchParams.get('hub.mode');
  const token = url.searchParams.get('hub.verify_token');
  const challenge = url.searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token && challenge) {
    if (token !== process.env.INSTAGRAM_WEBHOOK_VERIFY_TOKEN) {
      return new NextResponse('Forbidden', { status: 403 });
    }
    return new NextResponse(challenge, {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  return NextResponse.json({ ok: false, reason: 'Invalid verification request' }, { status: 400 });
}

export async function POST(request: Request) {
  try {
    // If you enable app secret proof/signature validation, verify here.
    // Facebook/IG send X-Hub-Signature-256 header. Optionally verify to ensure authenticity.
    // For now, we trust the platform or upstream verification.

    const body = await request.json();

    // Basic shape from IG Graph Webhooks: { object: 'instagram', entry: [ { changes: [...] } ] }
    const objectType = body?.object;
    if (objectType !== 'instagram' && objectType !== 'page') {
      // Some setups may deliver via 'page' as object type; accept both.
    }

    // Invalidate cache tags used by our routes whenever we get a change notification
    revalidateTag('instagram-posts');
    revalidateTag('instagram-stats');

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error('Instagram webhook error:', error);
    return NextResponse.json({ ok: false, error: error?.message || 'Unknown error' }, { status: 500 });
  }
}


