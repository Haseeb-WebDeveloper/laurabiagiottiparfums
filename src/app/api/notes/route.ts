import { NextResponse } from "next/server";
import { fetchSanityData } from "@/lib/sanity/fetch";
import { getNotesQuery } from "@/lib/sanity/queries";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale") || "en";

    const notes = await fetchSanityData(getNotesQuery({ locale }));

    return NextResponse.json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    return NextResponse.json({ error: "Failed to fetch notes" }, { status: 500 });
  }
} 