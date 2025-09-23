import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Get user profile info with additional fields
    const response = await fetch(
      `https://graph.instagram.com/me?fields=id,username,name,profile_picture_url,account_type,media_count,followers_count,follows_count&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`
    );

    if (!response.ok) {
      throw new Error(`Instagram API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      console.error("Instagram API Error:", data.error);
      return NextResponse.json({ error: data.error.message }, { status: 400 });
    }

    // Format numbers for display (truncate, not round, for K/M)
    const formatNumber = (num: number): string => {
      if (num >= 1000000) {
        // Truncate to 1 decimal place for millions
        const truncated = Math.floor(num / 100000) / 10;
        return truncated.toFixed(1) + "M";
      }
      if (num >= 1000) {
        // Truncate to 1 decimal place for thousands
        const truncated = Math.floor(num / 100) / 10;
        return truncated.toFixed(1) + "K";
      }
      return num.toString();
    };

    const profileData = {
      id: data.id,
      username: data.username || 'laurabiagiottiparfums', // This is the @handler (without @)
      name: data.name || 'Laura Biagiotti Parfums', // Display name
      profilePicture: data.profile_picture_url || '/logo/insta-bg.jpg',
      accountType: data.account_type || 'BUSINESS',
      posts: data.media_count || 0,
      followers: formatNumber(data.followers_count || 0),
      following: formatNumber(data.follows_count || 0),
    };

    // Cache for 60 seconds to allow ~1 minute freshness
    const headers = {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    };

    return NextResponse.json(profileData, { headers });
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
