import mongoose, { Schema, model, models } from "mongoose";

export interface IBTSMediaItem {
  _id?: string;
  bts_id: mongoose.Types.ObjectId | string;
  media_url: string;
  media_type: "image" | "video";
  caption?: string;
  display_order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const BTSMediaItemSchema = new Schema<IBTSMediaItem>(
  {
    bts_id: {
      type: Schema.Types.ObjectId,
      ref: "BehindTheScenes",
      required: true,
      index: true,
    },
    media_url: { type: String, required: true },
    media_type: { type: String, enum: ["image", "video"], required: true },
    caption: { type: String },
    display_order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

BTSMediaItemSchema.index({ bts_id: 1, display_order: 1 });

const BTSMediaItem =
  models.BTSMediaItem || model<IBTSMediaItem>("BTSMediaItem", BTSMediaItemSchema);
export default BTSMediaItem;
