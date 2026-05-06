import { Router } from "express";
import { UserModel } from "../models/user.model.js";
import { CartModel } from "../models/cart.model.js";
import { createHash, generateToken, isValidPassword, userResponseDTO } from "../utils.js";
import { passportCall } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, age, password, role } = req.body;

    if (!first_name || !last_name || !email || !age || !password) {
      return res.status(400).json({
        status: "error",
        message: "Todos los campos son obligatorios"
      });
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        status: "error",
        message: "Ya existe un usuario con ese email"
      });
    }

    const newCart = await CartModel.create({ products: [] });

    const newUser = await UserModel.create({
      first_name,
      last_name,
      email,
      age,
      password: createHash(password),
      cart: newCart._id
    });

    res.status(201).json({
      status: "success",
      message: "Usuario registrado correctamente",
      user: userResponseDTO(newUser)
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al registrar usuario",
      error: error.message
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Email y contraseña son obligatorios"
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Credenciales inválidas"
      });
    }

    const validPassword = isValidPassword(user, password);

    if (!validPassword) {
      return res.status(401).json({
        status: "error",
        message: "Credenciales inválidas"
      });
    }

    const token = generateToken(user);

    res
      .cookie("coderCookieToken", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000
      })
      .json({
        status: "success",
        message: "Login exitoso",
        token
      });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al iniciar sesión",
      error: error.message
    });
  }
});

router.get("/current", passportCall("jwt"), async (req, res) => {
  res.json({
    status: "success",
    message: "Usuario autenticado correctamente",
    user: userResponseDTO(req.user)
  });
});

router.post("/logout", (req, res) => {
  res.clearCookie("coderCookieToken").json({
    status: "success",
    message: "Sesión cerrada correctamente"
  });
});

export default router;
