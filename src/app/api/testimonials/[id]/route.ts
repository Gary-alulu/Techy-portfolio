import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      return NextResponse.json({ success: false, error: "Testimonial not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, testimonial }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Server Error" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const data = await req.json();

    const testimonial = await Testimonial.findByIdAndUpdate(id, data, { new: true, runValidators: true });

    if (!testimonial) {
      return NextResponse.json({ success: false, error: "Testimonial not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, testimonial }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const { id } = await params;

    const testimonial = await Testimonial.findByIdAndDelete(id);

    if (!testimonial) {
      return NextResponse.json({ success: false, error: "Testimonial not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Testimonial deleted successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Server Error" }, { status: 500 });
  }
}
