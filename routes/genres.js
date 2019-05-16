const express = require('express');
const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const router = express.Router();


const genres = [
    { id: 1, name: "horror", description: "Scary stuff, my dude" }, 
    { id: 2, name: "comedy", description: "Funny stuff, my dudette"},
    { id: 3, name: "action", description: "Exciting stuff, my dudes abiding"}
];

const genreSchema = new mongoose.Schema({
    name: {type: String, required: true, lowercase: true },
    description: {type: String, required: true, maxlength: 500}
});

const Genre = mongoose.model('Genre', genreSchema);

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

//Request validation
function validateGenre(genre){
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().max(500).required()
    });

    return Joi.validate(genre, schema);
}

module.exports = router;