import { Router } from "express";
import { create, deletes, get, update } from "../Helpers/Car.controller";
import Car from "../Models/CarModel";

const router = Router();

// get all users
router.get("/", async (req, res) => {
  try {
    const user = await Car.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// create user
router.post("/create", create);

// get
router.post("/get", get);

// update
router.put("/:id", update);

// delete
router.delete("/:id", deletes);

export default router;
