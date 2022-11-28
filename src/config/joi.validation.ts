import * as joi from 'joi';

export const JoiValidationSchema = joi.object({
	DB_URI_DEV: joi.string().required(),
	NODE_ENV: joi.string().valid('development', 'production', 'test').default('development'),
	CORS_ALLOWED_HOSTS: joi.string().default('http://localhost:3000'),
	PORT: joi.number().default(3001),
});