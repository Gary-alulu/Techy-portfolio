import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://alulugary5_db_user:N8RtptStl4MA44LM@cluster0.wmw6u5r.mongodb.net/portfolio_db?appName=Cluster0';

const ProjectSchema = new mongoose.Schema({}, { strict: false });
const Project = mongoose.models.Project || mongoose.model("Project", ProjectSchema);

const purge = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
    
    await Project.deleteMany({
      slug: { $in: ["fintech-neo-banking-app", "healthcare-patient-portal"] }
    });
    
    console.log("Purged mock projects successfully!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

purge();
