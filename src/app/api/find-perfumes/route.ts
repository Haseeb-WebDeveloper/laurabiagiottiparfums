import { NextResponse } from "next/server";
import { fetchSanityData } from "@/lib/sanity/fetch";

export async function POST(request: Request) {
  try {
    const { gender, noteId, timeOfDay, intensity, locale } = await request.json();

    // Construct a Sanity query to find matching perfumes
    const query = `*[_type == "perfume" && category == "${gender}" && momentOfDay == "${timeOfDay}" && abs(sharpness - ${intensity}) < 30] {
      _id,
      title,
      "description": description.${locale},
      category,
      momentOfDay,
      sharpness,
      featuredImage {
        asset-> {
          url
        }
      }
    } | order(abs(sharpness - ${intensity})) [0...2]`;

    const perfumes = await fetchSanityData(query);

    return NextResponse.json(perfumes);
  } catch (error) {
    console.error("Error finding matching perfumes:", error);
    return NextResponse.json({ error: "Failed to find matching perfumes" }, { status: 500 });
  }
} 