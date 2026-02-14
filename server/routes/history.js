import express from "express";
import Transcript from "../models/Transcript.js";

const router=express.Router();

router.get("/",async(req,res)=>{
 res.json(await Transcript.find().sort({createdAt:-1}).limit(5));
});

export default router;