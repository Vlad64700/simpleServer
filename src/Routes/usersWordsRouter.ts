import express from "express";
import { UserWordsController } from "../Controllers/userWordsController";
import { authMiddleware } from "../middleware/authMiddleware"


const userWordsRouter = express.Router();
const userWordsController = new UserWordsController();

userWordsRouter.get("/", authMiddleware, userWordsController.getUserWorld);
userWordsRouter.post("/", authMiddleware, userWordsController.createUserWorld);

export { userWordsRouter };
