const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: {type: String, required: true, lowercase: true },
    description: {type: String, required: true, maxlength: 500}
});

const Genre = mongoose.model('Genre', genreSchema);

//Request validation
function validateGenre(genre){
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().max(500).required()
    });

    return Joi.validate(genre, schema);
}

module.exports.Genre = Genre;
module.exports.validateGenre = validateGenre;
