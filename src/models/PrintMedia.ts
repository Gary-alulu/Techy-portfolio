import { Schema, model, models } from "mongoose";

export interface IPrintMedia {
  _id?: string;
  title: string;
  imageUrl: string;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const PrintMediaSchema = new Schema<IPrintMedia>(
  {
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const PrintMedia =
  models.PrintMedia || model<IPrintMedia>("PrintMedia", PrintMediaSchema);
export default PrintMedia;
