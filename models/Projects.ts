import mongoose, { type Document, Schema } from "mongoose";

export interface IProject extends Document {
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  images: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    longDescription: {
      type: String,
      required: true,
    },
    technologies: {
      type: [String],
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    liveUrl: {
      type: String,
      default: "",
    },
    githubUrl: {
      type: String,
      default: "",
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
