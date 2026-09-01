import mongoose from 'mongoose';
import fs from 'fs';

// Load .env.local manually
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

const BehindTheScenesSchema = new mongoose.Schema({
  category: String,
  title: String,
  slug: String,
  short_description: String,
  description: String,
  cover_image: String,
  published: Boolean,
  display_order: Number,
}, { timestamps: true });

const BehindTheScenes = mongoose.models.BehindTheScenes || mongoose.model('BehindTheScenes', BehindTheScenesSchema);

const seed = [
  {
    category: 'workspace',
    title: 'Workspace',
    slug: 'workspace',
    short_description: 'The environment where ideas become execution.',
    description: 'The space where design, development and experimentation come together.',
    cover_image: '',
    published: true,
    display_order: 1,
  },
  {
    category: 'sketches',
    title: 'Sketches',
    slug: 'sketches',
    short_description: 'Before pixels, there are ideas.',
    description: 'The raw concepts, experiments and visual thoughts that happen before the final design.',
    cover_image: '',
    published: true,
    display_order: 2,
  },
  {
    category: 'wireframes',
    title: 'Wireframes',
    slug: 'wireframes',
    short_description: 'Turning ideas into experiences that make sense.',
    description: 'The structural thinking behind interfaces, websites and digital experiences.',
    cover_image: '',
    published: true,
    display_order: 3,
  },
  {
    category: 'moodboards',
    title: 'Moodboards',
    slug: 'moodboards',
    short_description: 'Finding the feeling before defining the final look.',
    description: 'Exploring color, typography, imagery, texture and visual direction before creating the final experience.',
    cover_image: '',
    published: true,
    display_order: 4,
  },
];

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  for (const item of seed) {
    await BehindTheScenes.findOneAndUpdate(
      { slug: item.slug },
      item,
      { upsert: true, new: true }
    );
    console.log(`Seeded: ${item.title} (${item.slug})`);
  }

  console.log('Behind The Scenes seed complete.');
  process.exit(0);
}

run().catch((e) => {
  console.error('Seed failed:', e);
  process.exit(1);
});
