import express from "express";
import Action from "../models/Action.js";

const router = express.Router();

// GET all actions (latest first)
router.get("/", async (req, res) => {
  try {
    const actions = await Action.find().sort({ _id: -1 });
    res.json(actions);
  } catch {
    res.status(500).json({ error: "Fetch failed" });
  }
});

// CREATE action manually
router.post("/", async (req, res) => {
  try {
    if (!req.body.task) {
      return res.status(400).json({ error: "Task required" });
    }

    const created = await Action.create(req.body);
    res.json(created);
  } catch {
    res.status(500).json({ error: "Create failed" });
  }
});

// UPDATE action
router.put("/:id", async (req, res) => {
  try {
    const updated = await Action.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch {
    res.status(500).json({ error: "Update failed" });
  }
});

// DELETE action
router.delete("/:id", async (req, res) => {
  try {
    await Action.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Delete failed" });
  }
});

export default router;