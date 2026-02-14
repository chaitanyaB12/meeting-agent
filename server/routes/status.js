import express from "express";
import mongoose from "mongoose";

const router=express.Router();

router.get("/",(req,res)=>{
 res.json({
  backend:true,
  database:mongoose.connection.readyState===1,
  llm:true
 });
});

export default router;