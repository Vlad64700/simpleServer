import express from "express";
//@ts-ignore
import cors from "cors";

import { userWordsRouter } from "./Routes/usersWordsRouter";
import { authRouter } from "./Routes/authRouters";


const app = express();
app.use(cors());
//автопарсинг json'ов
app.use(express.json());

//конфигурация контроллеров и роутов которым они отвечают
app.use("/api/words", userWordsRouter);
app.use("/auth", authRouter);

export default app;
