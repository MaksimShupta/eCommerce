import models from '../models/index.js';
const { Category } = models;

export const getAllCategories = async (req, res) => {
    try {
        const allCats = await Category.findAll();
        res.status(200).json({ success: true, data: allCats });
    } catch (error) {
        console.error('error by fetching all categories:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        console.log('category data:', name);
        const newCat = await Category.create({ name });
        res.status(201).json({ success: true, data: newCat });
    } catch (error) {
        console.error('error by creating a category:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

export const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const searchedCat = await Category.findByPk(id);
        if (!searchedCat) {
            return res
                .status(404)
                .json({ success: false, error: 'Category not found' });
        } else {
            console.log('category data:', searchedCat);
            res.status(200).json({ success: true, data: searchedCat });
        }
    } catch (error) {
        console.error('error by getting a category:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};
export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('category id:', id);
        const { name } = req.body;
        const updatedCat = await Category.findByPk(id);
        if (!updatedCat) {
            return res
                .status(404)
                .json({ success: false, error: 'Category not found' });
        } else {
            await updatedCat.update({ name });
            res.status(200).json({ success: true, data: updatedCat });
        }
    } catch (error) {
        console.error('error by updating a category:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('category id:', id);
        const findCat = await Category.findByPk(id);

        if (!findCat) {
            return res
                .status(404)
                .json({ success: false, error: 'Category not found' });
        }
        await findCat.destroy();
        console.log('The category was succsessfully deleted!');
        res.status(200).json({ success: true, data: findCat });
    } catch (error) {
        console.error('error by deleting a category:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};
