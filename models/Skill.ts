import mongoose, { type Document, Schema } from "mongoose";

export interface ISkill extends Document {
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

const SkillSchema = new Schema<ISkill>(
  {
    name: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
      enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
    },
    category: {
      type: String,
      default: "Technical",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Skill || mongoose.model<ISkill>("Skill", SkillSchema);
