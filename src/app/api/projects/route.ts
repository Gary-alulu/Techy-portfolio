import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import connectToDatabase from "@/lib/mongodb";
import Project from "@/models/Project";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const project = await Project.create(data);
    
    // Force cache invalidation on the frontend
    revalidatePath("/", "layout");
    revalidatePath("/work", "layout");
    
    return NextResponse.json({ success: true, project }, { status: 201 });
  } catch (error: any) {
    console.error("Project Creation Error:", error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: "A project with this slug already exists. Please use a unique slug." }, 
        { status: 400 }
      );
    }
    
    if (error.name === "ValidationError") {
      return NextResponse.json(
        { success: false, error: Object.values(error.errors).map((e: any) => e.message).join(', ') },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: error.message || "Server Error" }, 
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const subCategory = searchParams.get("subCategory");
    const featured = searchParams.get("featured");

    const query: any = { isDraft: false };
    
    if (category && category.toLowerCase() !== "all") {
      query.category = category;
    }
    
    if (subCategory && subCategory.toLowerCase() !== "all") {
      query.subCategory = subCategory;
    }
    
    if (featured === "true") {
      query.featured = true;
    }

    const projects = await Project.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, projects });
  } catch (error: any) {
    console.error("Fetch Projects Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
