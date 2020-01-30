const mongoose = require('mongoose')
const Joi = require('joi')
const {genreSchema} = require('./genre')

let movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        default: 5,
        min: 0,
        max: 255
    }

});

const Movie = mongoose.model('Movies', movieSchema); 

function validateMovie(movie) {
    let schema = {
        name: Joi.string().min(3).max(50).required(),
        genre: Joi.string(),
        numberInStock: Joi.number(),
        dailyRentalRate: Joi.number()
    }
    return Joi.validate(movie, schema)
}



exports.Movie = Movie
exports.validateMovie = validateMovie