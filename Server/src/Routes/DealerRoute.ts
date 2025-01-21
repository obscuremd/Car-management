import { Router } from "express";
import { create, deletes, get, update } from "../Helpers/Dealer.controller";
import Dealer from "../Models/DealerModel";

const router = Router();

// get all users
router.get("/", async (req, res) => {
  try {
    const user = await Dealer.find();
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
