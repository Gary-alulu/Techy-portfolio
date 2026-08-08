import mongoose, { Schema, model, models } from "mongoose";

export interface IResume {
  _id?: string;
  category: "product" | "uiux" | "frontend";
  title?: string;
  stats?: { label: string; value: string }[];
  expertise?: string[];
  highlights?: string[];
  availability?: string;
  fileName?: string;
  fileData?: string; // base64-encoded PDF
  fileSize?: number; // bytes
  createdAt?: Date;
  updatedAt?: Date;
}

const ResumeSchema = new Schema<IResume>(
  {
    category: {
      type: String,
      enum: ["product", "uiux", "frontend"],
      required: true,
      unique: true,
    },
    title: { type: String, default: "" },
    stats: [
      {
        label: { type: String },
        value: { type: String },
      }
    ],
    expertise: [{ type: String }],
    highlights: [{ type: String }],
    availability: { type: String, default: "Available" },
    fileName: { type: String },
    fileData: { type: String },
    fileSize: { type: Number },
  },
  { timestamps: true }
);

const Resume = models.Resume || model<IResume>("Resume", ResumeSchema);
export default Resume;
