import { sequelize, connectDB } from "../db/index.js";
import { ProductModel } from "../models/product.js";

const product = ProductModel(sequelize);

export const getAllProducts = async (req, res) => {
  try {
    const products = await product.findAll();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("error by fetching all products:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, categoryId } = req.body;
    console.log("product data:", name, description, price);
    const newProduct = await product.create({
      name,
      description,
      price,
      categoryId,
    });

    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("error by creating a product:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const searchedProduct = await product.findByPk(id);
    if (!searchedProduct) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    } else {
      console.log("product data:", searchedProduct);
      res.status(200).json({ success: true, data: searchedProduct });
    }
  } catch (error) {
    console.error("error by getting a product:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("user id:", id);
    const { name, description, price, categoryId } = req.body;
    const updatedProduct = await product.findByPk(id);
    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    } else {
      await updatedProduct.update({ name, description, price, categoryId });
      res.status(200).json({ success: true, data: updatedProduct });
    }
  } catch (error) {
    console.error("error by updating a product:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("product id:", id);
    const findProduct = await user.findByPk(id);

    if (!findProduct) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }
    await findProduct.destroy({ where: { id } });
    console.log("The product was succsessfully deleted!");
    res.status(200).json({ success: true, data: findProduct });
  } catch (error) {
    console.error("error by deleting a product:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
