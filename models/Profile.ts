import mongoose, { type Document, Schema } from "mongoose";

export interface IProfile extends Document {
  name: string;
  designation: string;
  introduction: string;
  phone: string;
  email: string;
  location: string;
  resumeUrl: string;
  profileImage: string;
  socialLinks: {
    linkedin: string;
    github: string;
    twitter: string;
    instagram: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const ProfileSchema = new Schema<IProfile>(
  {
    name: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    introduction: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    resumeUrl: {
      type: String,
      default: "/resume.pdf",
    },
    profileImage: {
      type: String,
      default: "/placeholder.svg?height=400&width=400",
    },
    socialLinks: {
      linkedin: { type: String, default: "" },
      github: { type: String, default: "" },
      twitter: { type: String, default: "" },
      instagram: { type: String, default: "" },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Profile || mongoose.model<IProfile>("Profile", ProfileSchema);
