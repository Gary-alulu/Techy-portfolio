import { Schema, model, models } from "mongoose";

export interface ISetting {
  _id?: string;
  priorityCategory?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const SettingSchema = new Schema<ISetting>(
  {
    priorityCategory: { type: String, default: "" },
  },
  { timestamps: true }
);

const Setting = models.Setting || model<ISetting>("Setting", SettingSchema);
export default Setting;
