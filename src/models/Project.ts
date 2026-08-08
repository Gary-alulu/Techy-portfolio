import mongoose, { Schema, model, models } from "mongoose";

export interface IProject {
  _id?: string;
  title: string;
  slug: string;
  category: string;
  subCategory?: string;
  shortDescription?: string;
  content?: string;
  thumbnailUrl?: string;
  bannerUrl?: string;
  galleryUrls?: string[];
  liveUrl?: string;
  githubUrl?: string;
  prototypeUrl?: string;
  technologies?: string[];
  toolsUsed?: string[];
  videoUrl?: string;
  duration?: string;
  isDraft: boolean;
  featured: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { 
      type: String, 
      required: true,
      enum: ["UI/UX Design", "Front End Design", "Brand Identity", "Motion Graphics"]
    },
    subCategory: {
      type: String,
      enum: ["Graphic Design", "Print Media"]
    },
    shortDescription: { type: String },
    content: { type: String },
    thumbnailUrl: { type: String },
    bannerUrl: { type: String },
    galleryUrls: [{ type: String }],
    liveUrl: { type: String },
    githubUrl: { type: String },
    prototypeUrl: { type: String },
    technologies: [{ type: String }],
    toolsUsed: [{ type: String }],
    videoUrl: { type: String },
    duration: { type: String },
    isDraft: { type: Boolean, default: false },
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const Project = models.Project || model<IProject>("Project", ProjectSchema);
export default Project;
