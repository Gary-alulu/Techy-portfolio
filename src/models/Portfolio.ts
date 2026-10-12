import { Schema, model, models } from "mongoose";

export interface IPortfolio {
  _id?: string;
  key: string;
  title?: string;
  description?: string;
  fileName?: string;
  fileData?: string; // base64-encoded PDF
  fileSize?: number; // bytes
  createdAt?: Date;
  updatedAt?: Date;
}

const PortfolioSchema = new Schema<IPortfolio>(
  {
    key: { type: String, default: "main", unique: true },
    title: { type: String, default: "My Portfolio" },
    description: { type: String, default: "" },
    fileName: { type: String },
    fileData: { type: String },
    fileSize: { type: Number },
  },
  { timestamps: true }
);

const Portfolio =
  models.Portfolio || model<IPortfolio>("Portfolio", PortfolioSchema);
export default Portfolio;
