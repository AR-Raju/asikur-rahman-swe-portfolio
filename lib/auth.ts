import User from "@/models/User";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import connectDB from "./mongodb";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key");

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function createToken(payload: any): Promise<string> {
  return new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("24h").sign(secret);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    return null;
  }
}

export async function authenticateUser(email: string, password: string) {
  try {
    await connectDB();
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return null;

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) return null;

    return {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    };
  } catch (error) {
    console.error("Authentication error:", error);
    return null;
  }
}
