import { Router } from 'express';
import {
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
} from '../controllers/productController.js';
import validateSchema from '../middleware/validateSchema.js';
import productSchema from '../schemas/product.js';

const productRouter = Router();

productRouter.get('/', getAllProducts);
productRouter.get('/:id', getProductById);
productRouter.post('/', validateSchema(productSchema), createProduct);
productRouter.put('/:id', validateSchema(productSchema), updateProduct);
productRouter.delete('/:id', deleteProduct);

export default productRouter;
