import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Get user profile info
    const response = await fetch(
      `https://graph.instagram.com/me?fields=account_type,media_count&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`
    );

    if (!response.ok) {
      throw new Error(`Instagram API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      console.error('Instagram API Error:', data.error);
      return NextResponse.json({ error: data.error.message }, { status: 400 });
    }

    // Format numbers for display
    const formatNumber = (num: number): string => {
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
      }
      if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
      }
      return num.toString();
    };

    const stats = {
      posts: formatNumber(data.media_count || 976),
      followers: '25.6K', // Instagram Basic Display doesn't provide follower count
      following: '251',   // Instagram Basic Display doesn't provide following count
    };

    // Cache for 1 hour
    const headers = {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    };

    return NextResponse.json(stats, { headers });
  } catch (error) {
    console.error('Error fetching Instagram stats:', error);
    
    // Return fallback data
    return NextResponse.json({
      posts: '976',
      followers: '25.6K', 
      following: '251'
    });
  }
}