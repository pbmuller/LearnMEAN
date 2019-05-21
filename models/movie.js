const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const {genreSchema} = require('../models/genre');

const movieSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true
    },
    dailyRentalRate: {
        type: Number,
        required: true
    }
});

const Movie = new mongoose.model("Movie", movieSchema);

function validateMovie(movie){
    const schema = {
        title: Joi.string().required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    };

    return Joi.validate(movie, schema);
}

exports.movieSchema = movieSchema;
exports.Movie = Movie;
exports.validateMovie = validateMovie;