import Joi from 'joi';

const categorySchema = {
    POST: Joi.object({
        name: Joi.string().required(),
    }),
    PUT: Joi.object({
        name: Joi.string().optional(),
    }),
};
export default categorySchema;
