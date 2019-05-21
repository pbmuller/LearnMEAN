const express = require('express');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost/vidly', {useNewUrlParser: true})
    .then(()=>console.log('Connected to Mongo DB...'))
    .catch((err) => console.log('!!Error!!', err.message));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);

// SET UP THE PORT YOU GOOFY GOOBER
const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})