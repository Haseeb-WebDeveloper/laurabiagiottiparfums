import { NextResponse } from 'next/server';
import { unstable_cache, revalidateTag } from 'next/cache';

const fetchPosts = async (limit) => {
  const response = await fetch(
    `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&limit=${limit}&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`
  );

  if (!response.ok) {
    throw new Error(`Instagram API error: ${response.status}`);
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error.message);
  }

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

  return { posts, count: posts.length };
};

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') || '4';

    const getCached = unstable_cache(
      async () => fetchPosts(limit),
      ['instagram-posts', `limit:${limit}`],
      { revalidate: 300, tags: ['instagram-posts'] }
    );

    const payload = await getCached();

    return NextResponse.json(payload, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
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
