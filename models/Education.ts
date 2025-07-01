import mongoose, { type Document, Schema } from "mongoose";

export interface IEducation extends Document {
  institution: string;
  degree: string;
  period: string;
  description: string;
  location: string;
  gpa: string;
  createdAt: Date;
  updatedAt: Date;
}

const EducationSchema = new Schema<IEducation>(
  {
    institution: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    period: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    gpa: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Education || mongoose.model<IEducation>("Education", EducationSchema);
