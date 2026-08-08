import mongoose, { Schema, model, models } from "mongoose";

export interface ITestimonial {
  _id?: string;
  name: string;
  role: string;
  company?: string;
  quote: string;
  avatarUrl?: string;
  rating: number;
  featured: boolean;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    company: { type: String },
    quote: { type: String, required: true },
    avatarUrl: { type: String },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    featured: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const Testimonial = models.Testimonial || model<ITestimonial>("Testimonial", TestimonialSchema);
export default Testimonial;
