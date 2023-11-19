import { pool as db } from "../db";

//добавим комментарий
class api_user_words_table {
  // Table users
  async getUserWords(user_id : number) {
    const users = await db.query("SELECT * FROM user_words where user_id = $1", [user_id]);
    return users.rows;
  }

  async createUserWords(
    user_id: number,
    word: string
  ) {
    const rec = await db.query(
      "INSERT INTO user_words (user_id, word) \
      VALUES ($1, $2) RETURNING *",
      [user_id, word]
    );
    return rec.rows[0];
  }
}

const api_user_words = new api_user_words_table();
export { api_user_words };