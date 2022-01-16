import  Joi  from 'joi';
import { dbClient } from '../database/dbClient.js';

await dbClient.read();
dbClient.data = dbClient.data || { movies: [], genres: [] };
const { genres } = dbClient.data;

export const movieSchema = Joi.object({
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
})
