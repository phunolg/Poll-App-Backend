import Joi from "joi";

class ValidateMiddleware {
    async validateId(req, res, next) {
        try {
            const schema = Joi.object({
                id: Joi.number().required()
            });

            await schema.validateAsync(req.params, { abortEarly: false });
            next();
        } catch (err) {
            res.status(404).json({
                success: false,
                message: "Invalid ID"
            });
        }
    }

    async validateCreateUser(req, res, next) {
        try {
            const createUserSchema = Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().min(6).required()
            });
            await createUserSchema.validateAsync(req.body, { abortEarly: false });
            next();
        } catch (err) {
            res.status(400).json({
                success: false,
                message: "Invalid request body",
                errors: err.details.map(detail => detail.message)
            });
        }
    }
}

export default new ValidateMiddleware();