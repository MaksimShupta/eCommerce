import ErrorResponse from '../utils/ErrorResponse';

const validateSchema = (schema) => {
    return async (req, res, next) => {
        try {
            await schema[req.method].validateAsync(req.body);
            next();
        } catch (error) {
            throw new ErrorResponse('validation error!', 400);
        }
    };
};

export default validateSchema;
