import { Request, Response } from "express";

import {api_user_words} from "../api/user_words_tbl"


// route: /api/users/
export class UserWordsController {


  async createUserWorld(req: Request, res: Response) {
    try {
      const { world, user_id } = req.body;

      const newUser = await api_user_words.createUserWords(user_id, world);
      return res.json(newUser);
    } catch (e) {
      console.log(`\nОшибка доступа к БД \n${e} \n`);
      return res
        .status(400)
        .json({ message: `Database request error \n ${e}` });
    }
  }

  async getUserWorld(req: Request, res: Response) {
    try {
      const { user_id } = req.body;

      const res_ = await api_user_words.getUserWords(user_id);
      return res.json(res_);
    } catch (e) {
      console.log(`\nОшибка доступа к БД \n${e} \n`);
      return res
        .status(400)
        .json({ message: `Database request error \n ${e}` });
    }
  }

}
