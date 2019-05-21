const express = require('express');
const router = express.Router();
const {Genre} = require('../models/genre');
const {Movie} = require('../models/movie');


router.get('/', async (req, res) =>{
    try {
        const movies = await Movie.find();
        res.send(movies);
    } 
    catch (err){
        res.status(404).send(err.message);
    } 
});

router.get('/:id', async (req, res) =>{
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) throw new Error("No movie matches that id");
        res.send(movie);
    }
    catch(err){
        res.status(404).send(err.message);
    }
});

router.post('/', async (req, res) =>{
    const {error} = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('invalid genre');

    try {
        let movie = new Movie({
            title: req.body.title,
            genre: {
                _id: genre._id,
                name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        });
        movie = await movie.save();
        res.send(movie);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
});

router.put('/:id', async (req, res) =>{
    const {error} = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('invalid genre');

    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            genre: {
                _id: genre._id,
                name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        }, {new: true});
        res.send(movie);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
});

router.delete('/:id', async (req, res) =>{
    try {
        const movie = await Movie.findByIdAndRemove({_id: req.params.id});
        res.send(movie);
    } 
    catch (err) {
        res.status(400).send(err.message);
    }
})

module.exports = router;