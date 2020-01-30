const {Movie, validateMovie} = require('../models/movie');
const {Genre} = require('../models/genre')
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const movies = await movieSchema.find().sort('name');
  res.send(movies);
});

router.post('/', async (req, res) => {
// const { error } = validateMovie(req.body); 
//   if (error) 
//   const genre = await Genre.findById(req.body.genreId)
//   if (!genre) return res.status(400).send('Genre does not exist')
    try {
      const { error } = validateMovie(req.body);
      const genre = await Genre.findById(req.body.genreId)
      if (!genre) return res.status(400).send('Genre does not exist')
      
      let movie = new Movie({ 
        name: req.body.name,
        genre: {
          _id: genre._id,
          name: genre.name //is there a way to use destructuring here?
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate 
      });
    
        movie = await movie.save();
  
        res.send(movie);

    } catch (error) {
    
        return res.status(400).send(error.details[0].message);
    }
});

module.exports = router