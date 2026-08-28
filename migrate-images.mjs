import mongoose from 'mongoose';
import { put } from '@vercel/blob';
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

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error('BLOB_READ_WRITE_TOKEN not set. No images will be migrated.');
  process.exit(1);
}

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
  const match = /^data:([^;]+);base64,(.+)$/.exec(dataUri);
  if (!match) return dataUri; // not a valid data URI, keep as-is
  const mimeType = match[1];
  const buffer = Buffer.from(match[2], 'base64');
  const ext = (mimeType.split('/')[1] || 'jpg').replace('jpeg', 'jpg').split('+')[0];
  const safeName = (name || 'image').replace(/[^a-zA-Z0-9-_]/g, '-').toLowerCase().slice(-40);
  const fileName = `${Date.now()}-${safeName}.${ext}`;
  const blob = await put(fileName, buffer, {
    access: 'public',
    contentType: mimeType,
    addRandomSuffix: true,
    cacheControlMaxAge: 60 * 60 * 24 * 365,
  });
  return blob.url;
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

  console.log(`Done. ${migrated} projects updated, ${imagesUploaded} images uploaded to Blob.`);
  process.exit(0);
}

main().catch((e) => {
  console.error('Migration failed:', e);
  process.exit(1);
});
