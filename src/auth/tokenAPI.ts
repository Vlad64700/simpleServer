import jwt from "jsonwebtoken";
import { IpcNetConnectOpts } from "net";

import { secret_for_access, secret_for_refresh } from "../config";

interface IPayload {
  user_id: number;
}

const generateAccessToken = (payload: IPayload) =>
  jwt.sign(payload, secret_for_access.key, { expiresIn: "2d" });

const generateRefreshToken = (payload: IPayload) =>
  jwt.sign(payload, secret_for_refresh.key, { expiresIn: "20d" });

//создание пары токенов для доступа и для обновления
export const generateAccessRefreshToken = (payload: IPayload) => {
  const token = generateAccessToken(payload);
  const refresh_token = generateRefreshToken(payload);
  return {token, refresh_token}
};

//расшифровка токена доступа
export const decodeAccessToken = (token: any) =>  {
  const decodedData = jwt.verify(token, secret_for_access.key) as IPayload;
  return decodedData
};
//расшифровка токена продления
export const decodeRefreshToken = (token: any) => {
  const decodedData = jwt.verify(token, secret_for_refresh.key) as IPayload;
  return decodedData
};
