import express from "express";
import Transcript from "../models/Transcript.js";
import Action from "../models/Action.js";
import { extractActions } from "../services/actionAgent.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    if (!req.body.text)
      return res.status(400).json({ error: "Empty transcript" });

    // Save transcript
    const transcript = await Transcript.create({
      text: req.body.text,
    });

    // Ask LLM
    const items = await extractActions(req.body.text);

    // Normalize output
    const actions = items.map(i => ({
      task: i.task || "",
      owner: i.owner || "",
      dueDate: i.dueDate || "",   // ✅ HERE
      done: false,
      transcriptId: transcript._id
    }));

    await Action.insertMany(actions);

    res.json(actions);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Extraction failed" });
  }
});

export default router;
