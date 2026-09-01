import mongoose, { Schema, model, models } from "mongoose";

export interface IBehindTheScenes {
  _id?: string;
  category: string;
  title: string;
  slug: string;
  short_description?: string;
  description?: string;
  cover_image?: string;
  published: boolean;
  display_order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const BehindTheScenesSchema = new Schema<IBehindTheScenes>(
  {
    category: { type: String, required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    short_description: { type: String },
    description: { type: String },
    cover_image: { type: String },
    published: { type: Boolean, default: false },
    display_order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const BehindTheScenes =
  models.BehindTheScenes ||
  model<IBehindTheScenes>("BehindTheScenes", BehindTheScenesSchema);
export default BehindTheScenes;
