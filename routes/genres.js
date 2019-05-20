const express = require('express');
const router = express.Router();
const Genre = require('../models/genre').Genre;
const validateGenre = require('../models/genre').validateGenre;

// GET
router.get("/", async (req, res) => {
    try{
        const genres = await Genre.find().sort('name');
        res.send(genres);
    }
    catch(err){
        res.status(500).send(err.message);
    }
});

router.get("/:id", async (req, res) => {
    try{
        const genre = await Genre.findById(req.params.id);
        res.send(genre);
    }
    catch(err){
        res.status(404).send("Couldn't find what you wanted");
    }
});


// POST - used for adding new items
router.post("/", async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.message)
    try{
        let genre = new Genre({ 
            name: req.body.name,
            description: req.body.description
        });
        genre = await genre.save();
        res.send(genre);
    } 
    catch (err){
        res.status(500).send(err.message);
    }
})

// PUT - used for updating new items
router.put("/:id", async (req, res) => {
    //validate the request
    //return 400 if bad
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.message);

    try{
        const genre = await Genre.findByIdAndUpdate(
            req.params.id, 
            {
                name: req.body.name, 
                description: req.body.description
            }, {
                new: true
            });

        res.send(genre);
    } 
    catch (err) {
        console.log(err)
        return res.status(404).send(err.message);
    }
});

//DELETE
router.delete("/:id", async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id)

    if (!genre) return res.status(404).send("I hope you find what you're looking for");
    //delete the genre
    //return the delete genre
    res.send(genre);
});

module.exports = router;