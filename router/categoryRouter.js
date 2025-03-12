import { Router } from 'express';
import {
    getAllCategories,
    createCategory,
    getCategoryById,
    updateCategory,
    deleteCategory,
} from '../controllers/categoryController.js';
import validateSchema from '../middleware/validateSchema.js';
import categorySchema from '../schemas/category.js';

const categoryRouter = Router();

categoryRouter.get('/', getAllCategories);
categoryRouter.get('/:id', getCategoryById);
categoryRouter.post('/', validateSchema(categorySchema), createCategory);
categoryRouter.put('/:id', validateSchema(categorySchema), updateCategory);
categoryRouter.delete('/:id', deleteCategory);

export default categoryRouter;
