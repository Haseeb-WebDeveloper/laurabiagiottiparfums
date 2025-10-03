import { NextResponse } from "next/server";
import { unstable_cache } from 'next/cache';

const fetchStats = async () => {
  const response = await fetch(
    `https://graph.instagram.com/me?fields=id,username,name,profile_picture_url,account_type,media_count,followers_count,follows_count&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`
  );

  if (!response.ok) {
    throw new Error(`Instagram API error: ${response.status}`);
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error.message);
  }

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      const truncated = Math.floor(num / 100000) / 10;
      return truncated.toFixed(1) + "M";
    }
    if (num >= 1000) {
      const truncated = Math.floor(num / 100) / 10;
      return truncated.toFixed(1) + "K";
    }
    return num.toString();
  };

  const profileData = {
    id: data.id,
    username: data.username || 'laurabiagiottiparfums',
    name: data.name || 'Laura Biagiotti Parfums',
    profilePicture: data.profile_picture_url || '/logo/insta-bg.jpg',
    accountType: data.account_type || 'BUSINESS',
    posts: data.media_count || 0,
    followers: formatNumber(data.followers_count || 0),
    following: formatNumber(data.follows_count || 0),
  };

  return profileData;
};

export async function GET() {
  try {
    const getCached = unstable_cache(
      async () => fetchStats(),
      ['instagram-stats'],
      { revalidate: 300, tags: ['instagram-stats'] }
    );

    const profileData = await getCached();

    return NextResponse.json(profileData, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("Error fetching Instagram profile data:", error);

    // Return fallback data
    return NextResponse.json({
      id: null,
      username: 'laurabiagiottiparfums',
      name: 'Laura Biagiotti Parfums',
      profilePicture: '/logo/insta-bg.jpg',
      accountType: 'BUSINESS',
      posts: "0",
      followers: "0",
      following: "0",
    });
  }
}
