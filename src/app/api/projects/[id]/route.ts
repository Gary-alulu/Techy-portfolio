import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import connectToDatabase from "@/lib/mongodb";
import Project from "@/models/Project";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const project = await Project.findById(id);
    if (!project) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true, project });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const data = await req.json();
    
    const project = await Project.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!project) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    
    // Force cache invalidation on the frontend
    revalidatePath("/", "layout");
    revalidatePath("/work", "layout");
    
    return NextResponse.json({ success: true, project });
  } catch (error: any) {
    console.error("Project Update Error:", error);
    if (error.code === 11000) {
      return NextResponse.json({ success: false, error: "A project with this slug already exists." }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const project = await Project.findByIdAndDelete(id);
    if (!project) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    
    // Force cache invalidation on the frontend
    revalidatePath("/", "layout");
    revalidatePath("/work", "layout");
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
