import Joi from "joi";

export const orderSchema = {
    POST: Joi.object({
        userId: Joi.number().integer().required(),
        products: Joi.array()
            .items(
                Joi.object({
                    productId: Joi.number().integer().required(),
                    quantity: Joi.number().integer().min(1).required(),
                })
            )
            .min(1)
            .required(),
        total: Joi.number().precision(2).min(0).required(),
    }),
    PUT: Joi.object({
        userId: Joi.number().integer().optional(),
        products: Joi.array()
            .items(
                Joi.object({
                    productId: Joi.number().integer().required(),
                    quantity: Joi.number().integer().min(1).required(),
                })
            )
            .min(1)
            .optional(),
        total: Joi.number().precision(2).min(0).optional(),
    }),
};
