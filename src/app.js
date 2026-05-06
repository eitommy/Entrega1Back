import express from "express";
import cookieParser from "cookie-parser";
import passport from "passport";
import dotenv from "dotenv";

import { connectDB } from "./config/db.config.js";
import { initializePassport } from "./config/passport.config.js";

import sessionsRouter from "./routes/sessions.router.js";
import usersRouter from "./routes/users.router.js";
import cartsRouter from "./routes/carts.router.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

initializePassport();
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Servidor funcionando correctamente"
  });
});

app.use("/api/sessions", sessionsRouter);
app.use("/api/users", usersRouter);
app.use("/api/carts", cartsRouter);

connectDB();

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
