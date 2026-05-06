import { Router } from "express";
import { CartModel } from "../models/cart.model.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const cart = await CartModel.create({ products: [] });

    res.status(201).json({
      status: "success",
      message: "Carrito creado correctamente",
      cart
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al crear carrito",
      error: error.message
    });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await CartModel.findById(cid);

    if (!cart) {
      return res.status(404).json({
        status: "error",
        message: "Carrito no encontrado"
      });
    }

    res.json({
      status: "success",
      cart
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al obtener carrito",
      error: error.message
    });
  }
});

export default router;
