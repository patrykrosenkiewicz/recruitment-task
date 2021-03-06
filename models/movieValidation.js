import  Joi  from 'joi';
import { initDb } from '../database/dbClient.js';

const dbClient = await initDb();
let { genres } = dbClient.data;
genres = genres ? genres : [] ;

export const movieDataValidation = Joi.object({
	title: Joi.string()
		.alphanum()
		.max(255)
		.required(),

	year: Joi.number()
		.integer()
		.required(),

	runtime: Joi.number()
		.integer()
		.required(),
	genres: Joi.array().unique().items(Joi.string().valid(...genres)),
	director: Joi.string()
		.max(255)
		.required(),
	actors: Joi.string(),
	plot: Joi.string(),
	posterUrl: Joi.string().uri()
});
