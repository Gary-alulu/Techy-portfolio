import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://alulugary5_db_user:N8RtptStl4MA44LM@cluster0.wmw6u5r.mongodb.net/portfolio_db?appName=Cluster0';

const ProjectSchema = new mongoose.Schema({
  title: String,
  slug: String,
  category: String,
  shortDescription: String,
  content: String,
  thumbnailUrl: String,
  galleryUrls: [String],
  technologies: [String],
  toolsUsed: [String],
  isDraft: Boolean
}, { timestamps: true });

const Project = mongoose.models.Project || mongoose.model("Project", ProjectSchema);

const seedUIUX = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
    
    const projects = [
      {
        title: "FinTech Neo-Banking App",
        slug: "fintech-neo-banking-app",
        category: "UI/UX Design",
        shortDescription: "A modern, glass-morphic approach to personal finance and banking.",
        content: "Detailed case study coming soon...",
        thumbnailUrl: "/images/fintech_ui.png",
        galleryUrls: [],
        technologies: ["Figma", "Protopie"],
        toolsUsed: ["Figma"],
        isDraft: false
      },
      {
        title: "Healthcare Patient Portal",
        slug: "healthcare-patient-portal",
        category: "UI/UX Design",
        shortDescription: "Redesigning the patient experience with accessibility and clarity in mind.",
        content: "Detailed case study coming soon...",
        thumbnailUrl: "/images/health_ui.png",
        galleryUrls: [],
        technologies: ["Figma", "Miro"],
        toolsUsed: ["Figma", "FigJam"],
        isDraft: false
      }
    ];

    for (const p of projects) {
      await Project.findOneAndUpdate({ slug: p.slug }, p, { upsert: true, new: true });
    }
    
    console.log("Seeded UI/UX Projects successfully!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedUIUX();
