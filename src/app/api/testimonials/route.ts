import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const featuredOnly = searchParams.get("featured") === "true";
    
    const query = featuredOnly ? { featured: true } : {};
    const testimonials = await Testimonial.find(query).sort({ order: 1, createdAt: -1 });

    return NextResponse.json({ success: true, testimonials }, { status: 200 });
  } catch (error: any) {
    console.error("Testimonials Fetch Error:", error);
    return NextResponse.json({ success: false, error: error.message || "Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const data = await req.json();

    if (!data.name || !data.role || !data.quote) {
      return NextResponse.json(
        { success: false, error: "Name, role, and quote are required fields." },
        { status: 400 }
      );
    }

    const testimonial = await Testimonial.create(data);
    return NextResponse.json({ success: true, testimonial }, { status: 201 });
  } catch (error: any) {
    console.error("Testimonial Creation Error:", error);
    return NextResponse.json({ success: false, error: error.message || "Server Error" }, { status: 500 });
  }
}
