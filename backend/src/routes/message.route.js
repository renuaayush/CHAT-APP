import express from "express";
import { protectroute } from "../middleware/auth.middleware.js";
import { getmessages, getUsersForSidebar, sendmessage } from "../controllers/message.controller.js";


const router = express.Router();

router.get("/users",protectroute, getUsersForSidebar)
router.get("/:id",protectroute,getmessages)

router.post("/send/:id", protectroute, sendmessage)

export default router;