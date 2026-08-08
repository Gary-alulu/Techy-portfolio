import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import fs from "fs";
import path from "path";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const url = searchParams.get("url");

    if (!url) {
      return new NextResponse("Missing url parameter", { status: 400 });
    }

    // Fetch the original image
    let imageBuffer: ArrayBuffer;
    try {
      // Handle relative paths (e.g., /images/project.jpg) by converting them to absolute URLs
      let fetchUrl = url;
      if (url.startsWith("/")) {
        fetchUrl = `${request.nextUrl.origin}${url}`;
      }
      
      const response = await fetch(fetchUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }
      imageBuffer = await response.arrayBuffer();
    } catch (error) {
      console.error("Error fetching image for watermark:", error);
      return new NextResponse("Failed to fetch image", { status: 500 });
    }

    // Process image with sharp
    const image = sharp(Buffer.from(imageBuffer));
    const metadata = await image.metadata();
    
    if (!metadata.width || !metadata.height) {
       return new NextResponse("Invalid image", { status: 400 });
    }

    const svgWidth = metadata.width;
    const svgHeight = metadata.height;

    // Load the logo
    let dataUri = "";
    try {
      const logoPath = path.join(process.cwd(), 'public', 'images', 'MY LOGO.png');
      const logoBuffer = await fs.promises.readFile(logoPath);
      const logoBase64 = logoBuffer.toString('base64');
      dataUri = `data:image/png;base64,${logoBase64}`;
    } catch (e) {
      console.error("Could not load logo for watermark", e);
    }

    let svgImage = "";
    if (dataUri) {
      // Calculate tile size relative to the image dimensions (tiled across)
      const patternSize = Math.max(200, Math.floor(svgWidth / 4)); 
      const opacity = 0.25; // Make it subtle
      
      // We use an SVG pattern to tile the logo multiple times and rotate the content slightly
      svgImage = `
        <svg width="${svgWidth}" height="${svgHeight}">
          <defs>
            <pattern id="watermark" x="0" y="0" width="${patternSize}" height="${patternSize}" patternUnits="userSpaceOnUse">
              <g transform="rotate(-25, ${patternSize/2}, ${patternSize/2})">
                <image href="${dataUri}" x="20" y="20" width="${patternSize - 40}" height="${patternSize - 40}" opacity="${opacity}" preserveAspectRatio="xMidYMid meet" />
              </g>
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#watermark)" />
        </svg>
      `;
    } else {
       // fallback to text if logo fails to load
       const text = "© Gary Alulu";
       const fontSize = Math.max(16, Math.floor(metadata.width * 0.04)); 
       svgImage = `
          <svg width="${svgWidth}" height="${svgHeight}">
            <style>
              .title { fill: rgba(255, 255, 255, 0.7); font-size: ${fontSize}px; font-weight: bold; font-family: Arial, Helvetica, sans-serif; }
              .shadow { fill: rgba(0, 0, 0, 0.8); font-size: ${fontSize}px; font-weight: bold; font-family: Arial, Helvetica, sans-serif; }
            </style>
            <text x="96%" y="96%" text-anchor="end" class="shadow">${text}</text>
            <text x="95%" y="95%" text-anchor="end" class="title">${text}</text>
          </svg>
       `;
    }

    const svgBuffer = Buffer.from(svgImage);

    // Composite watermark onto the image
    const watermarkedBuffer = await image
      .composite([
        {
          input: svgBuffer,
          top: 0,
          left: 0,
        },
      ])
      .toBuffer();

    return new NextResponse(watermarkedBuffer, {
      status: 200,
      headers: {
        "Content-Type": metadata.format ? `image/${metadata.format}` : "image/jpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error creating watermark:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
