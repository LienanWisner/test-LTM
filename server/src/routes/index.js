import express from "express"
import SaveMessages from "../controllers/SaveMessages.js"
import getAllMessages from "../controllers/getAllMessages.js"

let router = express.Router();

router.get("/messages", getAllMessages)
router.post("/messages", SaveMessages)

export default router