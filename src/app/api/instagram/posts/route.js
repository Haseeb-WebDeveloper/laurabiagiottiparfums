import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') || '4';

    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&limit=${limit}&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`
    );

    if (!response.ok) {
      throw new Error(`Instagram API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      console.error('Instagram API Error:', data.error);
      return NextResponse.json({ error: data.error.message }, { status: 400 });
    }

    // Filter and format posts
    const posts = data.data
      .filter(post => ['IMAGE', 'VIDEO'].includes(post.media_type))
      .map(post => ({
        id: post.id,
        caption: post.caption || '',
        media_type: post.media_type,
        media_url: post.media_url,
        thumbnail_url: post.thumbnail_url,
        permalink: post.permalink,
        timestamp: post.timestamp,
        formatted_date: new Date(post.timestamp).toLocaleDateString(),
      }));

    // Cache for 60 seconds to allow ~1 minute freshness
    const headers = {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    };

    return NextResponse.json({ posts, count: posts.length }, { headers });
  } catch (error) {
    console.error('Error fetching Instagram posts:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch Instagram posts',
        message: error.message 
      },
      { status: 500 }
    );
  }
}
