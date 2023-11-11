import { Request, Response } from "express";
import { decodeAccessToken } from "../auth/tokenAPI";



//middleware проверяющий авторизован ли пользователь
export const authMiddleware = (
  req: Request,
  res: Response,
  next: () => void
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new Error("no token");
    }
    const decodedData : any = decodeAccessToken(token);
    req.body.user_id = decodedData.user_id;
    next();
  } catch (error) {
    console.log(error);
    const message = "Auth error";
    return res.status(400).json({ message: message });
  }
};
