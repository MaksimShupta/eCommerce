import Joi from 'joi';

const productSchema = {
    POST: Joi.object({
        name: Joi.string().min(2).max(30).required(),
        description: Joi.string().min(50).max(500).required(),
        price: Joi.number().precision(2).min(0).required(),
        categoryId: Joi.number().integer().required(),
    }),
    PUT: Joi.object({
        name: Joi.string().min(2).max(30).optional(),
        description: Joi.string().min(50).max(500).optional(),
        price: Joi.number().precision(2).min(0).optional(),
        categoryId: Joi.number().integer().optional(),
    }),
};
export default productSchema;
