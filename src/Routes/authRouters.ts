import express from "express";

import {AuthController} from "../Controllers/authController";

const authRouter = express.Router();
const authController = new AuthController();

authRouter.post("/registration", authController.registration);
authRouter.post("/login", authController.login);
authRouter.post("/refresh", authController.refresh);

export {authRouter};
