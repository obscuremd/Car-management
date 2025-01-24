import { Request, Response } from "express";
import User from "../Models/UserModel";
import { generateToken } from "../utils/generateToken";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const secret = process.env.JWT_SECRET;

export const register = async (req: Request, res: Response) => {
  try {
    const data = new User(req.body);
    await data.save();

    res.status(200).json({
      success: true,
      message: "user created successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({ message: "Error saving user", error });
  }
};

export const login = async (req: Request, res: Response) => {
  const password = req.body.password;

  try {
    const data = await User.findById(req.body._id);
    if (!data)
      res.status(404).json({ success: false, message: "User not found" });
    else if (password !== data.password)
      res.status(404).json({ success: false, message: "password mismatch" });
    else {
      generateToken(res, data._id);

      res.status(200).json({
        success: true,
        message: "user logged in successfully",
        data,
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const data = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!data) {
      res.status(404).json({ success: false, message: "no such user found" });
    } else {
      res.status(200).json({ success: true, message: "user updated", data });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deletes = async (req: Request, res: Response) => {
  try {
    const data = await User.findById(req.params.id);

    if (!data) {
      res.status(404).json("no such user found");
    } else {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ success: true, message: `user has been deleted` });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const checkAuth = async (req: Request, res: Response) => {
  const token = req.cookies.token;
  if (!token)
    res
      .status(401)
      .json({ success: false, message: "unauthorized- no token provided" });
  else if (!secret) return;
  else {
    try {
      const decoded = jwt.verify(token, secret) as { userId: string };
      if (!decoded)
        res
          .status(401)
          .json({ success: false, message: "unauthorized- invalid token" });
      else {
        const data = await User.findById(decoded.userId);
        if (!data)
          res.status(400).json({ success: false, message: "user not found" });
        else {
          res.status(200).json({ success: true, data });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "server error" });
    }
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "error logging out", error });
  }
};
