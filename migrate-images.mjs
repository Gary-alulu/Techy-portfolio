import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Load .env.local manually (dotenv/config doesn't read .env.local by default)
try {
  const envContent = fs.readFileSync('.env.local', 'utf-8');
  for (const line of envContent.split('\n')) {
    const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  }
} catch (e) {
  console.warn('Could not read .env.local:', e.message);
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI not set.');
  process.exit(1);
}

if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.error('Cloudinary credentials not set (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET). No images will be migrated.');
  process.exit(1);
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const ProjectSchema = new mongoose.Schema({
  title: String,
  slug: String,
  category: String,
  thumbnailUrl: String,
  bannerUrl: String,
  galleryUrls: [String],
  content: String,
  isDraft: Boolean,
}, { timestamps: true });

const Project = mongoose.models.Project || mongoose.model("Project", ProjectSchema);

const isDataUri = (s) => typeof s === 'string' && s.startsWith('data:');

async function uploadDataUri(dataUri, name) {
  const safeName = (name || 'image').replace(/[^a-zA-Z0-9-_]/g, '-').toLowerCase().slice(-40);
  const fileName = `${Date.now()}-${safeName}`;
  const result = await cloudinary.uploader.upload(dataUri, {
    folder: 'portfolio',
    public_id: fileName,
    overwrite: false,
    resource_type: 'auto',
  });
  return result.secure_url;
}

async function main() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  const projects = await Project.find().lean();
  let migrated = 0;
  let imagesUploaded = 0;

  for (const p of projects) {
    const update = {};
    let changed = false;

    if (isDataUri(p.thumbnailUrl)) {
      update.thumbnailUrl = await uploadDataUri(p.thumbnailUrl, `${p.slug}-thumb`);
      changed = true;
      imagesUploaded++;
    }
    if (isDataUri(p.bannerUrl)) {
      update.bannerUrl = await uploadDataUri(p.bannerUrl, `${p.slug}-banner`);
      changed = true;
      imagesUploaded++;
    }
    if (Array.isArray(p.galleryUrls) && p.galleryUrls.some(isDataUri)) {
      const gallery = [];
      for (const [i, g] of p.galleryUrls.entries()) {
        gallery.push(isDataUri(g) ? await uploadDataUri(g, `${p.slug}-gallery-${i}`) : g);
      }
      update.galleryUrls = gallery.filter(Boolean);
      changed = true;
      imagesUploaded += gallery.length;
    }

    if (changed) {
      await Project.updateOne({ _id: p._id }, { $set: update });
      migrated++;
      console.log(`Migrated: ${p.title}`);
    }
  }

  console.log(`Done. ${migrated} projects updated, ${imagesUploaded} images uploaded to Cloudinary.`);
  process.exit(0);
}

main().catch((e) => {
  console.error('Migration failed:', e);
  process.exit(1);
});
