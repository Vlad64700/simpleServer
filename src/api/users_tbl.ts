import { pool as db } from "../db";


class api_users_table {
  // Table users
  async getUser(login: string) {
    const users = await db.query("SELECT * FROM users where login = $1", [login]);

    if (users.rowCount !== null && users.rowCount === 0) {
        throw new Error("The user not exists");
      }
    return users.rows[0];
  }

  async createUser(
    login: string,
    password: string
  ) {
    const findUser = await db.query("SELECT * FROM users WHERE login = $1", [
      login,
    ]);
    if (findUser.rowCount !== null && findUser.rowCount>0) {
      throw new Error("The user already exists");
    }

    const newUser = await db.query(
      "INSERT INTO users (login, password) \
      VALUES ($1, $2) RETURNING *",
      [login, password]
    );
    return newUser.rows[0];
  }

  async updateUser(
    user_id: number,
    login: string,
    password: string,

  ) {
    const findUser = await db.query("SELECT * FROM users WHERE user_id = $1", [
      user_id,
    ]);
    if (findUser.rowCount === 0) {
      throw new Error("The user doesn't exist");
    }

    const checkLogin = await db.query("SELECT * FROM users WHERE login = $1", [
      login,
    ]);
    if (checkLogin.rowCount !== null && checkLogin.rowCount > 0 && login !== findUser.rows[0].login) {
      throw new Error("This login already exist!");
    }

    const user = await db.query(
      `UPDATE users SET login = $1, password = $2 WHERE user_id = $1 RETURNING *`,
      [login, password, user_id]
    );
    return user.rows[0];
  }

}

const api_user = new api_users_table();
export { api_user };
