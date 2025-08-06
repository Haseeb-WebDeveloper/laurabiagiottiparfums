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

    console.log("data", data);

    // Format numbers for display
    const formatNumber = (num: number): string => {
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + "M";
      }
      if (num >= 1000) {
        return (num / 1000).toFixed(1) + "K";
      }
      return num.toString();
    };

    const profileData = {
      id: data.id,
      username: data.username || 'laurabiagiottiparfums', // This is the @handler (without @)
      name: data.name || 'Laura Biagiotti Parfums', // Display name
      profilePicture: data.profile_picture_url || '/logo/insta-bg.jpg',
      accountType: data.account_type || 'BUSINESS',
      posts: formatNumber(data.media_count || 0),
      followers: formatNumber(data.followers_count || 0),
      following: formatNumber(data.follows_count || 0),
    };

    // Cache for 1 hour
    const headers = {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
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
