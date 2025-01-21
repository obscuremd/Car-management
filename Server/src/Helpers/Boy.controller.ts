import { Request, Response } from "express";
import Boy from "../Models/BoyModel";

export const create = async (req: Request, res: Response) => {
  try {
    const data = new Boy(req.body);
    await data.save();

    res.status(200).json({
      success: true,
      message: "dat created successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({ message: "Error saving dat", error });
  }
};

export const get = async (req: Request, res: Response) => {
  try {
    const data = await Boy.findById(req.body._id);
    if (!data)
      res.status(404).json({ success: false, message: "data not found" });
    else {
      res.status(200).json({
        success: true,
        message: "data found",
        data,
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const data = await Boy.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!data) {
      res.status(404).json({ success: false, message: "no such data found" });
    } else {
      res.status(200).json({ success: true, message: "data updated", data });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deletes = async (req: Request, res: Response) => {
  try {
    const data = await Boy.findById(req.params.id);

    if (!data) {
      res.status(404).json("no such data found");
    } else {
      await Boy.findByIdAndDelete(req.params.id);
      res.status(200).json({ success: true, message: `data has been deleted` });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
