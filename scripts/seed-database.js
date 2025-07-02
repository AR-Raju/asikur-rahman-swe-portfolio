const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// MongoDB connection
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://admin-um:admin12345@cluster0.kikiize.mongodb.net/swe-portfolio?retryWrites=true&w=majority&appName=Cluster0";

// User schema
const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, default: "admin" },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

// Profile schema
const ProfileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    bio: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    location: String,
    website: String,
    avatar: { type: String, default: "/placeholder.svg?height=400&width=400" },
    socialLinks: {
      github: String,
      linkedin: String,
      twitter: String,
      instagram: String,
    },
  },
  { timestamps: true }
);

const Profile = mongoose.models.Profile || mongoose.model("Profile", ProfileSchema);

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Profile.deleteMany({});

    // Create admin user
    const adminUser = new User({
      email: "admin@portfolio.com",
      password: "admin123",
      name: "Admin User",
      role: "admin",
    });
    await adminUser.save();
    console.log("Admin user created");

    // Create profile
    const profile = new Profile({
      name: "Asikur Rahman",
      title: "Full Stack Developer",
      bio: "Passionate full-stack developer with expertise in modern web technologies. I love creating innovative solutions and bringing ideas to life through code.",
      email: "asikur@portfolio.com",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      website: "https://asikur.dev",
      avatar: "/placeholder.svg?height=400&width=400",
      socialLinks: {
        github: "https://github.com/asikur",
        linkedin: "https://linkedin.com/in/asikur",
        twitter: "https://twitter.com/asikur",
        instagram: "https://instagram.com/asikur",
      },
    });
    await profile.save();
    console.log("Profile created");

    console.log("Database seeded successfully!");
    console.log("Login credentials:");
    console.log("Email: admin@portfolio.com");
    console.log("Password: admin123");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
