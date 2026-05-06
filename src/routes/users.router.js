import { Router } from "express";
import { UserModel } from "../models/user.model.js";
import { CartModel } from "../models/cart.model.js";
import { createHash, userResponseDTO } from "../utils.js";
import { passportCall, authorization } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", passportCall("jwt"), authorization("admin"), async (req, res) => {
  try {
    const users = await UserModel.find().populate("cart");

    res.json({
      status: "success",
      users: users.map((user) => userResponseDTO(user))
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al obtener usuarios",
      error: error.message
    });
  }
});

router.get("/:uid", passportCall("jwt"), async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await UserModel.findById(uid).populate("cart");

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "Usuario no encontrado"
      });
    }

    res.json({
      status: "success",
      user: userResponseDTO(user)
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al obtener usuario",
      error: error.message
    });
  }
});

router.post("/", async (req, res) => {
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
      cart: newCart._id,
      role: role || "user"
    });

    res.status(201).json({
      status: "success",
      message: "Usuario creado correctamente",
      user: userResponseDTO(newUser)
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al crear usuario",
      error: error.message
    });
  }
});

router.put("/:uid", passportCall("jwt"), async (req, res) => {
  try {
    const { uid } = req.params;
    const { first_name, last_name, email, age, password, role } = req.body;

    const updateData = {};

    if (first_name) updateData.first_name = first_name;
    if (last_name) updateData.last_name = last_name;
    if (email) updateData.email = email;
    if (age) updateData.age = age;
    if (role) updateData.role = role;
    if (password) updateData.password = createHash(password);

    const updatedUser = await UserModel.findByIdAndUpdate(uid, updateData, {
      new: true
    }).populate("cart");

    if (!updatedUser) {
      return res.status(404).json({
        status: "error",
        message: "Usuario no encontrado"
      });
    }

    res.json({
      status: "success",
      message: "Usuario actualizado correctamente",
      user: userResponseDTO(updatedUser)
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al actualizar usuario",
      error: error.message
    });
  }
});

router.delete("/:uid", passportCall("jwt"), authorization("admin"), async (req, res) => {
  try {
    const { uid } = req.params;

    const deletedUser = await UserModel.findByIdAndDelete(uid);

    if (!deletedUser) {
      return res.status(404).json({
        status: "error",
        message: "Usuario no encontrado"
      });
    }

    res.json({
      status: "success",
      message: "Usuario eliminado correctamente"
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al eliminar usuario",
      error: error.message
    });
  }
});

export default router;
