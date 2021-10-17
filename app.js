const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

require('dotenv/config');

// middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

// routes
const productsRoutes = require('./routes/products');

const api = process.env.API_URL;

app.use(`${api}/products`, productsRoutes);


// connection
mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => {
        console.log('Database connection ready...');
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(3000, () => {
    console.log(api);
    console.log('server is running on http://localhost:3000');
});