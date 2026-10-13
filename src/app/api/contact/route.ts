import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { getSession } from "@/lib/auth";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key_for_build");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX = {
  name: 100,
  email: 200,
  phone: 40,
  company: 120,
  message: 5000,
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, company, projectType, budget, timeline, message, website } = body;

    // Honeypot: bots fill hidden fields; silently accept but drop the submission.
    if (website) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    if (!name || !email || !phone || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const cleanName = String(name).trim();
    const cleanEmail = String(email).trim().toLowerCase();
    const cleanPhone = String(phone).trim();
    const cleanMessage = String(message).trim();

    if (!cleanName || !cleanEmail || !cleanPhone || !cleanMessage) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!EMAIL_RE.test(cleanEmail)) {
      return NextResponse.json({ error: "Please provide a valid email address" }, { status: 400 });
    }
    if (cleanName.length > MAX.name || cleanEmail.length > MAX.email || cleanPhone.length > MAX.phone || cleanMessage.length > MAX.message || (company && String(company).length > MAX.company)) {
      return NextResponse.json({ error: "One or more fields are too long" }, { status: 400 });
    }

    await connectToDatabase();

    const newContact = new Contact({
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      company: company ? String(company).trim() : undefined,
      projectType: projectType ? String(projectType).trim() : undefined,
      budget: budget ? String(budget).trim() : undefined,
      timeline: timeline ? String(timeline).trim() : undefined,
      message: cleanMessage,
    });

    await newContact.save();

    // Send email notification via Resend
    try {
      const adminEmail = process.env.ADMIN_EMAIL || "test@example.com";
      const { data, error } = await resend.emails.send({
        from: "Portfolio Contact Form <onboarding@resend.dev>",
        to: [adminEmail],
        subject: `New Project Inquiry from ${cleanName}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">New Project Inquiry</h2>
            <p>You have received a new contact form submission on your portfolio.</p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Name:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${cleanName}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${cleanEmail}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${cleanPhone}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Company:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${company || "N/A"}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Project Type:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${projectType || "N/A"}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Budget:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${budget || "N/A"}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Timeline:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${timeline || "N/A"}</td></tr>
            </table>
            <h3 style="margin-top: 20px; color: #333;">Message:</h3>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; border: 1px solid #eee; white-space: pre-wrap;">${cleanMessage}</div>
          </div>
        `,
      });
      
      if (error) {
        console.error("Resend API returned an error:", error);
      }
    } catch (emailError) {
      console.error("Failed to send email notification:", emailError);
      // We don't throw an error here so the user still gets a success response if DB save worked
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Error creating contact submission:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  const session = await getSession();
  if (!session?.admin) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const messages = await Contact.find().sort({ createdAt: -1 }).limit(200).lean();
    return NextResponse.json({ success: true, messages });
  } catch (error: any) {
    console.error("Error fetching messages:", error);
    return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
  }
}
