import models from "../models/index.js";
const { Product } = models;

export const getAllProducts = async (req, res) => {
    try {
        console.log("hey Product:", Product);
        const products = await Product.findAll();
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error("error by fetching all products:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, categoryId } = req.body;
        console.log("Product data:", name, description, price);
        const newProduct = await Product.create({
            name,
            description,
            price,
            categoryId,
        });

        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("error by creating a Product:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const searchedProduct = await Product.findByPk(id);
        if (!searchedProduct) {
            return res
                .status(404)
                .json({ success: false, error: "Product not found" });
        } else {
            console.log("Product data:", searchedProduct);
            res.status(200).json({ success: true, data: searchedProduct });
        }
    } catch (error) {
        console.error("error by getting a Product:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("user id:", id);
        const { name, description, price, categoryId } = req.body;
        const updatedProduct = await Product.findByPk(id);
        if (!updatedProduct) {
            return res
                .status(404)
                .json({ success: false, error: "Product not found" });
        } else {
            await updatedProduct.update({
                name,
                description,
                price,
                categoryId,
            });
            res.status(200).json({ success: true, data: updatedProduct });
        }
    } catch (error) {
        console.error("error by updating a Product:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Product id:", id);
        const findProduct = await Product.findByPk(id);

        if (!findProduct) {
            return res
                .status(404)
                .json({ success: false, error: "Product not found" });
        }
        await findProduct.destroy({ where: { id } });
        console.log("The Product was succsessfully deleted!");
        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: findProduct,
        });
    } catch (error) {
        console.error("error by deleting a Product:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};
