import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Response } from "express";

dotenv.config();

const secret = process.env.JWT_SECRET;

export const generateToken = (res: Response, userId: string) => {
  if (!secret) {
    throw new Error("no token provided");
  }

  const token = jwt.sign({ userId }, secret, { expiresIn: "7d" });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    domain: ".vercel.app",
  });

  console.log("Cookie sent:", token);
  return token;
};
