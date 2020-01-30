const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies')
const express = require('express');
const app = express();
require('dotenv/config')

let options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.connect(`mongodb+srv://dino:${process.env.MONGO_PASSWORD}@cluster0-c4ci4.mongodb.net/test?retryWrites=true&w=majority`, options)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));