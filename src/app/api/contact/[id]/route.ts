import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Contact from "@/models/Contact";

// PATCH — mark message as read
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { status } = await req.json();
    
    await connectToDatabase();
    const result = await Contact.findByIdAndUpdate(id, { status }, { new: true });

    if (!result) {
      return NextResponse.json({ success: false, error: "Message not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: result });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
  }
}

// DELETE — remove a message
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectToDatabase();
    const result = await Contact.findByIdAndDelete(id);

    if (!result) {
      return NextResponse.json({ success: false, error: "Message not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
  }
}
