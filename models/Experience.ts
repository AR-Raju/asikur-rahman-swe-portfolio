import mongoose, { type Document, Schema } from "mongoose";

export interface IExperience extends Document {
  company: string;
  position: string;
  period: string;
  description: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ExperienceSchema = new Schema<IExperience>(
  {
    company: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    period: {
      type: String,
      required: true,
    },
    description: {
      type: [String],
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Experience || mongoose.model<IExperience>("Experience", ExperienceSchema);
