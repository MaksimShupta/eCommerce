import Joi from "joi";

export const categorySchema = {
    POST: Joi.object({
        name: Joi.string().required(),
    }),
    PUT: Joi.object({
        name: Joi.string().optional(),
    }),
};
