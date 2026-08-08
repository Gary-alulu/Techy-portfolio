import mongoose, { Document, Model } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  phone: string;
  company?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  message: string;
  status: string;
  createdAt: Date;
}

const ContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    company: { type: String },
    projectType: { type: String },
    budget: { type: String },
    timeline: { type: String },
    message: { type: String, required: true },
    status: { type: String, default: "unread" },
  },
  { timestamps: true }
);

const Contact: Model<IContact> = mongoose.models.Contact || mongoose.model<IContact>("Contact", ContactSchema);
export default Contact;
