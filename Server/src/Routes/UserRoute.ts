import { Router } from "express";
import User from "../Models/UserModel";
import {
  checkAuth,
  deletes,
  login,
  logout,
  register,
  update,
} from "../Helpers/User.controller";

const router = Router();

// get all users
router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// create user
router.post("/register", register);

// login
router.post("/login", login);

// update
router.put("/:id", update);

// delete
router.delete("/:id", deletes);

// check auth
router.get("/check-auth", checkAuth);

// logout
router.post("/logout", logout);

export default router;
