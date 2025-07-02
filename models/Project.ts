import mongoose, { type Document, Schema } from "mongoose";

export interface IProject extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  content: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  status: string;
  startDate: Date;
  endDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    image: {
      type: String,
      default: "/placeholder.svg?height=400&width=600",
    },
    technologies: {
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
    status: {
      type: String,
      enum: ["planning", "in-progress", "completed", "on-hold"],
      default: "completed",
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
