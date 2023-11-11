import { Request, Response } from "express";

import { pool as db } from "../db";
import { generateAccessRefreshToken, decodeAccessToken, decodeRefreshToken } from "../auth/tokenAPI";
import { api_user } from "../api/users_tbl";

// route: /auth
export class AuthController {
  async registration(req: Request, res: Response) {
    try {
      //пароль приходит уже зашифрованный
      const { login, password } = req.body;
      const foundUser = await api_user.getUser(login);

      if (foundUser.rowCount > 0) {
        return res.status(400).json({ message: "The user already exists" });
      }

      const newUser = await api_user.createUser(login, password);
      return res.json(newUser);
    } catch (e) {
      console.log(e);
      const message = "Registration error";
      return res.status(400).json({ message: message });
    }
  }

  async refresh(req: Request, res: Response) {
    try {
      //цепляем токен продления
      const refresh_token_old = req.body.refresh_token;
      
      //попытка распарсить токен продления 
      const decodedData = decodeRefreshToken(refresh_token_old);

      //если распарсить не выйдет - выбросит иключение
      //@ts-ignore
      const login = decodedData.login;
      const user = await api_user.getUser(login);
      delete user.password;
      
      const {token, refresh_token} = generateAccessRefreshToken({ ...user });
      
      return res.json({
        token,
        refresh_token
      });
    } catch (error) {
      console.log(error);
      const message = 'Refresh error';
      return res.status(400).json({ message: message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      //пароль приходит уже зашифрованный
      const { login, password } = req.body;

      const user = await api_user.getUser(login);

      //сверяем пароли
      const isValidPassword = password === user.password;

      if (!isValidPassword) {
        return res.status(400).json({ message: "Incorrect password." });
      }
      delete user.password;
      //получаем пару токенов
      const {token, refresh_token} = generateAccessRefreshToken({ ...user });
      return res.json({
        token,
        refresh_token
      });
    } catch (error) {
      console.log(error);
      const message = 'Login error';
      return res.status(400).json({ message: message });
    }
  }
}
